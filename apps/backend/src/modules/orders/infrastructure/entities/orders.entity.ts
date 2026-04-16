import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { OrdersStatus } from "../../domain/enums/orders-status.enum";

@Entity({ name: "orders" })
export class OrdersEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "name", type: "varchar" })
    name!: string;

    @Column({ name: "description", type: "text", nullable: true })
    description?: string | undefined;

    @Column({ name: "price", type: "int", default: 0 })
    price!: number;

    @Column({ name: "status", type: "varchar", default: OrdersStatus.Pending })
    status!: OrdersStatus;

    /** служебное поле - когда создано в бд */
    @CreateDateColumn({ name: "created_at", type: "timestamp without time zone" })
    createdAt!: Date;

    /** служебное поле - когда последний раз было обновлено в бд */
    @UpdateDateColumn({ name: "updated_at", type: "timestamp without time zone" })
    updatedAt!: Date;
}
