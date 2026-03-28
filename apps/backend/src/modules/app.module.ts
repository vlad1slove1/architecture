import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { UsersModule } from "./users/users.module";
import { NotesModule } from "./notes/notes.module";

@Module({
    imports: [HealthModule, UsersModule, NotesModule],
})
export class AppModule {}
