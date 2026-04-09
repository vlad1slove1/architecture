import { Injectable } from "@nestjs/common";
import { SeedNotesService } from "./notes/seed-notes.service.js";
import { SeedUserService } from "./user/seed-user.service.js";

@Injectable()
export class SeedService {
    public constructor(
        private readonly seedUserService: SeedUserService,
        private readonly seedNotesService: SeedNotesService,
    ) {}

    public async run(): Promise<void> {
        await this.seedUserService.runUsers();
        await this.seedNotesService.runUserNotes();
    }
}
