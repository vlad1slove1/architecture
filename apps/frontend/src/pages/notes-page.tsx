import { isApiResponseSuccess, type ApiResponse, type NoteDto } from "@mvp/shared";
import type { FormEvent, ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";

import { createNotesApi } from "../api/index.js";
import { getApiBaseUrl } from "../config/api-base-url.js";
import { formatThrownError } from "../utils/format-thrown-error.js";

function buildNotesListText(data: ApiResponse<readonly NoteDto[]>): string {
    if (!isApiResponseSuccess(data)) {
        return `Ошибка: ${data.error} (${data.code})`;
    }

    if (data.data.length === 0) {
        return "Пока нет заметок.";
    }

    return data.data
        .map((n) => `• ${n.title} — ${n.content}`)
        .join("\n");
}

const notesApi = createNotesApi({ baseUrl: getApiBaseUrl() });

export function NotesPage(): ReactElement {
    const [notesText, setNotesText] = useState<string>("—");
    const [formStatus, setFormStatus] = useState<string>("");

    const refreshNotes = useCallback(async (): Promise<void> => {
        setNotesText("Загрузка…");

        try {
            const data = await notesApi.listNotes();
            setNotesText(buildNotesListText(data));
        } catch (err: unknown) {
            setNotesText(`Ошибка: ${formatThrownError(err)}`);
        }
    }, []);

    useEffect(() => {
        void refreshNotes();
    }, [refreshNotes]);

    async function handleCreateNoteSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const form = event.currentTarget;
        const titleInput = form.elements.namedItem("title") as HTMLInputElement;
        const contentInput = form.elements.namedItem("content") as HTMLInputElement;

        setFormStatus("Отправка…");

        try {
            await notesApi.createNote({
                title: titleInput.value,
                content: contentInput.value,
            });
            setFormStatus("Создано.");
            form.reset();
            await refreshNotes();
        } catch (err: unknown) {
            setFormStatus(`Ошибка: ${formatThrownError(err)}`);
        }
    }

    return (
        <>
            <section>
                <h2>Заметки</h2>
                <button type="button" onClick={() => void refreshNotes()}>
                    Обновить список
                </button>
                <pre>{notesText}</pre>
            </section>

            <section>
                <h2>Создать заметку</h2>
                <form onSubmit={(e) => void handleCreateNoteSubmit(e)}>
                    <label>
                        Заголовок
                        <input name="title" type="text" required />
                    </label>
                    <label>
                        Содержание
                        <input name="content" type="text" required />
                    </label>
                    <button type="submit">POST /api/notes</button>
                </form>
                <p>{formStatus}</p>
            </section>
        </>
    );
}
