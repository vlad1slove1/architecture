import { ApiResponse } from "@mvp/shared";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiEnvelopeErrorResponses } from "../../../../core/openapi";
import { CreateOrderDto, UpdateOrderDto } from "../../domain/dto";
import { OrderModel } from "../../domain/models/order.model";
import { OrdersService } from "../../domain/services/orders.service";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
    constructor(private readonly service: OrdersService) {}

    @Post()
    @ApiOperation({ summary: "создать новый заказ" })
    @ApiOkResponse({ type: OrderModel, description: "заказ создан" })
    @ApiEnvelopeErrorResponses()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<ApiResponse<OrderModel>> {
        return this.service.createOrder(createOrderDto);
    }

    @Patch(":id")
    @ApiOperation({ summary: "обновить заказ" })
    @ApiOkResponse({ type: OrderModel, description: "заказ обновлен" })
    @ApiEnvelopeErrorResponses()
    @HttpCode(HttpStatus.OK)
    async updateOrder(
        @Param("id") id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<ApiResponse<OrderModel>> {
        return this.service.updateOrder(id, updateOrderDto);
    }

    @Get()
    @ApiOperation({ summary: "получить все заказы" })
    @ApiOkResponse({ type: OrderModel, isArray: true, description: "заказы получены" })
    @ApiEnvelopeErrorResponses()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<ApiResponse<OrderModel[]>> {
        return this.service.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "получить заказ по ID" })
    @ApiOkResponse({ type: OrderModel, description: "заказ получен" })
    @ApiEnvelopeErrorResponses()
    @HttpCode(HttpStatus.OK)
    async findOneById(@Param("id") id: string): Promise<ApiResponse<OrderModel | null>> {
        return this.service.findOneById(id);
    }

    @Delete(":id")
    @ApiOperation({ summary: "удалить заказ по ID" })
    @ApiOkResponse({ description: "заказ удален" })
    @ApiEnvelopeErrorResponses()
    @HttpCode(HttpStatus.OK)
    async delete(@Param("id") id: string): Promise<ApiResponse<null>> {
        return this.service.delete(id);
    }
}
