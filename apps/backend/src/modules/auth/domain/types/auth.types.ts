import { UserRole } from "@mvp/shared";

/** Тип токена в заголовке `Authorization: Bearer <accessToken>`. */
export const AUTH_BEARER_TOKEN_TYPE = "Bearer" as const;
export type BearerTokenType = typeof AUTH_BEARER_TOKEN_TYPE;

/** Тело запроса `POST /auth/login`. */
export interface LoginRequestBody {
    readonly email: string;
    readonly password: string;
}

/** Тело `POST /auth/refresh` при передаче refresh в JSON. */
export interface RefreshRequestBody {
    readonly refreshToken: string;
}

/** Узкий ответ только с access (если понадобится без refresh). */
export interface AccessTokenResponse {
    readonly accessToken: string;
    readonly tokenType: BearerTokenType;
    readonly expiresIn: string;
}

/** Ответ логина и успешного refresh. */
export interface TokensResponse {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly tokenType: BearerTokenType;
    readonly expiresIn: string;
    readonly refreshExpiresIn?: string;
}

/** полезная нагрузка jwt токена */
export type JwtPayload = {
    readonly sub: string;
    readonly role: UserRole;
};
