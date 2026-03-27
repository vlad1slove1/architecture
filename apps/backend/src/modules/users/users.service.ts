import type {
    CreateUserRequestBody,
    CreateUserResponseBody,
    ListUsersResponseBody,
    UserDto,
} from "@mvp/shared";
import { Injectable } from "@nestjs/common";

import type { UserEntity } from "./types/user.types";
import { UserMapper } from "./user.mapper";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    public constructor(private readonly usersRepository: UsersRepository) {}

    public listUsers(): ListUsersResponseBody {
        const users: readonly UserEntity[] = this.usersRepository.findAll();
        return {
            users: users.map((u: UserEntity): UserDto => UserMapper.toDto(u)),
        };
    }

    public createUser(input: CreateUserRequestBody): CreateUserResponseBody {
        const entity: UserEntity = this.usersRepository.create(UserMapper.toEntity(input));
        return { user: UserMapper.toDto(entity) };
    }
}
