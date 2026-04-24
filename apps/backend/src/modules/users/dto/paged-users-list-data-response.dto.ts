import { ApiProperty } from "@nestjs/swagger";
import { PaginationMetaResponseDto } from "../../../core/dto";
import { UserOpenApiModel } from "../../../core/openapi";

export class PagedUsersListDataResponseDto {
    @ApiProperty({ type: UserOpenApiModel })
    items!: UserOpenApiModel[];

    @ApiProperty({ type: () => PaginationMetaResponseDto })
    meta!: PaginationMetaResponseDto;
}

export class PagedUsersListEnvelopeDto {
    @ApiProperty({ example: true })
    success!: boolean;

    @ApiProperty({ type: () => PagedUsersListDataResponseDto })
    data!: PagedUsersListDataResponseDto;
}
