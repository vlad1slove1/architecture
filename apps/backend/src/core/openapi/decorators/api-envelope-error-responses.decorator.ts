import { applyDecorators } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from "@nestjs/swagger";
import { ApiFailureOpenApiModel, ValidationErrorOpenApiModel } from "../models/errors/index.js";

const ENVELOPE_FAILURE_DESCRIPTION =
    "Тело `ApiFailureOpenApiModel`: `{ success: false, error, code }` (`@mvp/shared`).";

/**
 * Документирует в Swagger четыре типичных HTTP-ответа с ошибкой для API в общем конверте:
 * **400** — схема Nest `ValidationPipe` **или** конверт с `code` (например `BAD_REQUEST`);
 * **401** — `UNAUTHORIZED`; **403** — `FORBIDDEN`; **404** — `NOT_FOUND`.
 */
export function ApiEnvelopeErrorResponses(): MethodDecorator {
    return applyDecorators(
        ApiBadRequestResponse({
            description:
                "Невалидное тело (ответ Nest) или бизнес-ошибка в конверте (`BAD_REQUEST` и др.).",
            schema: {
                oneOf: [
                    { $ref: getSchemaPath(ValidationErrorOpenApiModel) },
                    { $ref: getSchemaPath(ApiFailureOpenApiModel) },
                ],
            },
        }),
        ApiUnauthorizedResponse({
            description: `${ENVELOPE_FAILURE_DESCRIPTION} Код: \`UNAUTHORIZED\`.`,
            type: ApiFailureOpenApiModel,
        }),
        ApiForbiddenResponse({
            description: `${ENVELOPE_FAILURE_DESCRIPTION} Код: \`FORBIDDEN\`.`,
            type: ApiFailureOpenApiModel,
        }),
        ApiNotFoundResponse({
            description: `${ENVELOPE_FAILURE_DESCRIPTION} Код: \`NOT_FOUND\`.`,
            type: ApiFailureOpenApiModel,
        }),
    );
}
