import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteOrmEntity } from "../../../../modules/notes/infrastructure/persistence/note.orm-entity.js";
import { UserNoteOrmEntity } from "../../../../modules/user-notes/infrastructure/persistence/user-note.orm-entity.js";
import { UserOrmEntity } from "../../../../modules/users/infrastructure/persistence/user.orm-entity.js";
import { EnvConfigModule } from "../../../config/env-config.module.js";
import { EnvConfigService } from "../../../config/env-config.service.js";

@Module({
    imports: [
        EnvConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [EnvConfigModule],
            inject: [EnvConfigService],
            useFactory: (env: EnvConfigService) => ({
                type: "postgres" as const,
                url: env.databaseUrl,
                entities: [UserOrmEntity, NoteOrmEntity, UserNoteOrmEntity],
                synchronize: false,
            }),
        }),
    ],
})
export class SeedDatabaseModule {}
