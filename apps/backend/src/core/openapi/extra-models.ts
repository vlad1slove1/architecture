import { OrderModel } from "../../modules/orders/domain/models/order.model.js";
import { ListUsersQueryDto } from "../../modules/users/dto/list-users-query.dto.js";
import {
    PagedUsersListDataResponseDto,
    PagedUsersListEnvelopeDto,
} from "../../modules/users/dto/paged-users-list-data-response.dto.js";
import { PaginationMetaResponseDto } from "../dto/pagination-meta-response.dto.js";
import {
    ApiFailureOpenApiModel,
    ApiSuccessNoteOpenApiModel,
    ApiSuccessNotesListOpenApiModel,
    ApiSuccessUserOpenApiModel,
    ApiSuccessUsersListOpenApiModel,
    HealthCheckOpenApiModel,
    NoteOpenApiModel,
    UserOpenApiModel,
    ValidationErrorOpenApiModel,
} from "./models/index.js";

/** Классы `@ApiExtraModels` / `extraModels` для генерации OpenAPI (регистрация в `main.ts`). */
export const OPENAPI_EXTRA_MODELS = [
    HealthCheckOpenApiModel,
    NoteOpenApiModel,
    UserOpenApiModel,
    ApiFailureOpenApiModel,
    ApiSuccessNotesListOpenApiModel,
    ApiSuccessNoteOpenApiModel,
    ApiSuccessUsersListOpenApiModel,
    ApiSuccessUserOpenApiModel,
    ValidationErrorOpenApiModel,
    OrderModel,
    PaginationMetaResponseDto,
    PagedUsersListDataResponseDto,
    PagedUsersListEnvelopeDto,
    ListUsersQueryDto,
] as const;
