import { IsString, MinLength } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @MinLength(1)
    public title!: string;

    @IsString()
    public content!: string;
}
