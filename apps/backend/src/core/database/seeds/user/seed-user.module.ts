import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrmEntity } from "../../../../modules/users/infrastructure/persistence/user.orm-entity.js";
import { SeedDatabaseModule } from "../database/seed-database.module.js";
import { SeedUserService } from "./seed-user.service.js";

@Module({
    imports: [SeedDatabaseModule, TypeOrmModule.forFeature([UserOrmEntity])],
    providers: [SeedUserService],
    exports: [SeedUserService],
})
export class SeedUserModule {}
