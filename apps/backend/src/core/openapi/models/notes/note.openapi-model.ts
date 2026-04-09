import { ApiProperty } from "@nestjs/swagger";

/** Одна заметка в ответе API (совпадает с `NoteDto` из `@mvp/shared`). */
export class NoteOpenApiModel {
    @ApiProperty({ format: "uuid", example: "550e8400-e29b-41d4-a716-446655440000" })
    public id!: string;

    @ApiProperty({ example: "Покупки" })
    public title!: string;

    @ApiProperty({ example: "Молоко, хлеб" })
    public content!: string;

    @ApiProperty({ example: "2026-03-30T12:00:00.000Z" })
    public createdAt!: string;

    @ApiProperty({ format: "uuid", nullable: true, description: "Владелец заметки" })
    public userId!: string | null;
}

/** Успех: `GET /api/notes` — список заметок. */
export class ApiSuccessNotesListOpenApiModel {
    @ApiProperty({ example: true })
    public success!: true;

    @ApiProperty({ type: [NoteOpenApiModel] })
    public data!: NoteOpenApiModel[];
}

/** Успех: `POST /api/notes` — созданная заметка. */
export class ApiSuccessNoteOpenApiModel {
    @ApiProperty({ example: true })
    public success!: true;

    @ApiProperty({ type: () => NoteOpenApiModel })
    public data!: NoteOpenApiModel;
}
