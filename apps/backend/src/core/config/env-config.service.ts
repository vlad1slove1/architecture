import { Injectable } from "@nestjs/common";
import type { AppEnv } from "./env.schema.js";

@Injectable()
export class EnvConfigService {
    public constructor(private readonly env: AppEnv) {}

    public get nodeEnv(): AppEnv["NODE_ENV"] {
        return this.env.NODE_ENV;
    }

    public get port(): number {
        return this.env.PORT;
    }

    public get databaseUrl(): string {
        return this.env.databaseUrl;
    }

    public get authJwtSecret(): string {
        return this.env.AUTH_JWT_SECRET;
    }

    public get authJwtExpiresIn(): string {
        return this.env.AUTH_JWT_EXPIRES_IN;
    }

    public get authRefreshSecret(): string {
        return this.env.AUTH_REFRESH_SECRET;
    }

    public get authRefreshExpiresIn(): string {
        return this.env.AUTH_REFRESH_EXPIRES_IN;
    }
}
