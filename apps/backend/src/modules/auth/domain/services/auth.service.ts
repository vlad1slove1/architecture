import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import type { StringValue } from "ms";
import { Repository } from "typeorm";
import { EnvConfigService } from "../../../../core/config/env-config.service";
import { UserOrmEntity } from "../../../users/infrastructure/persistence/user.orm-entity";
import {
    AUTH_BEARER_TOKEN_TYPE,
    JwtPayload,
    LoginRequestBody,
    TokensResponse,
} from "../types/auth.types";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepo: Repository<UserOrmEntity>,
        private readonly jwtService: JwtService,
        private readonly envConfig: EnvConfigService,
    ) {}

    async login(loginDto: LoginRequestBody): Promise<TokensResponse> {
        const normalizedEmail: string = loginDto.email.trim().toLowerCase();
        const user: UserOrmEntity | null = await this.userRepo.findOne({
            where: { email: normalizedEmail },
        });

        if (user === null || user.passwordHash === null || user.passwordHash === "") {
            throw new UnauthorizedException();
        }

        const isMatch: boolean = await compare(loginDto.password, user.passwordHash);
        if (isMatch === false) {
            throw new UnauthorizedException();
        }

        return this.issueTokens(user);
    }

    async refreshTokens(payload: JwtPayload): Promise<TokensResponse> {
        const user: UserOrmEntity | null = await this.userRepo.findOne({
            where: { id: payload.sub },
        });

        if (user === null) {
            throw new UnauthorizedException();
        }

        return this.issueTokens(user);
    }

    private async issueTokens(user: UserOrmEntity): Promise<TokensResponse> {
        const accessPayload: JwtPayload = { sub: user.id, role: user.role };
        const accessToken: string = await this.jwtService.signAsync(
            { ...accessPayload },
            {
                secret: this.envConfig.authJwtSecret,
                expiresIn: this.envConfig.authJwtExpiresIn as StringValue,
            },
        );

        const refreshPayload: JwtPayload = { sub: user.id, role: user.role };
        const refreshToken: string = await this.jwtService.signAsync(
            { ...refreshPayload },
            {
                secret: this.envConfig.authRefreshSecret,
                expiresIn: this.envConfig.authRefreshExpiresIn as StringValue,
            },
        );

        return {
            accessToken,
            refreshToken,
            tokenType: AUTH_BEARER_TOKEN_TYPE,
            expiresIn: this.envConfig.authJwtExpiresIn,
            refreshExpiresIn: this.envConfig.authRefreshExpiresIn,
        };
    }
}
