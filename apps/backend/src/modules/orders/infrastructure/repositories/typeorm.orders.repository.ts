import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrdersEntity } from "../entities/orders.entity";

@Injectable()
export class TypeormOrdersRepository {
    constructor(
        @InjectRepository(OrdersEntity)
        private readonly repo: Repository<OrdersEntity>,
    ) {}

    async create(createDto: Partial<OrdersEntity>): Promise<OrdersEntity> {
        return this.repo.save(createDto);
    }

    async findAll(): Promise<{ orders: OrdersEntity[]; total: number }> {
        const [orders, total] = await this.repo.findAndCount();
        return { orders, total };
    }

    async findOneById(id: string): Promise<OrdersEntity | null> {
        return this.repo.findOne({ where: { id } });
    }

    async update(id: string, updateDto: Partial<OrdersEntity>): Promise<OrdersEntity | null> {
        await this.repo.update(id, updateDto);
        return this.repo.findOne({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
