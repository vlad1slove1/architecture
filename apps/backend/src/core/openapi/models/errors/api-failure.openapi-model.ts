import { ApiProperty } from "@nestjs/swagger";

/** Неуспешный ответ в общем конверте API (см. `ApiFailureBody` в `@mvp/shared`). */
export class ApiFailureOpenApiModel {
    @ApiProperty({ example: false })
    public success!: false;

    @ApiProperty({ example: "Заметка не найдена", description: "Сообщение для человека" })
    public error!: string;

    @ApiProperty({ example: "NOTE_NOT_FOUND", description: "Стабильный код ошибки для клиента" })
    public code!: string;
}
