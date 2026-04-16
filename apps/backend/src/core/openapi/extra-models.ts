import { OrderModel } from "../../modules/orders/domain/models/order.model.js";
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
] as const;
