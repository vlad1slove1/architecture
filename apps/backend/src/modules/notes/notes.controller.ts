import type { ApiResponse, NoteDto } from "@mvp/shared";
import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { NotesService } from "./notes.service";

@Controller("notes")
export class NotesController {
    public constructor(private readonly notesService: NotesService) {}

    @Get()
    public listNotes(): ApiResponse<readonly NoteDto[]> {
        return this.notesService.listNotes();
    }

    @Post()
    @HttpCode(201)
    public createNote(@Body() dto: CreateNoteDto): ApiResponse<NoteDto> {
        return this.notesService.createNote(dto);
    }
}