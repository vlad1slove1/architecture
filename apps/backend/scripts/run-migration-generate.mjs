import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseMigrationName } from "./parse-migration-name.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, "..");

const migrationName = parseMigrationName(process.argv);
if (migrationName === null) {
    console.error(
        "Укажите имя миграции (латиница, цифры, _ и -), например:\n" +
            "  npm run migration:generate -- Init\n" +
            "  npm run migration:generate -w @mvp/backend -- AddNotesTable",
    );
    process.exit(1);
}

const relativePath = `src/core/database/migrations/${migrationName}`;

execSync("npm run build", { cwd: backendRoot, stdio: "inherit" });
execSync(
    `npx typeorm migration:generate "${relativePath}" -d dist/src/core/database/data-source.js`,
    { cwd: backendRoot, stdio: "inherit", shell: true },
);
