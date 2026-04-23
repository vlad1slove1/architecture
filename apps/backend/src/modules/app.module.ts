import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvConfigModule } from "../core/config/env-config.module.js";
import { EnvConfigService } from "../core/config/env-config.service.js";
import { AuthModule } from "./auth/auth.module.js";
import { HealthModule } from "./health/health.module.js";
import { NotesModule } from "./notes/notes.module.js";
import { OrdersModule } from "./orders/orders.module.js";
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
        AuthModule,
        HealthModule,
        UsersModule,
        NotesModule,
        OrdersModule,
    ],
})
export class AppModule {}
