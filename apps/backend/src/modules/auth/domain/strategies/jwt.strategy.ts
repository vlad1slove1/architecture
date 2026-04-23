import { UserRole } from "@mvp/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvConfigService } from "../../../../core/config/env-config.service";
import { JwtPayload } from "../types/auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(envConfig: EnvConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envConfig.authJwtSecret,
        });
    }

    validate(payaload: JwtPayload): JwtPayload {
        if (payaload.sub === undefined || payaload.sub === "") {
            throw new UnauthorizedException();
        }

        if (payaload.role !== UserRole.USER && payaload.role !== UserRole.ADMIN) {
            throw new UnauthorizedException();
        }

        return payaload;
    }
}
