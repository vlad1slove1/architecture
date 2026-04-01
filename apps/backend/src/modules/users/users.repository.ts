import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { UserEntity } from "./types/user.types";

@Injectable()
export class UsersRepository {
    private readonly users: UserEntity[] = [];

    public findAll(): readonly UserEntity[] {
        return [...this.users];
    }

    public findById(id: string): UserEntity | undefined {
        return this.users.find((u: UserEntity): boolean => u.id === id);
    }

    public create(input: { email: string; displayName: string }): UserEntity {
        const user: UserEntity = {
            id: randomUUID(),
            email: input.email,
            displayName: input.displayName,
            createdAt: new Date(),
        };

        this.users.push(user);
        return user;
    }

    public update(
        id: string,
        patch: { readonly email?: string; readonly displayName?: string },
    ): UserEntity | undefined {
        const index: number = this.users.findIndex((u: UserEntity): boolean => u.id === id);
        if (index === -1) {
            return undefined;
        }

        const previous: UserEntity = this.users[index]!;
        const next: UserEntity = {
            id: previous.id,
            email: patch.email !== undefined ? patch.email : previous.email,
            displayName: patch.displayName !== undefined ? patch.displayName : previous.displayName,
            createdAt: previous.createdAt,
        };

        this.users[index] = next;
        return next;
    }

    public delete(id: string): UserEntity | undefined {
        const index: number = this.users.findIndex((u: UserEntity): boolean => u.id === id);
        if (index === -1) {
            return undefined;
        }

        const removed: UserEntity = this.users[index]!;
        this.users.splice(index, 1);
        return removed;
    }
}
