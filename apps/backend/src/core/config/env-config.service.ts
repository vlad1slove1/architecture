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
}
