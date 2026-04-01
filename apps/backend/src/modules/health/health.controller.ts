import type { HealthCheckResponse } from "@mvp/shared";
import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HealthCheckOpenApiModel } from "../../core/openapi/index.js";
import { HealthService } from "./health.service";

@ApiTags("Health")
@Controller("health")
export class HealthController {
    public constructor(private readonly healthService: HealthService) {}

    @Get()
    @ApiOperation({
        summary: "Health check",
        description: "Возвращает статус сервиса и метку времени. Ответ не обёрнут в `ApiResponse`.",
    })
    @ApiOkResponse({
        description: "Сервис доступен",
        type: HealthCheckOpenApiModel,
    })
    public getHealth(): HealthCheckResponse {
        return this.healthService.getHealth();
    }
}
