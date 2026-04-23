import { IsEmail, IsString, MinLength } from "class-validator";
import { LoginRequestBody } from "../types/auth.types";

export class LoginDto implements LoginRequestBody {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(5)
    password!: string;
}
