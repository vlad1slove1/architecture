import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { UserEntity } from "./types/user.types";

@Injectable()
export class UsersRepository {
    private readonly users: UserEntity[] = [];

    public findAll(): readonly UserEntity[] {
        return [...this.users];
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
}
