import type {
    CreateUserRequestBody,
    CreateUserResponseBody,
    ListUsersResponseBody,
} from "@mvp/shared";
import { API_ROUTES } from "@mvp/shared";

import { getJson, postJson } from "./fetch-json.js";

type UsersApi = {
    readonly listUsers: () => Promise<ListUsersResponseBody>;
    readonly createUser: (body: CreateUserRequestBody) => Promise<CreateUserResponseBody>;
};

export function createUsersApi(params: { readonly baseUrl: string }): UsersApi {
    const baseUrl: string = params.baseUrl;

    return {
        async listUsers(): Promise<ListUsersResponseBody> {
            return getJson<ListUsersResponseBody>(baseUrl, API_ROUTES.users);
        },

        async createUser(body: CreateUserRequestBody): Promise<CreateUserResponseBody> {
            return postJson<CreateUserRequestBody, CreateUserResponseBody>(
                baseUrl,
                API_ROUTES.users,
                body,
            );
        },
    };
}
