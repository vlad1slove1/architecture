export class Note {
    private constructor(
        private readonly _id: string,
        private _title: string,
        private _content: string,
        private readonly _createdAt: Date,
        private readonly _userId: string | null,
    ) {}

    public static rehydrate(input: {
        readonly id: string;
        readonly title: string;
        readonly content: string;
        readonly createdAt: Date;
        readonly userId?: string | null;
    }): Note {
        return new Note(
            input.id,
            input.title.trim(),
            input.content.trim(),
            input.createdAt,
            input.userId ?? null,
        );
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value.trim();
    }

    public get content(): string {
        return this._content;
    }

    public set content(value: string) {
        this._content = value.trim();
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get userId(): string | null {
        return this._userId;
    }

    public changeTitle(newTitle: string): void {
        this._title = newTitle.trim();
    }

    public changeContent(newContent: string): void {
        this._content = newContent.trim();
    }

    public buildExcerpt(maxLength: number): string {
        const normalizedMax: number = Math.max(0, Math.floor(maxLength));

        if (this._content.length <= normalizedMax) {
            return this._content;
        }

        return `${this._content.slice(0, normalizedMax)}…`;
    }
}
