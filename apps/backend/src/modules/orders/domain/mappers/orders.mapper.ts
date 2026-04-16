import { OrdersEntity } from "../../infrastructure/entities/orders.entity";
import { OrderModel } from "../models/order.model";

export class OrdersMapper {
    static toDomain(entity: OrdersEntity): OrderModel {
        return new OrderModel({
            id: entity.id,
            name: entity.name,
            description: entity.description ?? null,
            price: entity.price,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }

    static toEntity(model: OrderModel): OrdersEntity {
        const entity = new OrdersEntity();
        entity.id = model.getId();
        entity.name = model.getName();
        entity.description = model.getDescription() ?? undefined;
        entity.price = model.getPrice();
        entity.status = model.getStatus();
        return entity;
    }
}
