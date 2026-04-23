import { IsNotEmpty, IsString } from "class-validator";
import { RefreshRequestBody } from "../types/auth.types";

export class RefreshDto implements RefreshRequestBody {
    @IsString()
    @IsNotEmpty()
    refreshToken!: string;
}
