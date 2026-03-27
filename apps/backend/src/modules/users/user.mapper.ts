import type { CreateUserRequestBody, UserDto } from "@mvp/shared";
import type { UserEntity } from "./types/user.types";

export class UserMapper {
    public static toDto(entity: UserEntity): UserDto {
        return {
            id: entity.id,
            email: entity.email,
            displayName: entity.displayName,
            createdAt: entity.createdAt.toISOString(),
        };
    }

    public static toEntity(input: CreateUserRequestBody): Omit<UserEntity, "id" | "createdAt"> {
        return {
            email: input.email.trim(),
            displayName: input.displayName.trim(),
        };
    }
}
