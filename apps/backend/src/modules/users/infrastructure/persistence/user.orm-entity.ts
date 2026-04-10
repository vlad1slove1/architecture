import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NoteOrmEntity } from "../../../notes/infrastructure/persistence/note.orm-entity.js";

@Entity({ name: "users" })
export class UserOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "varchar", unique: true })
    public email!: string;

    @Column({ name: "display_name", type: "varchar" })
    public displayName!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    public createdAt!: Date;

    @OneToMany(() => NoteOrmEntity, (note: NoteOrmEntity) => note.user)
    public notes!: NoteOrmEntity[];
}
