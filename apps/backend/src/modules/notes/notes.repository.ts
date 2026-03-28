import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { NoteEntity } from "./types/note.types";

@Injectable()
export class NotesRepository {
    private readonly notes: NoteEntity[] = [];

    public findAll() { return [...this.notes]; }

    public create(input: { title: string; content: string }): NoteEntity {
        const note = { id: randomUUID(), ...input, createdAt: new Date() };
        this.notes.push(note);
        return note;
    }
}