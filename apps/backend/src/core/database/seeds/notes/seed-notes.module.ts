import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteOrmEntity } from "../../../../modules/notes/infrastructure/persistence/note.orm-entity.js";
import { UserOrmEntity } from "../../../../modules/users/infrastructure/persistence/user.orm-entity.js";
import { SeedDatabaseModule } from "../database/seed-database.module.js";
import { SeedNotesService } from "./seed-notes.service.js";

@Module({
    imports: [SeedDatabaseModule, TypeOrmModule.forFeature([UserOrmEntity, NoteOrmEntity])],
    providers: [SeedNotesService],
    exports: [SeedNotesService],
})
export class SeedNotesModule {}
