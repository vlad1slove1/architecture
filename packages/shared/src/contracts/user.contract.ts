export interface UserDto {
    readonly id: string;
    readonly email: string;
    readonly displayName: string;
    readonly createdAt: string;
}

export interface CreateUserRequestBody {
    readonly email: string;
    readonly displayName: string;
}

export interface UpdateUserRequestBody {
    readonly email?: string;
    readonly displayName?: string;
}
