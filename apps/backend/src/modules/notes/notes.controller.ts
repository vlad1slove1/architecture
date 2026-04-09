import { isApiResponseSuccess, type ApiResponse, type NoteDto } from "@mvp/shared";
import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    ApiEnvelopeErrorResponses,
    ApiFailureOpenApiModel,
    ApiSuccessNoteOpenApiModel,
    ApiSuccessNotesListOpenApiModel,
    buildEnvelopeOneOfSchema,
} from "../../core/openapi/index.js";
import type { Note } from "./domain/note.js";
import { NoteMapper } from "./domain/note.mapper.js";
import { CreateNoteDto } from "./dto/create-note.dto";
import { NotesService } from "./notes.service.js";

@ApiTags("Notes")
@Controller("notes")
export class NotesController {
    public constructor(private readonly notesService: NotesService) {}

    @Get()
    @ApiOperation({
        summary: "Список заметок",
        description:
            "Возвращает `ApiResponse<NoteDto[]>`: успех с массивом в `data` или бизнес-ошибку в том же JSON.",
    })
    @ApiOkResponse({
        description: "Успех (`success: true`) или ошибка (`success: false`)",
        schema: buildEnvelopeOneOfSchema(ApiSuccessNotesListOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public async listNotes(): Promise<ApiResponse<readonly NoteDto[]>> {
        const result: ApiResponse<readonly Note[]> = await this.notesService.listNotes();
        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return {
            success: true,
            data: result.data.map((n: Note): NoteDto => NoteMapper.toDto(n)),
        };
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({
        summary: "Создать заметку",
        description:
            "Тело валидируется `ValidationPipe` + class-validator. При ошибке полей — HTTP 400.",
    })
    @ApiBody({ type: CreateNoteDto, description: "Поля новой заметки" })
    @ApiCreatedResponse({
        description: "Создано: `success: true` и сущность в `data`, либо бизнес-ошибка в конверте",
        schema: buildEnvelopeOneOfSchema(ApiSuccessNoteOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public async createNote(@Body() dto: CreateNoteDto): Promise<ApiResponse<NoteDto>> {
        const result: ApiResponse<Note> = await this.notesService.createNote({
            title: dto.title,
            content: dto.content,
            userId: dto.userId,
        });

        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return { success: true, data: NoteMapper.toDto(result.data) };
    }
}
