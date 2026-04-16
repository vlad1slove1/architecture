import type { UserDto, UserRole } from "@mvp/shared";
import type { Note } from "../../notes/domain/note.js";
import { NoteMapper, type NotePersistenceFields } from "../../notes/domain/note.mapper.js";
import type { UserWithNotes } from "../types/user-with-notes.js";
import { User } from "./user.js";

export class UserMapper {
    public static fromPersistence(fields: {
        readonly id: string;
        readonly email: string;
        readonly displayName: string;
        readonly role: UserRole;
        readonly createdAt: Date;
    }): User {
        return User.rehydrate(fields);
    }

    public static userWithNotesFromPersistence(row: {
        readonly id: string;
        readonly email: string;
        readonly displayName: string;
        readonly role: UserRole;
        readonly createdAt: Date;
        readonly notes?: readonly NotePersistenceFields[];
    }): UserWithNotes {
        const user: User = UserMapper.fromPersistence({
            id: row.id,
            email: row.email,
            displayName: row.displayName,
            role: row.role,
            createdAt: row.createdAt,
        });
        const notes: readonly Note[] = NoteMapper.fromPersistenceMany(row.notes ?? []);
        return { user, notes };
    }

    public static toPersistence(user: User): {
        readonly id: string;
        readonly email: string;
        readonly displayName: string;
        readonly role: UserRole;
        readonly createdAt: Date;
    } {
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            createdAt: user.createdAt,
        };
    }

    public static toDto(user: User, notes: readonly Note[] = []): UserDto {
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
            createdAt: user.createdAt.toISOString(),
            notes: notes.map((n: Note) => NoteMapper.toDto(n)),
        };
    }
}
