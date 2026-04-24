import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";

type OffsetListQueryInstance<T extends string> = {
    page?: number;
    limit?: number;
    sortProperty?: T;
    sortDirection?: "ASC" | "DESC";
};

export function createOffsetListQueryDto<const T extends string>(
    allowedSortProperties: readonly T[],
): new () => OffsetListQueryInstance<T> {
    const allowedSortValues: readonly string[] = [...allowedSortProperties];

    class OffsetListQueryDto implements OffsetListQueryInstance<T> {
        @ApiPropertyOptional({ example: 1, minimum: 1, description: "Номер страницы (с 1)." })
        @IsOptional()
        @Type(() => Number)
        @IsInt()
        @Min(1)
        public page?: number;

        @ApiPropertyOptional({ example: 20, minimum: 1, description: "Размер страницы." })
        @IsOptional()
        @Type(() => Number)
        @IsInt()
        @Min(1)
        @Max(100)
        public limit?: number;

        @ApiPropertyOptional({
            enum: allowedSortProperties as unknown as readonly T[],
            description: "Поле сортировки (whitelist).",
        })
        @IsOptional()
        @IsIn(allowedSortValues)
        public sortProperty?: T;

        @ApiPropertyOptional({ enum: ["ASC", "DESC"], description: "Направление сортировки." })
        @IsOptional()
        @IsIn(["ASC", "DESC"])
        public sortDirection?: "ASC" | "DESC";
    }

    return OffsetListQueryDto as new () => OffsetListQueryInstance<T>;
}
