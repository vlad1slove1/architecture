import { createOffsetListQueryDto } from "../../../core/dto/create-offset-list-query.dto";

const LIST_USERS_SORT_WHITELIST = ["createdAt", "email", "displayName"] as const;

export class ListUsersQueryDto extends createOffsetListQueryDto(LIST_USERS_SORT_WHITELIST) {}
