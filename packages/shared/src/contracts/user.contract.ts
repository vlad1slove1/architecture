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

export interface CreateUserResponseBody {
    readonly user: UserDto;
}

export interface ListUsersResponseBody {
    readonly users: readonly UserDto[];
}

export interface ApiErrorBody {
    readonly error: string;
    readonly code: string;
}
