import { UserRole } from "@mvp/shared";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles" as const;

export const Roles = (...roles: readonly UserRole[]): ReturnType<typeof SetMetadata> =>
    SetMetadata(ROLES_KEY, roles);
