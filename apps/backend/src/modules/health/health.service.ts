import { Injectable } from "@nestjs/common";
import type { HealthCheckResponse } from "@mvp/shared";

@Injectable()
export class HealthService {
    public getHealth(): HealthCheckResponse {
        return {
            status: "ok",
            service: "mvp-backend",
            timestamp: new Date().toISOString(),
        };
    }
}
