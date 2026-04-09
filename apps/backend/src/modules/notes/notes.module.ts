import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserNotesModule } from "../user-notes/user-notes.module.js";
import { NoteOrmEntity } from "./infrastructure/persistence/note.orm-entity.js";
import { NotesTypeormRepository } from "./infrastructure/persistence/notes.typeorm-repository.js";
import { NotesController } from "./notes.controller.js";
import { NotesService } from "./notes.service.js";

@Module({
    imports: [TypeOrmModule.forFeature([NoteOrmEntity]), UserNotesModule],
    controllers: [NotesController],
    providers: [NotesService, NotesTypeormRepository],
    exports: [NotesService],
})
export class NotesModule {}
