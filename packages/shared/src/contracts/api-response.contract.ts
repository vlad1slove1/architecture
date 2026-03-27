import type { ApiErrorBody } from "./api-error.contract.js";

/** Успешный ответ API: `T` — одна сущность или массив (например `UserDto` / `readonly UserDto[]`). */
export type ApiSuccessBody<T> = {
    readonly success: true;
    readonly data: T;
};

/** Ответ об ошибке в том же конверте, что и успех (например при HTTP 200 с бизнес-ошибкой). */
export type ApiFailureBody = { readonly success: false } & ApiErrorBody;

export type ApiResponse<T> = ApiSuccessBody<T> | ApiFailureBody;

export function isApiResponseSuccess<T>(response: ApiResponse<T>): response is ApiSuccessBody<T> {
    return response.success === true;
}
