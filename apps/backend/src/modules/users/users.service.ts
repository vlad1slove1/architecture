import type { ApiResponse, CreateUserRequestBody, UpdateUserRequestBody } from "@mvp/shared";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NotesService } from "../notes/notes.service.js";
import type { User } from "./domain/user.js";
import { UserMapper } from "./domain/user.mapper.js";
import { UsersTypeormRepository } from "./infrastructure/persistence/users.typeorm-repository.js";
import type { UserWithNotes } from "./types/user-with-notes.js";

@Injectable()
export class UsersService {
    public constructor(
        private readonly usersRepository: UsersTypeormRepository,
        private readonly notesService: NotesService,
    ) {}

    public async listUsers(): Promise<ApiResponse<readonly UserWithNotes[]>> {
        const users: readonly User[] = await this.usersRepository.findAll();
        const data: UserWithNotes[] = await Promise.all(
            users.map(async (user: User): Promise<UserWithNotes> => this.loadUserWithNotes(user)),
        );
        return { success: true, data };
    }

    public async createUser(input: CreateUserRequestBody): Promise<ApiResponse<UserWithNotes>> {
        const user: User = await this.usersRepository.create({
            email: input.email.trim(),
            displayName: input.displayName.trim(),
        });
        return { success: true, data: { user, notes: [] } };
    }

    public async getUserById(id: string): Promise<ApiResponse<UserWithNotes>> {
        const row = await this.usersRepository.findByIdWithNotes(id);
        if (row === null) {
            throw new NotFoundException(`Пользователь с id ${id} не найден`);
        }

        return { success: true, data: UserMapper.userWithNotesFromPersistence(row) };
    }

    public async updateUser(
        id: string,
        input: UpdateUserRequestBody,
    ): Promise<ApiResponse<UserWithNotes>> {
        const patch: { email?: string; displayName?: string } = {};
        if (input.email !== undefined) {
            patch.email = input.email.trim();
        }

        if (input.displayName !== undefined) {
            patch.displayName = input.displayName.trim();
        }

        if (patch.email === undefined && patch.displayName === undefined) {
            throw new BadRequestException("Укажите хотя бы одно поле: email или displayName");
        }

        const user: User | null = await this.usersRepository.update(id, patch);
        if (user === null) {
            throw new NotFoundException(`Пользователь с id ${id} не найден`);
        }

        return { success: true, data: await this.loadUserWithNotes(user) };
    }

    public async deleteUser(id: string): Promise<ApiResponse<UserWithNotes>> {
        const notes = await this.notesService.findAllByUserId(id);
        const user: User | null = await this.usersRepository.delete(id);
        if (user === null) {
            throw new NotFoundException(`Пользователь с id ${id} не найден`);
        }

        return { success: true, data: { user, notes } };
    }

    private async loadUserWithNotes(user: User): Promise<UserWithNotes> {
        const notes = await this.notesService.findAllByUserId(user.id);
        return { user, notes };
    }
}
