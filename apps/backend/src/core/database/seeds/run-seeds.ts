import { NestFactory } from "@nestjs/core";
import "../../../load-env.js";
import { SeedModule } from "./seed.module.js";
import { SeedService } from "./seed.service.js";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createApplicationContext(SeedModule, {
        logger: ["log", "error", "warn"],
    });

    const seedService: SeedService = app.get(SeedService);
    await seedService.run();

    await app.close();
}

void bootstrap().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});
