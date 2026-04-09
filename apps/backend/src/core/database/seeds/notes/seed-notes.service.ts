import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NoteOrmEntity } from "../../../../modules/notes/infrastructure/persistence/note.orm-entity.js";
import { UserNoteOrmEntity } from "../../../../modules/user-notes/infrastructure/persistence/user-note.orm-entity.js";
import { UserOrmEntity } from "../../../../modules/users/infrastructure/persistence/user.orm-entity.js";
import { seedConstants } from "../constants/seed.constants.js";

@Injectable()
export class SeedNotesService {
    public constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepository: Repository<UserOrmEntity>,
        @InjectRepository(NoteOrmEntity)
        private readonly noteRepository: Repository<NoteOrmEntity>,
        @InjectRepository(UserNoteOrmEntity)
        private readonly userNoteRepository: Repository<UserNoteOrmEntity>,
    ) {}

    public async runUserNotes(): Promise<void> {
        for (let index = 1; index <= seedConstants.USER_COUNT; index += 1) {
            const email: string = `${seedConstants.EMAIL_PREFIX}${String(index)}${seedConstants.EMAIL_DOMAIN}`;

            const user: UserOrmEntity | null = await this.userRepository.findOne({
                where: { email },
            });

            if (user === null) {
                continue;
            }

            const existingCount: number = await this.userNoteRepository.count({
                where: { userId: user.id },
            });

            for (
                let noteIndex = existingCount;
                noteIndex < seedConstants.NOTES_PER_USER;
                noteIndex += 1
            ) {
                const note: NoteOrmEntity = await this.noteRepository.save(
                    this.noteRepository.create({
                        title: `Заметка ${String(noteIndex + 1)} — пользователь ${String(index)}`,
                        content: `Содержимое заметки ${String(noteIndex + 1)} для ${email}.`,
                    }),
                );

                await this.userNoteRepository.save(
                    this.userNoteRepository.create({
                        userId: user.id,
                        noteId: note.id,
                    }),
                );
            }
        }
    }
}
