export interface HealthCheckResponse {
    readonly status: "ok";
    readonly service: string;
    readonly timestamp: string;
}
