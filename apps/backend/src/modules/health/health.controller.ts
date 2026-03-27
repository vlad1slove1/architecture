import { Controller, Get } from "@nestjs/common";
import type { HealthCheckResponse } from "@mvp/shared";

import { HealthService } from "./health.service";

@Controller("health")
export class HealthController {
    public constructor(private readonly healthService: HealthService) {}

    @Get()
    public getHealth(): HealthCheckResponse {
        return this.healthService.getHealth();
    }
}
