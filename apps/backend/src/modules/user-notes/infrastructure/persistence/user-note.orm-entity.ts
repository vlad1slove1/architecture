import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { NoteOrmEntity } from "../../../notes/infrastructure/persistence/note.orm-entity.js";
import { UserOrmEntity } from "../../../users/infrastructure/persistence/user.orm-entity.js";

@Entity({ name: "user_notes" })
@Unique(["noteId"])
export class UserNoteOrmEntity {
    @PrimaryColumn({ name: "user_id", type: "uuid" })
    public userId!: string;

    @PrimaryColumn({ name: "note_id", type: "uuid" })
    public noteId!: string;

    @ManyToOne(() => UserOrmEntity, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "user_id" })
    public user!: UserOrmEntity;

    @ManyToOne(() => NoteOrmEntity, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "note_id" })
    public note!: NoteOrmEntity;
}
