import type { ApiResponse, CreateNoteRequestBody, NoteDto } from "@mvp/shared";
import { API_ROUTES } from "@mvp/shared";

import { getJson, postJson } from "./fetch-json.js";

type NotesApi = {
    readonly listNotes: () => Promise<ApiResponse<readonly NoteDto[]>>;
    readonly createNote: (body: CreateNoteRequestBody) => Promise<ApiResponse<NoteDto>>;
};

export function createNotesApi(params: { readonly baseUrl: string }): NotesApi {
    const baseUrl: string = params.baseUrl;

    return {
        async listNotes(): Promise<ApiResponse<readonly NoteDto[]>> {
            return getJson<ApiResponse<readonly NoteDto[]>>(baseUrl, API_ROUTES.notes);
        },

        async createNote(body: CreateNoteRequestBody): Promise<ApiResponse<NoteDto>> {
            return postJson<CreateNoteRequestBody, ApiResponse<NoteDto>>(
                baseUrl,
                API_ROUTES.notes,
                body,
            );
        },
    };
}
