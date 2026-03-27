import type { HealthCheckResponse } from "@mvp/shared";
import { API_ROUTES } from "@mvp/shared";

import { getJson } from "./fetch-json.js";

type HealthApi = {
    readonly checkHealth: () => Promise<HealthCheckResponse>;
};

export function createHealthApi(params: { readonly baseUrl: string }): HealthApi {
    const baseUrl: string = params.baseUrl;

    return {
        async checkHealth(): Promise<HealthCheckResponse> {
            return getJson<HealthCheckResponse>(baseUrl, API_ROUTES.health);
        },
    };
}
