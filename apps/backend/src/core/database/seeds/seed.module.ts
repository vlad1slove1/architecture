import { Module } from "@nestjs/common";
import { SeedNotesModule } from "./notes/seed-notes.module.js";
import { SeedService } from "./seed.service.js";
import { SeedUserModule } from "./user/seed-user.module.js";

@Module({
    imports: [SeedUserModule, SeedNotesModule],
    providers: [SeedService],
})
export class SeedModule {}
