import { ApiProperty } from "@nestjs/swagger";

/** Один пользователь (совпадает с `UserDto` из `@mvp/shared`). */
export class UserOpenApiModel {
    @ApiProperty({ format: "uuid", example: "550e8400-e29b-41d4-a716-446655440001" })
    public id!: string;

    @ApiProperty({ example: "user@example.com" })
    public email!: string;

    @ApiProperty({ example: "Анна" })
    public displayName!: string;

    @ApiProperty({ example: "2026-03-30T12:00:00.000Z" })
    public createdAt!: string;
}

/** Успех: `GET /api/users`. */
export class ApiSuccessUsersListOpenApiModel {
    @ApiProperty({ example: true })
    public success!: true;

    @ApiProperty({ type: [UserOpenApiModel] })
    public data!: UserOpenApiModel[];
}

/** Успех: `POST /api/users`. */
export class ApiSuccessUserOpenApiModel {
    @ApiProperty({ example: true })
    public success!: true;

    @ApiProperty({ type: () => UserOpenApiModel })
    public data!: UserOpenApiModel;
}
