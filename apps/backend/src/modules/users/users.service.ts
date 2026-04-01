import type {
    ApiResponse,
    CreateUserRequestBody,
    UpdateUserRequestBody,
    UserDto,
} from "@mvp/shared";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

    public getUserById(id: string): ApiResponse<UserDto> {
        const entity: UserEntity | undefined = this.usersRepository.findById(id);
        if (entity === undefined) {
            throw new NotFoundException(`Пользователь с id ${id} не найден`);
        }

        return { success: true, data: UserMapper.toDto(entity) };
    }

    public updateUser(id: string, input: UpdateUserRequestBody): ApiResponse<UserDto> {
        const patch: { readonly email?: string; readonly displayName?: string } =
            UserMapper.normalizeUpdate(input);

        if (patch.email === undefined && patch.displayName === undefined) {
            throw new BadRequestException("Укажите хотя бы одно поле: email или displayName");
        }

        const entity: UserEntity | undefined = this.usersRepository.update(id, patch);
        if (entity === undefined) {
            throw new NotFoundException(`Пользователь с id ${id} не найден`);
        }

        return { success: true, data: UserMapper.toDto(entity) };
    }

    public deleteUser(id: string): ApiResponse<UserDto> {
        const entity: UserEntity | undefined = this.usersRepository.delete(id);
        if (entity === undefined) {
            throw new NotFoundException(`Пользователь с id ${id} не найден`);
        }

        return { success: true, data: UserMapper.toDto(entity) };
    }
}
