import { ApiProperty } from "@nestjs/swagger";

/** Схема ответа `GET /api/health` (совпадает с `HealthCheckResponse` из `@mvp/shared`). */
export class HealthCheckOpenApiModel {
    @ApiProperty({ enum: ["ok"], description: "Признак того, что сервис жив" })
    public status!: "ok";

    @ApiProperty({ example: "mvp-backend", description: "Имя сервиса" })
    public service!: string;

    @ApiProperty({
        example: "2026-03-30T12:00:00.000Z",
        description: "Время проверки в ISO 8601",
    })
    public timestamp!: string;
}
