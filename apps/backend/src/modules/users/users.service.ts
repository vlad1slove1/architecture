import type { ApiResponse, CreateUserRequestBody, UserDto } from "@mvp/shared";
import { Injectable } from "@nestjs/common";

import type { UserEntity } from "./types/user.types";
import { UserMapper } from "./user.mapper";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    public constructor(private readonly usersRepository: UsersRepository) {}

    public listUsers(): ApiResponse<readonly UserDto[]> {
        const users: readonly UserEntity[] = this.usersRepository.findAll();
        return {
            success: true,
            data: users.map((u: UserEntity): UserDto => UserMapper.toDto(u)),
        };
    }

    public createUser(input: CreateUserRequestBody): ApiResponse<UserDto> {
        const entity: UserEntity = this.usersRepository.create(UserMapper.toEntity(input));
        return { success: true, data: UserMapper.toDto(entity) };
    }
}
