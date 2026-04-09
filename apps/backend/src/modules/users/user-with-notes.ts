import type { Note } from "../notes/domain/note.js";
import type { User } from "./domain/user.js";

export type UserWithNotes = {
    readonly user: User;
    readonly notes: readonly Note[];
};
