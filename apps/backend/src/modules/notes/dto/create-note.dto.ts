import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @MinLength(1)
    public title!: string;

    @IsString()
    public content!: string;

    @IsOptional()
    @IsUUID("4")
    public userId?: string;
}
