import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../types/auth.types";

export const GetCurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): JwtPayload => {
        const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
        return request.user;
    },
);
