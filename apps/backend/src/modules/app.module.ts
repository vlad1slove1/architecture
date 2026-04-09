import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvConfigModule } from "../core/config/env-config.module.js";
import { EnvConfigService } from "../core/config/env-config.service.js";
import { HealthModule } from "./health/health.module.js";
import { NotesModule } from "./notes/notes.module.js";
import { UsersModule } from "./users/users.module.js";

@Module({
    imports: [
        EnvConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [EnvConfigModule],
            inject: [EnvConfigService],
            useFactory: (env: EnvConfigService) => ({
                type: "postgres" as const,
                url: env.databaseUrl,
                autoLoadEntities: true,
                synchronize: false,
            }),
        }),
        HealthModule,
        UsersModule,
        NotesModule,
    ],
})
export class AppModule {}
