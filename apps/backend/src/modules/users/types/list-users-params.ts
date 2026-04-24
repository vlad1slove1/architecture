import { OffsetListParams } from "@mvp/shared/src/contracts";

export type ListUsersSortProperty = "createdAt" | "email" | "displayName";
export type ListUsersParams = OffsetListParams<ListUsersSortProperty>;
