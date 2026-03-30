export interface NoteDto {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly createdAt: string;
}

export interface CreateNoteRequestBody {
    readonly title: string;
    readonly content: string;
}