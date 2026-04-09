import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "notes" })
export class NoteOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ type: "varchar" })
    public title!: string;

    @Column({ type: "text" })
    public content!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    public createdAt!: Date;
}
