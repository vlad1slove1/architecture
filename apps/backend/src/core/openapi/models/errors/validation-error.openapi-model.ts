import { ApiProperty } from "@nestjs/swagger";

/**
 * Типичный ответ Nest при ошибке `ValidationPipe` (HTTP 400).
 * Поле `message` — строка или массив строк с описанием правил.
 */
export class ValidationErrorOpenApiModel {
    @ApiProperty({ example: 400 })
    public statusCode!: number;

    @ApiProperty({
        oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
        example: [
            "email must be an email",
            "displayName must be longer than or equal to 1 characters",
        ],
    })
    public message!: string | string[];

    @ApiProperty({ example: "Bad Request" })
    public error!: string;
}
