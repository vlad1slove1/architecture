import type { ApiResponse, CreateNoteRequestBody, NoteDto } from "@mvp/shared";
import { Injectable } from "@nestjs/common";
import { NoteMapper } from "./note.mapper";
import { NotesRepository } from "./notes.repository";

@Injectable()
export class NotesService {
    public constructor(private readonly repo: NotesRepository) {}

    public listNotes(): ApiResponse<readonly NoteDto[]> {
        return { success: true, data: this.repo.findAll().map(NoteMapper.toDto) };
    }

    public createNote(input: CreateNoteRequestBody): ApiResponse<NoteDto> {
        return { success: true, data: NoteMapper.toDto(this.repo.create(NoteMapper.toEntity(input))) };
    }
}