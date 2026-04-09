import type { NoteDto } from "@mvp/shared";
import { Note } from "./note.js";

export class NoteMapper {
    public static fromPersistence(fields: {
        readonly id: string;
        readonly title: string;
        readonly content: string;
        readonly createdAt: Date;
        readonly userId?: string | null;
    }): Note {
        return Note.rehydrate(fields);
    }

    public static toPersistence(note: Note): {
        readonly id: string;
        readonly title: string;
        readonly content: string;
        readonly createdAt: Date;
        readonly userId: string | null;
    } {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            userId: note.userId,
        };
    }

    public static toDto(note: Note): NoteDto {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt.toISOString(),
            userId: note.userId,
        };
    }
}
