import { z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(3000),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive().default(5432),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
    DATABASE_URL: z.string().min(1).optional(),
    AUTH_JWT_SECRET: z.string().min(1),
    AUTH_JWT_EXPIRES_IN: z.string().min(1).default("15m"),
    AUTH_REFRESH_SECRET: z.string().min(1),
    AUTH_REFRESH_EXPIRES_IN: z.string().min(1).default("30d"),
});

export type EnvSchemaOutput = z.infer<typeof envSchema>;

export type AppEnv = EnvSchemaOutput & {
    readonly databaseUrl: string;
};
