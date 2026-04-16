import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, Min, MinLength, ValidateIf } from "class-validator";
import { OrdersStatus } from "../enums/orders-status.enum";

export class CreateOrderDto {
    @IsString()
    @MinLength(5)
    @ApiProperty({ description: "название заказа", type: String })
    readonly name!: string;

    @ValidateIf((_, value: unknown) => value != null)
    @IsString()
    @ApiProperty({ description: "описание заказа", type: String, nullable: true })
    readonly description!: string | null;

    @IsNumber()
    @Min(1)
    @ApiProperty({ description: "цена заказа", type: Number, nullable: true })
    readonly price?: number;

    @IsEnum(OrdersStatus)
    @ApiProperty({ description: "статус заказа", enum: OrdersStatus, nullable: true })
    readonly status?: OrdersStatus;
}
