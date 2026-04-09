import { Global, Module } from "@nestjs/common";
import { EnvConfigService } from "./env-config.service.js";
import { parseAppEnv } from "./parse-app-env.js";

@Global()
@Module({
    providers: [
        {
            provide: EnvConfigService,
            useFactory: (): EnvConfigService => {
                const env = parseAppEnv(process.env);
                return new EnvConfigService(env);
            },
        },
    ],
    exports: [EnvConfigService],
})
export class EnvConfigModule {}
