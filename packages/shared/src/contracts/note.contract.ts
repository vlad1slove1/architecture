export interface NoteDto {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly createdAt: string;
    readonly userId: string | null;
}

export interface CreateNoteRequestBody {
    readonly title: string;
    readonly content: string;
    readonly userId?: string;
}
