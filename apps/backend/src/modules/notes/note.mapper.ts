import type { CreateNoteRequestBody, NoteDto } from "@mvp/shared";
import type { NoteEntity } from "./types/note.types";

export class NoteMapper {
    public static toDto(entity: NoteEntity): NoteDto {
        return { ...entity, createdAt: entity.createdAt.toISOString() };
    }
    public static toEntity(input: CreateNoteRequestBody): Omit<NoteEntity, "id" | "createdAt"> {
        return { title: input.title.trim(), content: input.content.trim() };
    }
}