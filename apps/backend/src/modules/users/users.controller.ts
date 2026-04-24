import { isApiResponseSuccess, UserRole, type ApiResponse, type UserDto } from "@mvp/shared";
import { PagedApiResponse } from "@mvp/shared/src/contracts/pagination.contract.js";
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
    Query,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
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
    buildEnvelopeOneOfSchema,
} from "../../core/openapi/index.js";
import { Roles } from "../auth/domain/decorators/roles.decorator.js";
import { JwtAuthGuard } from "../auth/domain/guards/jwt-auth.guard.js";
import { UserMapper } from "./domain/user.mapper.js";
import { CreateUserDto } from "./dto/create-user.dto";
import { ListUsersQueryDto } from "./dto/list-users-query.dto.js";
import { PagedUsersListEnvelopeDto } from "./dto/paged-users-list-data-response.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ListUsersParams } from "./types/list-users-params.js";
import type { UserWithNotes } from "./types/user-with-notes.js";
import { UsersService } from "./users.service.js";

@ApiTags("Users")
@Controller("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
    public constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({
        summary: "Список пользователей",
        description: "Возвращает пагинированный список пользователей",
    })
    @ApiOkResponse({
        description: "Успех или бизнес-ошибка в теле ответа",
        schema: buildEnvelopeOneOfSchema(PagedUsersListEnvelopeDto, ApiFailureOpenApiModel),
    })
    @ApiEnvelopeErrorResponses()
    public async listUsers(
        @Query() query: ListUsersQueryDto,
    ): Promise<ApiResponse<PagedApiResponse<UserDto>>> {
        const params: ListUsersParams = {
            page: query.page ?? 1,
            limit: query.limit ?? 25,
            sortProperty: query.sortProperty ?? "createdAt",
            sortDirection: query.sortDirection ?? "ASC",
        };

        const result = await this.usersService.listUsers(params);

        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return {
            success: true,
            data: {
                items: result.data.items.map(UserMapper.toDto),
                meta: result.data.meta,
            },
        };
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
    public async createUser(@Body() dto: CreateUserDto): Promise<ApiResponse<UserDto>> {
        const result: ApiResponse<UserWithNotes> = await this.usersService.createUser({
            email: dto.email,
            displayName: dto.displayName,
        });
        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return {
            success: true,
            data: UserMapper.toDtoWithNotes(result.data.user, result.data.notes),
        };
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
    public async getUserById(
        @Param("id", ParseUUIDPipe) id: string,
    ): Promise<ApiResponse<UserDto>> {
        const result: ApiResponse<UserWithNotes> = await this.usersService.getUserById(id);
        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return {
            success: true,
            data: UserMapper.toDtoWithNotes(result.data.user, result.data.notes),
        };
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
    public async updateUser(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<ApiResponse<UserDto>> {
        const result: ApiResponse<UserWithNotes> = await this.usersService.updateUser(id, {
            email: dto.email,
            displayName: dto.displayName,
        });
        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return {
            success: true,
            data: UserMapper.toDtoWithNotes(result.data.user, result.data.notes),
        };
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
    public async deleteUser(@Param("id", ParseUUIDPipe) id: string): Promise<ApiResponse<UserDto>> {
        const result: ApiResponse<UserWithNotes> = await this.usersService.deleteUser(id);
        if (!isApiResponseSuccess(result)) {
            return result;
        }

        return {
            success: true,
            data: UserMapper.toDtoWithNotes(result.data.user, result.data.notes),
        };
    }
}
