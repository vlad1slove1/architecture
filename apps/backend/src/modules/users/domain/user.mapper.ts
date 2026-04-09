import type { UserDto } from "@mvp/shared";
import type { Note } from "../../notes/domain/note.js";
import { NoteMapper } from "../../notes/domain/note.mapper.js";
import { User } from "./user.js";

export class UserMapper {
    public static fromPersistence(fields: {
        readonly id: string;
        readonly email: string;
        readonly displayName: string;
        readonly createdAt: Date;
    }): User {
        return User.rehydrate(fields);
    }

    public static toPersistence(user: User): {
        readonly id: string;
        readonly email: string;
        readonly displayName: string;
        readonly createdAt: Date;
    } {
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            createdAt: user.createdAt,
        };
    }

    public static toDto(user: User, notes: readonly Note[] = []): UserDto {
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            createdAt: user.createdAt.toISOString(),
            notes: notes.map((n: Note) => NoteMapper.toDto(n)),
        };
    }
}
