import type { NoteDto } from "./note.contract.js";
import type { UserRole } from "./user-role.contract.js";

export interface UserDto {
    readonly id: string;
    readonly email: string;
    readonly displayName: string;
    readonly role: UserRole;
    readonly createdAt: string;
    readonly notes: readonly NoteDto[];
}

export interface CreateUserRequestBody {
    readonly email: string;
    readonly displayName: string;
}

export interface UpdateUserRequestBody {
    readonly email?: string;
    readonly displayName?: string;
}
