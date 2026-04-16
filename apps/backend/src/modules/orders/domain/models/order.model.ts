import { ApiProperty } from "@nestjs/swagger";
import { OrdersStatus } from "../enums/orders-status.enum";

export class OrderModel {
    @ApiProperty({ description: "уникальный id (uuid v4)", type: String })
    private readonly id: string;

    @ApiProperty({ description: "название заказа", type: String })
    private name: string;

    @ApiProperty({ description: "описание заказа", type: String, nullable: true })
    private description: string | null;

    @ApiProperty({ description: "цена по заказу", type: Number })
    private price: number;

    @ApiProperty({ description: "статус заказа", enum: OrdersStatus })
    private status: OrdersStatus;

    @ApiProperty({ description: "когда был создан заказ", type: Date })
    private readonly createdAt!: Date;

    @ApiProperty({ description: "когда был обновлен заказ", type: Date })
    private readonly updatedAt!: Date;

    constructor(options: {
        id: string;
        name: string;
        description: string | null;
        price: number;
        status: OrdersStatus;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.price = options.price;
        this.status = options.status;
        this.createdAt = options.createdAt;
        this.updatedAt = options.updatedAt;
    }

    /** геттеры - получаем поля из класса */
    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string | null {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }

    getStatus(): OrdersStatus {
        return this.status;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    /** сететры - обновляем поля класса */

    setName(value: string): void {
        this.name = value;
    }

    setDescription(value: string | null): void {
        this.description = value;
    }

    setPrice(value: number): void {
        this.price = value;
    }

    setStatus(value: OrdersStatus): void {
        this.status = value;
    }
}
