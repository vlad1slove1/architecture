import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { EntityManager } from "typeorm";
import { In, Repository } from "typeorm";
import { UserNoteOrmEntity } from "./user-note.orm-entity.js";

@Injectable()
export class UserNotesTypeormRepository {
    public constructor(
        @InjectRepository(UserNoteOrmEntity)
        private readonly repository: Repository<UserNoteOrmEntity>,
    ) {}

    public async linkUserToNote(
        params: { readonly userId: string; readonly noteId: string },
        manager?: EntityManager,
    ): Promise<void> {
        const repo: Repository<UserNoteOrmEntity> =
            manager === undefined ? this.repository : manager.getRepository(UserNoteOrmEntity);
        await repo.save(
            repo.create({
                userId: params.userId,
                noteId: params.noteId,
            }),
        );
    }

    public async findUserIdsByNoteIds(
        noteIds: readonly string[],
    ): Promise<Map<string, string | null>> {
        const userIdByNoteId: Map<string, string | null> = new Map(
            noteIds.map((noteId: string): [string, string | null] => [noteId, null]),
        );

        if (noteIds.length === 0) {
            return userIdByNoteId;
        }

        const rows: UserNoteOrmEntity[] = await this.repository.find({
            where: { noteId: In([...noteIds]) },
        });

        for (const row of rows) {
            userIdByNoteId.set(row.noteId, row.userId);
        }

        return userIdByNoteId;
    }

    public async findNoteIdsByUserId(userId: string): Promise<readonly string[]> {
        const rows: UserNoteOrmEntity[] = await this.repository.find({
            where: { userId },
            select: { noteId: true },
        });

        return rows.map((row: UserNoteOrmEntity): string => row.noteId);
    }
}
