import type { CreateUserResponseBody, ListUsersResponseBody } from "@mvp/shared";
import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    public constructor(private readonly usersService: UsersService) {}

    @Get()
    public listUsers(): ListUsersResponseBody {
        return this.usersService.listUsers();
    }

    @Post()
    @HttpCode(201)
    public createUser(@Body() dto: CreateUserDto): CreateUserResponseBody {
        return this.usersService.createUser({
            email: dto.email,
            displayName: dto.displayName,
        });
    }
}
