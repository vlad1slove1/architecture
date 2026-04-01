import type {
    ApiResponse,
    CreateUserRequestBody,
    UpdateUserRequestBody,
    UserDto,
} from "@mvp/shared";
import { API_ROUTES } from "@mvp/shared";

import { deleteJson, getJson, patchJson, postJson } from "./fetch-json.js";

type UsersApi = {
    readonly listUsers: () => Promise<ApiResponse<readonly UserDto[]>>;
    readonly createUser: (body: CreateUserRequestBody) => Promise<ApiResponse<UserDto>>;
    readonly getUserById: (userId: string) => Promise<ApiResponse<UserDto>>;
    readonly updateUser: (
        userId: string,
        body: UpdateUserRequestBody,
    ) => Promise<ApiResponse<UserDto>>;
    readonly deleteUser: (userId: string) => Promise<ApiResponse<UserDto>>;
};

export function createUsersApi(params: { readonly baseUrl: string }): UsersApi {
    const baseUrl: string = params.baseUrl;

    return {
        async listUsers(): Promise<ApiResponse<readonly UserDto[]>> {
            return getJson<ApiResponse<readonly UserDto[]>>(baseUrl, API_ROUTES.users);
        },

        async createUser(body: CreateUserRequestBody): Promise<ApiResponse<UserDto>> {
            return postJson<CreateUserRequestBody, ApiResponse<UserDto>>(
                baseUrl,
                API_ROUTES.users,
                body,
            );
        },

        async getUserById(userId: string): Promise<ApiResponse<UserDto>> {
            return getJson<ApiResponse<UserDto>>(baseUrl, API_ROUTES.userById(userId));
        },

        async updateUser(
            userId: string,
            body: UpdateUserRequestBody,
        ): Promise<ApiResponse<UserDto>> {
            return patchJson<UpdateUserRequestBody, ApiResponse<UserDto>>(
                baseUrl,
                API_ROUTES.userById(userId),
                body,
            );
        },

        async deleteUser(userId: string): Promise<ApiResponse<UserDto>> {
            return deleteJson<ApiResponse<UserDto>>(baseUrl, API_ROUTES.userById(userId));
        },
    };
}
