import * as dotenv from "dotenv";
import path from "node:path";
import { DataSource } from "typeorm";
import { NoteOrmEntity } from "../../modules/notes/infrastructure/persistence/note.orm-entity.js";
import { UserOrmEntity } from "../../modules/users/infrastructure/persistence/user.orm-entity.js";
import { parseAppEnv } from "../config/parse-app-env.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const env = parseAppEnv(process.env);

const migrationsGlob: string = path.join(__dirname, "migrations", "*.{js,ts}");

export const AppDataSource = new DataSource({
    type: "postgres",
    url: env.databaseUrl,
    entities: [UserOrmEntity, NoteOrmEntity],
    migrations: [migrationsGlob],
    synchronize: false,
    logging: env.NODE_ENV === "development",
});
