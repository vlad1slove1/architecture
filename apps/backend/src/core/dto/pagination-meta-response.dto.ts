import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetaResponseDto {
    @ApiProperty({ description: "страница", example: 1, minimum: 1 })
    page!: number;

    @ApiProperty({ description: "выборка", example: 25, minimum: 1 })
    limit!: number;

    @ApiProperty({ description: "всего записей", example: 1000, minimum: 0 })
    total!: number;

    @ApiProperty({ description: "всего страниц", example: 1, minimum: 1 })
    totalPages!: number;

    @ApiProperty({ description: "признак сортировки", required: false, example: "createdAt" })
    sortProperty?: string;

    @ApiProperty({
        description: "направление сортировки",
        required: false,
        enum: ["ASC", "DESC"],
        example: "ASC",
    })
    sortDirection?: "ASC" | "DESC";
}
