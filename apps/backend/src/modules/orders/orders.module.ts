import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./domain/services/orders.service";
import { OrdersController } from "./infrastructure/controllers/orders.controller";
import { OrdersEntity } from "./infrastructure/entities/orders.entity";
import { TypeormOrdersRepository } from "./infrastructure/repositories/typeorm.orders.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrdersEntity])],
    controllers: [OrdersController],
    providers: [TypeormOrdersRepository, OrdersService],
})
export class OrdersModule {}
