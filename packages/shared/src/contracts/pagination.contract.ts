export type PaginationMeta = {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly sortProperty?: string;
    readonly sortDirection?: "ASC" | "DESC";
};

export type PagedApiResponse<T> = {
    readonly items: T[];
    readonly meta: PaginationMeta;
};

export type OffsetListParams<T extends string> = {
    readonly page: number;
    readonly limit: number;
    readonly sortProperty: T;
    readonly sortDirection: "ASC" | "DESC";
};

export type OffsetPageResponse<T> = {
    readonly items: T[];
    readonly total: number;
    readonly totalPages: number;
};
