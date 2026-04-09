export class User {
    private constructor(
        private readonly _id: string,
        private _email: string,
        private _displayName: string,
        private readonly _createdAt: Date,
    ) {}

    public static rehydrate(input: {
        readonly id: string;
        readonly email: string;
        readonly displayName: string;
        readonly createdAt: Date;
    }): User {
        return new User(input.id, input.email.trim(), input.displayName.trim(), input.createdAt);
    }

    public get id(): string {
        return this._id;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value.trim();
    }

    public get displayName(): string {
        return this._displayName;
    }

    public set displayName(value: string) {
        this._displayName = value.trim();
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public changeEmail(newEmail: string): void {
        this._email = newEmail.trim();
    }

    public changeDisplayName(newDisplayName: string): void {
        this._displayName = newDisplayName.trim();
    }

    public hasSameEmailAs(otherEmail: string): boolean {
        return this._email.toLowerCase() === otherEmail.trim().toLowerCase();
    }
}
