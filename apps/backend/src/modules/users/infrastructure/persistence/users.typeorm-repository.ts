import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../domain/user.js";
import { UserMapper } from "../../domain/user.mapper.js";
import { UserOrmEntity } from "./user.orm-entity.js";

@Injectable()
export class UsersTypeormRepository {
    public constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repository: Repository<UserOrmEntity>,
    ) {}

    public async findAll(): Promise<readonly User[]> {
        const rows: UserOrmEntity[] = await this.repository.find({ order: { createdAt: "ASC" } });
        return rows.map((row: UserOrmEntity): User => UsersTypeormRepository.mapRowToUser(row));
    }

    public async findById(id: string): Promise<User | null> {
        const row: UserOrmEntity | null = await this.repository.findOne({ where: { id } });
        return row === null ? null : UsersTypeormRepository.mapRowToUser(row);
    }

    public async findByIdWithNotes(id: string, alias: string = "u"): Promise<UserOrmEntity | null> {
        return this.repository
            .createQueryBuilder(alias)
            .leftJoinAndSelect(`${alias}.notes`, "note")
            .where(`${alias}.id = :id`, { id })
            .orderBy("note.createdAt", "DESC")
            .getOne();
    }

    public async create(input: {
        readonly email: string;
        readonly displayName: string;
    }): Promise<User> {
        const entity: UserOrmEntity = this.repository.create({
            email: input.email,
            displayName: input.displayName,
        });
        const saved: UserOrmEntity = await this.repository.save(entity);
        return UsersTypeormRepository.mapRowToUser(saved);
    }

    public async update(
        id: string,
        patch: { readonly email?: string; readonly displayName?: string },
    ): Promise<User | null> {
        const row: UserOrmEntity | null = await this.repository.findOne({ where: { id } });
        if (row === null) {
            return null;
        }

        const user: User = UsersTypeormRepository.mapRowToUser(row);
        if (patch.email !== undefined) {
            user.changeEmail(patch.email);
        }

        if (patch.displayName !== undefined) {
            user.changeDisplayName(patch.displayName);
        }

        const fields = UserMapper.toPersistence(user);
        row.email = fields.email;
        row.displayName = fields.displayName;

        const saved: UserOrmEntity = await this.repository.save(row);
        return UsersTypeormRepository.mapRowToUser(saved);
    }

    public async delete(id: string): Promise<User | null> {
        const row: UserOrmEntity | null = await this.repository.findOne({ where: { id } });
        if (row === null) {
            return null;
        }

        const domain: User = UsersTypeormRepository.mapRowToUser(row);
        await this.repository.remove(row);
        return domain;
    }

    private static mapRowToUser(row: UserOrmEntity): User {
        return UserMapper.fromPersistence({
            id: row.id,
            email: row.email,
            displayName: row.displayName,
            createdAt: row.createdAt,
        });
    }
}
