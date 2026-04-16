import "reflect-metadata";
import "./load-env.js";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { parseAppEnv } from "./core/config/parse-app-env.js";
import { OPENAPI_EXTRA_MODELS } from "./core/openapi/index.js";
import { AppModule } from "./modules/app.module.js";

/** Сегмент после глобального префикса `api` → полный URL `/api/swagger`. */
const SWAGGER_PATH = "swagger";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();
    app.setGlobalPrefix("api");
    app.enableCors({ origin: true });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const openApiConfig = new DocumentBuilder()
        .setTitle("MVP API")
        .setDescription(
            [
                "REST API монорепозитория: общий контракт в пакете `@mvp/shared`, реализация на NestJS.",
                "",
                "**Префикс:** все маршруты контроллеров под `/api`.",
                "**Конверт ответов:** `users` и `notes` возвращают `ApiResponse<T>` — либо `{ success: true, data }`, либо `{ success: false, error, code }`.",
                "**Health:** `GET /api/health` отдаёт плоский JSON без конверта.",
                "",
                "**Документация:** Swagger UI — `/api/swagger`, OpenAPI JSON — `/api/swagger/openapi.json`, YAML — `/api/swagger/openapi.yaml`.",
            ].join("\n"),
        )
        .setVersion("1.0.0")
        .addServer("http://localhost:3000", "Локально (порт по умолчанию)")
        .addTag("Health", "Проверка доступности сервиса")
        .addTag("Users", "Пользователи")
        .addTag("Notes", "Заметки")
        .build();

    const document = SwaggerModule.createDocument(app, openApiConfig, {
        extraModels: [...OPENAPI_EXTRA_MODELS],
    });
    SwaggerModule.setup(SWAGGER_PATH, app, document, {
        useGlobalPrefix: true,
        jsonDocumentUrl: "swagger/openapi.json",
        yamlDocumentUrl: "swagger/openapi.yaml",
        customSiteTitle: "MVP API — Swagger UI",
        explorer: true,
    });

    const { PORT } = parseAppEnv(process.env);
    await app.listen(PORT);
}

void bootstrap();
