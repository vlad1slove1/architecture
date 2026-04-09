import type { ApiResponse, CreateNoteRequestBody } from "@mvp/shared";
import { Injectable } from "@nestjs/common";
import type { Note } from "./domain/note.js";
import { NotesTypeormRepository } from "./infrastructure/persistence/notes.typeorm-repository.js";

@Injectable()
export class NotesService {
    public constructor(private readonly notesRepository: NotesTypeormRepository) {}

    public async listNotes(): Promise<ApiResponse<readonly Note[]>> {
        const notes: readonly Note[] = await this.notesRepository.findAll();
        return { success: true, data: notes };
    }

    public async findAllByUserId(userId: string): Promise<readonly Note[]> {
        return this.notesRepository.findByUserId(userId);
    }

    public async createNote(input: CreateNoteRequestBody): Promise<ApiResponse<Note>> {
        const ownerUserId: string | undefined =
            input.userId === undefined ? undefined : input.userId.trim();

        const note: Note = await this.notesRepository.create({
            title: input.title.trim(),
            content: input.content.trim(),
            ...(ownerUserId !== undefined && ownerUserId.length > 0 ? { userId: ownerUserId } : {}),
        });

        return { success: true, data: note };
    }
}
