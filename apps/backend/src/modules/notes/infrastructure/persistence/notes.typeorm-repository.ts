import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { EntityManager } from "typeorm";
import { In, Repository } from "typeorm";
import { UserNotesTypeormRepository } from "../../../user-notes/infrastructure/persistence/user-notes.typeorm-repository.js";
import { Note } from "../../domain/note.js";
import { NoteMapper } from "../../domain/note.mapper.js";
import { NoteOrmEntity } from "./note.orm-entity.js";

@Injectable()
export class NotesTypeormRepository {
    public constructor(
        @InjectRepository(NoteOrmEntity)
        private readonly repository: Repository<NoteOrmEntity>,
        private readonly userNotesTypeormRepository: UserNotesTypeormRepository,
    ) {}

    public async findAll(): Promise<readonly Note[]> {
        const rows: NoteOrmEntity[] = await this.repository.find({ order: { createdAt: "DESC" } });
        const noteIds: string[] = rows.map((row: NoteOrmEntity): string => row.id);
        const userIdByNoteId: Map<string, string | null> =
            await this.userNotesTypeormRepository.findUserIdsByNoteIds(noteIds);

        return rows.map(
            (row: NoteOrmEntity): Note =>
                NotesTypeormRepository.mapRowToNote(row, userIdByNoteId.get(row.id) ?? null),
        );
    }

    public async findByUserId(userId: string): Promise<readonly Note[]> {
        const noteIds: readonly string[] =
            await this.userNotesTypeormRepository.findNoteIdsByUserId(userId);

        if (noteIds.length === 0) {
            return [];
        }

        const rows: NoteOrmEntity[] = await this.repository.find({
            where: { id: In([...noteIds]) },
            order: { createdAt: "DESC" },
        });

        return rows.map(
            (row: NoteOrmEntity): Note => NotesTypeormRepository.mapRowToNote(row, userId),
        );
    }

    public async create(input: {
        readonly title: string;
        readonly content: string;
        readonly userId?: string;
    }): Promise<Note> {
        return this.repository.manager.transaction(async (manager: EntityManager) => {
            const noteRepo: Repository<NoteOrmEntity> = manager.getRepository(NoteOrmEntity);
            const entity: NoteOrmEntity = noteRepo.create({
                title: input.title,
                content: input.content,
            });
            const saved: NoteOrmEntity = await noteRepo.save(entity);

            const ownerUserId: string | undefined = input.userId;
            if (ownerUserId !== undefined && ownerUserId.length > 0) {
                await this.userNotesTypeormRepository.linkUserToNote(
                    { userId: ownerUserId, noteId: saved.id },
                    manager,
                );
                return NotesTypeormRepository.mapRowToNote(saved, ownerUserId);
            }

            return NotesTypeormRepository.mapRowToNote(saved, null);
        });
    }

    private static mapRowToNote(row: NoteOrmEntity, userId: string | null): Note {
        return NoteMapper.fromPersistence({
            id: row.id,
            title: row.title,
            content: row.content,
            createdAt: row.createdAt,
            userId,
        });
    }
}
