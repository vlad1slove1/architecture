import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "../../domain/note.js";
import { NoteMapper } from "../../domain/note.mapper.js";
import { NoteOrmEntity } from "./note.orm-entity.js";

@Injectable()
export class NotesTypeormRepository {
    public constructor(
        @InjectRepository(NoteOrmEntity)
        private readonly repository: Repository<NoteOrmEntity>,
    ) {}

    public async findAll(): Promise<readonly Note[]> {
        const rows: NoteOrmEntity[] = await this.repository.find({ order: { createdAt: "DESC" } });
        return rows.map((row: NoteOrmEntity): Note => NotesTypeormRepository.mapRowToNote(row));
    }

    public async findByUserId(userId: string): Promise<readonly Note[]> {
        const rows: NoteOrmEntity[] = await this.repository.find({
            where: { userId },
            order: { createdAt: "DESC" },
        });
        return rows.map((row: NoteOrmEntity): Note => NotesTypeormRepository.mapRowToNote(row));
    }

    public async create(input: {
        readonly title: string;
        readonly content: string;
        readonly userId?: string;
    }): Promise<Note> {
        const ownerUserId: string | undefined = input.userId;
        const entity: NoteOrmEntity = this.repository.create({
            title: input.title,
            content: input.content,
            ...(ownerUserId !== undefined && ownerUserId.length > 0
                ? { userId: ownerUserId }
                : { userId: null }),
        });
        const saved: NoteOrmEntity = await this.repository.save(entity);
        return NotesTypeormRepository.mapRowToNote(saved);
    }

    private static mapRowToNote(row: NoteOrmEntity): Note {
        return NoteMapper.fromPersistence({
            id: row.id,
            title: row.title,
            content: row.content,
            createdAt: row.createdAt,
            userId: row.userId,
        });
    }
}
