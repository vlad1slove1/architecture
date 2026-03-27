import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./modules/app.module.js";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors({ origin: true });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const portRaw: string | undefined = process.env.PORT;
    const port: number = portRaw !== undefined ? Number(portRaw) : 3000;
    await app.listen(port);
}

void bootstrap();
