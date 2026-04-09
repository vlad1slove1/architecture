import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotesModule } from "../notes/notes.module.js";
import { UserOrmEntity } from "./infrastructure/persistence/user.orm-entity.js";
import { UsersTypeormRepository } from "./infrastructure/persistence/users.typeorm-repository.js";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";

@Module({
    imports: [TypeOrmModule.forFeature([UserOrmEntity]), NotesModule],
    controllers: [UsersController],
    providers: [UsersService, UsersTypeormRepository],
})
export class UsersModule {}
