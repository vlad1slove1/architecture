import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserOrmEntity } from "../../../users/infrastructure/persistence/user.orm-entity.js";

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

    @Column({ name: "user_id", type: "uuid", nullable: true })
    public userId!: string | null;

    @ManyToOne(() => UserOrmEntity, (user: UserOrmEntity) => user.notes, {
        onDelete: "CASCADE",
        nullable: true,
    })
    @JoinColumn({ name: "user_id" })
    public user!: UserOrmEntity | null;
}
