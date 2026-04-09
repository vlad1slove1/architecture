import type { AppEnv } from "./env.schema.js";
import { envSchema } from "./env.schema.js";

function buildDatabaseUrl(input: {
    readonly user: string;
    readonly password: string;
    readonly host: string;
    readonly port: number;
    readonly database: string;
}): string {
    const user: string = encodeURIComponent(input.user);
    const password: string = encodeURIComponent(input.password);
    return `postgresql://${user}:${password}@${input.host}:${String(input.port)}/${input.database}`;
}

export function parseAppEnv(raw: NodeJS.ProcessEnv): AppEnv {
    const parsed = envSchema.safeParse(raw);
    if (parsed.success === false) {
        // eslint-disable-next-line no-console -- стартовая диагностика до логгера Nest
        console.error("Некорректные переменные окружения:", parsed.error.flatten());
        throw new Error("Invalid environment configuration");
    }

    const base = parsed.data;
    const databaseUrl: string =
        base.DATABASE_URL !== undefined && base.DATABASE_URL.length > 0
            ? base.DATABASE_URL
            : buildDatabaseUrl({
                  user: base.DB_USER,
                  password: base.DB_PASSWORD,
                  host: base.DB_HOST,
                  port: base.DB_PORT,
                  database: base.DB_NAME,
              });

    return {
        ...base,
        databaseUrl,
    };
}
