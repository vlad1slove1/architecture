import type { ApiResponse, NoteDto } from "@mvp/shared";
import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
    ApiEnvelopeErrorResponses,
    ApiFailureOpenApiModel,
    ApiSuccessNoteOpenApiModel,
    ApiSuccessNotesListOpenApiModel,
    buildEnvelopeOneOfSchema,
} from "../../core/openapi/index.js";
import { CreateNoteDto } from "./dto/create-note.dto";
import { NotesService } from "./notes.service";

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
    public listNotes(): ApiResponse<readonly NoteDto[]> {
        return this.notesService.listNotes();
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
    public createNote(@Body() dto: CreateNoteDto): ApiResponse<NoteDto> {
        return this.notesService.createNote(dto);
    }
}
