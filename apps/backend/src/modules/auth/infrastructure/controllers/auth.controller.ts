import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetCurrentUser, Public } from "../../domain/decorators";
import { LoginDto, RefreshDto } from "../../domain/dto";
import { JwtRefreshAuthGuard } from "../../domain/guards";
import { AuthService } from "../../domain/services/auth.service";
import { JwtPayload, TokensResponse } from "../../domain/types/auth.types";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("login")
    @ApiOperation({ summary: "логин юзера по email и паролю" })
    @ApiBody({ type: LoginDto })
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<TokensResponse> {
        return this.authService.login(loginDto);
    }

    @Public()
    @Post("refresh")
    @ApiOperation({ summary: "refresh токенов юзера" })
    @ApiBody({ type: RefreshDto })
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtRefreshAuthGuard)
    async refresh(
        @Body() _refreshDto: RefreshDto,
        @GetCurrentUser() user: JwtPayload,
    ): Promise<TokensResponse> {
        // я пока не работаю с refresh из-за отсутствия session таблицы в бд
        return this.authService.refreshTokens(user);
    }
}
