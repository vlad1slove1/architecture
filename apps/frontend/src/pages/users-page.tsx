import { isApiResponseSuccess, type ApiResponse, type UserDto } from "@mvp/shared";
import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";

import { createUsersApi } from "../api/index.js";
import { getApiBaseUrl } from "../config/api-base-url.js";
import { formatThrownError } from "../utils/format-thrown-error.js";

function buildUsersListText(data: ApiResponse<readonly UserDto[]>): string {
    if (!isApiResponseSuccess(data)) {
        return `Ошибка: ${data.error} (${data.code})`;
    }

    if (data.data.length === 0) {
        return "Пока нет пользователей.";
    }

    return data.data
        .map((u) => `• ${u.displayName} <${u.email}> — id ${u.id.slice(0, 8)}…`)
        .join("\n");
}

const usersApi = createUsersApi({ baseUrl: getApiBaseUrl() });

export function UsersPage(): ReactElement {
    const [usersText, setUsersText] = useState<string>("—");
    const [formStatus, setFormStatus] = useState<string>("");

    const refreshUsers = useCallback(async (): Promise<void> => {
        setUsersText("Загрузка…");

        try {
            const data = await usersApi.listUsers();
            setUsersText(buildUsersListText(data));
        } catch (err: unknown) {
            setUsersText(`Ошибка: ${formatThrownError(err)}`);
        }
    }, []);

    useEffect(() => {
        void refreshUsers();
    }, [refreshUsers]);

    async function handleCreateUserSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const form = event.currentTarget;
        const emailInput = form.elements.namedItem("email") as HTMLInputElement;
        const nameInput = form.elements.namedItem("displayName") as HTMLInputElement;

        setFormStatus("Отправка…");

        try {
            await usersApi.createUser({
                email: emailInput.value,
                displayName: nameInput.value,
            });
            setFormStatus("Создано.");
            form.reset();
            await refreshUsers();
        } catch (err: unknown) {
            setFormStatus(`Ошибка: ${formatThrownError(err)}`);
        }
    }

    return (
        <>
            <section>
                <h2>Пользователи</h2>
                <button type="button" onClick={() => void refreshUsers()}>
                    Обновить список
                </button>
                <pre>{usersText}</pre>
            </section>

            <section>
                <h2>Создать пользователя</h2>
                <form onSubmit={(e) => void handleCreateUserSubmit(e)}>
                    <label>
                        Email
                        <input name="email" type="email" required autoComplete="email" />
                    </label>
                    <label>
                        Имя
                        <input name="displayName" type="text" required autoComplete="name" />
                    </label>
                    <button type="submit">POST /api/users</button>
                </form>
                <p>{formStatus}</p>
            </section>
        </>
    );
}
