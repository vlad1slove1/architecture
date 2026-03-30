export const API_PREFIX = "/api" as const;

export const API_ROUTES = {
    health: `${API_PREFIX}/health`,
    users: `${API_PREFIX}/users`,
    userById: (userId: string): string => `${API_PREFIX}/users/${encodeURIComponent(userId)}`,
    notes: `${API_PREFIX}/notes`,
} as const;
