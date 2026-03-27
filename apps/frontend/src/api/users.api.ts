import type { ApiResponse, CreateUserRequestBody, UserDto } from "@mvp/shared";
import { API_ROUTES } from "@mvp/shared";

import { getJson, postJson } from "./fetch-json.js";

type UsersApi = {
    readonly listUsers: () => Promise<ApiResponse<readonly UserDto[]>>;
    readonly createUser: (body: CreateUserRequestBody) => Promise<ApiResponse<UserDto>>;
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
    };
}
