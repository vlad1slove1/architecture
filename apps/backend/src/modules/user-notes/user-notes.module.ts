import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserNoteOrmEntity } from "./infrastructure/persistence/user-note.orm-entity.js";
import { UserNotesTypeormRepository } from "./infrastructure/persistence/user-notes.typeorm-repository.js";

@Module({
    imports: [TypeOrmModule.forFeature([UserNoteOrmEntity])],
    providers: [UserNotesTypeormRepository],
    exports: [UserNotesTypeormRepository, TypeOrmModule],
})
export class UserNotesModule {}
