import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import { IS_PUBLIC_KEY } from "../decorators/is-public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    private readonly API_SWAGGER_PATH: string = "api/swagger";

    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const pathWithoutQuery = req.path ?? req.url.split("?").at(0) ?? "";

        if (
            pathWithoutQuery === this.API_SWAGGER_PATH ||
            pathWithoutQuery.startsWith(this.API_SWAGGER_PATH)
        ) {
            return true;
        }

        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic && isPublic === true) {
            return true;
        }

        return super.canActivate(context) as boolean | Promise<boolean>;
    }
}
