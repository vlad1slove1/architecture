import { createUsersApi } from "../../../api/index.js";
import { getApiBaseUrl } from "../../../config/api-base-url.js";

export const usersPageApi = createUsersApi({ baseUrl: getApiBaseUrl() });
