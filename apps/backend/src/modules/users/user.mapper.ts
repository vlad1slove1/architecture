import type { CreateUserRequestBody, UpdateUserRequestBody, UserDto } from "@mvp/shared";
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

    public static normalizeUpdate(input: UpdateUserRequestBody): {
        readonly email?: string;
        readonly displayName?: string;
    } {
        const patch: { email?: string; displayName?: string } = {};
        if (input.email !== undefined) {
            patch.email = input.email.trim();
        }

        if (input.displayName !== undefined) {
            patch.displayName = input.displayName.trim();
        }

        return patch;
    }
}
