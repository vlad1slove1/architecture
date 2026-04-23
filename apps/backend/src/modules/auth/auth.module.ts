import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import type { StringValue } from "ms";
import { EnvConfigModule } from "../../core/config/env-config.module";
import { EnvConfigService } from "../../core/config/env-config.service";
import { UserOrmEntity } from "../users/infrastructure/persistence/user.orm-entity";
import { JwtAuthGuard, JwtRefreshAuthGuard } from "./domain/guards";
import { AuthService } from "./domain/services/auth.service";
import { JwtStrategy, RefreshStrategy } from "./domain/strategies";
import { AuthController } from "./infrastructure/controllers/auth.controller";

@Module({
    imports: [
        EnvConfigModule,
        TypeOrmModule.forFeature([UserOrmEntity]),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            imports: [EnvConfigModule],
            inject: [EnvConfigService],
            useFactory: (env: EnvConfigService) => ({
                secret: env.authJwtSecret,
                signOptions: {
                    expiresIn: env.authJwtExpiresIn as StringValue,
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RefreshStrategy, JwtAuthGuard, JwtRefreshAuthGuard],
    exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
