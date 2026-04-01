import type { ApiResponse, UserDto } from "@mvp/shared";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from "@nestjs/common";
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import {
    ApiEnvelopeErrorResponses,
    ApiFailureOpenApiModel,
    ApiSuccessUserOpenApiModel,
    ApiSuccessUsersListOpenApiModel,
    buildEnvelopeOneOfSchema,
} from "../../core/openapi/index.js";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    public constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({
        summary: "Список пользователей",
        description: "Возвращает `ApiResponse<UserDto[]>` в общем конверте API.",
    })
    @ApiOkResponse({
        description: "Успех или бизнес-ошибка в теле ответа",
        schema: buildEnvelopeOneOfSchema(ApiSuccessUsersListOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public listUsers(): ApiResponse<readonly UserDto[]> {
        return this.usersService.listUsers();
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({
        summary: "Создать пользователя",
        description: "Проверка email и непустого `displayName`. Ошибки валидации — HTTP 400.",
    })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({
        description: "Создан пользователь в `data` или бизнес-ошибка",
        schema: buildEnvelopeOneOfSchema(ApiSuccessUserOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public createUser(@Body() dto: CreateUserDto): ApiResponse<UserDto> {
        return this.usersService.createUser({
            email: dto.email,
            displayName: dto.displayName,
        });
    }

    @Get(":id")
    @ApiOperation({
        summary: "Пользователь по id",
        description: "Возвращает `ApiResponse<UserDto>` или HTTP 404, если пользователя нет.",
    })
    @ApiParam({ name: "id", format: "uuid", description: "Идентификатор пользователя" })
    @ApiOkResponse({
        description: "Успех или бизнес-ошибка в теле ответа",
        schema: buildEnvelopeOneOfSchema(ApiSuccessUserOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public getUserById(@Param("id", ParseUUIDPipe) id: string): ApiResponse<UserDto> {
        return this.usersService.getUserById(id);
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Обновить пользователя",
        description:
            "Частичное обновление: передайте `email` и/или `displayName`. Пустое тело — HTTP 400. Несуществующий id — HTTP 404.",
    })
    @ApiParam({ name: "id", format: "uuid" })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({
        description: "Обновлённый пользователь в `data` или бизнес-ошибка",
        schema: buildEnvelopeOneOfSchema(ApiSuccessUserOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public updateUser(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() dto: UpdateUserDto,
    ): ApiResponse<UserDto> {
        return this.usersService.updateUser(id, {
            email: dto.email,
            displayName: dto.displayName,
        });
    }

    @Delete(":id")
    @HttpCode(200)
    @ApiOperation({
        summary: "Удалить пользователя",
        description:
            "Возвращает удалённого пользователя в `data` (`ApiResponse<UserDto>`). Несуществующий id — HTTP 404.",
    })
    @ApiParam({ name: "id", format: "uuid" })
    @ApiOkResponse({
        description: "Данные удалённого пользователя",
        schema: buildEnvelopeOneOfSchema(ApiSuccessUserOpenApiModel, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public deleteUser(@Param("id", ParseUUIDPipe) id: string): ApiResponse<UserDto> {
        return this.usersService.deleteUser(id);
    }
}
