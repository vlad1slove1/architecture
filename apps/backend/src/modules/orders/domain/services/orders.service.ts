import { ApiResponse } from "@mvp/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersEntity } from "../../infrastructure/entities/orders.entity";
import { TypeormOrdersRepository } from "../../infrastructure/repositories/typeorm.orders.repository";
import { CreateOrderDto, UpdateOrderDto } from "../dto";
import { OrdersMapper } from "../mappers/orders.mapper";
import { OrderModel } from "../models/order.model";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: TypeormOrdersRepository) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<ApiResponse<OrderModel>> {
        const created: OrdersEntity = await this.ordersRepository.create(
            createOrderDto as Partial<OrdersEntity>,
        );
        return { success: true, data: OrdersMapper.toDomain(created) };
    }

    async updateOrder(
        id: string,
        updateOrderDto: UpdateOrderDto,
    ): Promise<ApiResponse<OrderModel>> {
        const entity: OrdersEntity | null = await this.ordersRepository.findOneById(id);
        if (!entity) {
            throw new NotFoundException("Order not found");
        }

        const order: OrderModel = OrdersMapper.toDomain(entity);

        if ("name" in updateOrderDto && updateOrderDto.name !== undefined) {
            order.setName(updateOrderDto.name);
        }

        if ("description" in updateOrderDto && updateOrderDto.description !== undefined) {
            order.setDescription(updateOrderDto.description);
        }

        const updated: OrdersEntity | null = await this.ordersRepository.update(
            id,
            OrdersMapper.toEntity(order),
        );
        if (!updated) {
            throw new NotFoundException("Order not found");
        }

        return { success: true, data: OrdersMapper.toDomain(updated) };
    }

    async findAll(): Promise<ApiResponse<OrderModel[]>> {
        const { orders } = await this.ordersRepository.findAll();
        const data: OrderModel[] = orders.map(OrdersMapper.toDomain);
        return { success: true, data };
    }

    async findOneById(id: string): Promise<ApiResponse<OrderModel | null>> {
        const entity: OrdersEntity | null = await this.ordersRepository.findOneById(id);
        if (!entity) {
            return { success: true, data: null };
        }

        return { success: true, data: OrdersMapper.toDomain(entity) };
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        const entity: OrdersEntity | null = await this.ordersRepository.findOneById(id);
        if (!entity) {
            throw new NotFoundException("Order not found");
        }

        await this.ordersRepository.delete(id);
        return { success: true, data: null };
    }
}
