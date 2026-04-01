import type { Type } from "@nestjs/common";
import { getSchemaPath } from "@nestjs/swagger";

/** Схема OpenAPI: ответ — либо успешный конверт, либо `ApiFailureBody`. */
export function buildEnvelopeOneOfSchema(
    successModel: Type<unknown>,
    failureModel: Type<unknown>,
): { oneOf: Array<{ $ref: string }> } {
    return {
        oneOf: [{ $ref: getSchemaPath(successModel) }, { $ref: getSchemaPath(failureModel) }],
    };
}
