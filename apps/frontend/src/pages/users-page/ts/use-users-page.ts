import { isApiResponseSuccess, type UserDto } from "@mvp/shared";
import type { SubmitEvent } from "react";
import { useCallback, useEffect, useState } from "react";

import { formatThrownError } from "../../../utils/format-thrown-error.js";
import { formatApiFailure } from "./format-api-failure.js";
import { usersPageApi } from "./users-api-instance.js";

export function useUsersPage(): Readonly<{
    users: readonly UserDto[] | null;
    listHint: string;
    listLoading: boolean;
    createStatus: string;
    getByIdInput: string;
    getByIdText: string;
    editingUser: UserDto | null;
    editStatus: string;
    actionMessage: string;
    refreshUsers: () => Promise<void>;
    handleCreateUserSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
    handleGetByIdSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
    handleEditSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
    handleDeleteUser: (user: UserDto) => Promise<void>;
    executeStartEditUser: (user: UserDto) => void;
    executeCloseEditModal: () => void;
    setGetByIdInput: (value: string) => void;
}> {
    const [users, setUsers] = useState<readonly UserDto[] | null>(null);
    const [listHint, setListHint] = useState<string>("");
    const [listLoading, setListLoading] = useState<boolean>(false);
    const [createStatus, setCreateStatus] = useState<string>("");
    const [getByIdInput, setGetByIdInput] = useState<string>("");
    const [getByIdText, setGetByIdText] = useState<string>("");
    const [editingUser, setEditingUser] = useState<UserDto | null>(null);
    const [editStatus, setEditStatus] = useState<string>("");
    const [actionMessage, setActionMessage] = useState<string>("");

    const executeCloseEditModal = useCallback((): void => {
        setEditingUser(null);
        setEditStatus("");
    }, []);

    const refreshUsers = useCallback(async (): Promise<void> => {
        setListLoading(true);
        setListHint("");

        try {
            const data = await usersPageApi.listUsers();

            if (!isApiResponseSuccess(data)) {
                setUsers(null);
                setListHint(`Ошибка: ${formatApiFailure(data)}`);
                return;
            }

            setUsers(data.data);
            setListHint(data.data.length === 0 ? "Пока нет пользователей." : "");
        } catch (err: unknown) {
            setUsers(null);
            setListHint(`Ошибка: ${formatThrownError(err)}`);
        } finally {
            setListLoading(false);
        }
    }, []);

    useEffect(() => {
        void refreshUsers();
    }, [refreshUsers]);

    const handleCreateUserSubmit = useCallback(
        async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault();
            const form = event.currentTarget;
            const emailInput = form.elements.namedItem("email") as HTMLInputElement;
            const nameInput = form.elements.namedItem("displayName") as HTMLInputElement;

            setCreateStatus("Отправка…");

            try {
                const response = await usersPageApi.createUser({
                    email: emailInput.value,
                    displayName: nameInput.value,
                });

                if (!isApiResponseSuccess(response)) {
                    setCreateStatus(`Ошибка: ${formatApiFailure(response)}`);
                    return;
                }

                setCreateStatus("Создано.");
                form.reset();
                await refreshUsers();
            } catch (err: unknown) {
                setCreateStatus(`Ошибка: ${formatThrownError(err)}`);
            }
        },
        [refreshUsers],
    );

    const handleGetByIdSubmit = useCallback(
        async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault();
            const trimmed: string = getByIdInput.trim();

            if (trimmed.length === 0) {
                setGetByIdText("Введите UUID.");
                return;
            }

            setGetByIdText("Загрузка…");

            try {
                const response = await usersPageApi.getUserById(trimmed);

                if (!isApiResponseSuccess(response)) {
                    setGetByIdText(`Ошибка в конверте: ${formatApiFailure(response)}`);
                    return;
                }

                const u: UserDto = response.data;
                setGetByIdText(
                    [
                        `id: ${u.id}`,
                        `email: ${u.email}`,
                        `displayName: ${u.displayName}`,
                        `createdAt: ${u.createdAt}`,
                    ].join("\n"),
                );
            } catch (err: unknown) {
                setGetByIdText(`Ошибка: ${formatThrownError(err)}`);
            }
        },
        [getByIdInput],
    );

    const handleEditSubmit = useCallback(
        async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault();

            const current = editingUser;
            if (current === null) {
                return;
            }

            const form = event.currentTarget;
            const emailInput = form.elements.namedItem("editEmail") as HTMLInputElement;
            const nameInput = form.elements.namedItem("editDisplayName") as HTMLInputElement;

            setEditStatus("Сохранение…");

            try {
                const response = await usersPageApi.updateUser(current.id, {
                    email: emailInput.value,
                    displayName: nameInput.value,
                });

                if (!isApiResponseSuccess(response)) {
                    setEditStatus(`Ошибка: ${formatApiFailure(response)}`);
                    return;
                }

                setEditStatus("Сохранено.");
                executeCloseEditModal();
                await refreshUsers();
            } catch (err: unknown) {
                setEditStatus(`Ошибка: ${formatThrownError(err)}`);
            }
        },
        [editingUser, executeCloseEditModal, refreshUsers],
    );

    const handleDeleteUser = useCallback(
        async (user: UserDto): Promise<void> => {
            const confirmed: boolean = window.confirm(
                `Удалить пользователя «${user.displayName}» (${user.email})?`,
            );

            if (!confirmed) {
                return;
            }

            setActionMessage("Удаление…");

            try {
                const response = await usersPageApi.deleteUser(user.id);

                if (!isApiResponseSuccess(response)) {
                    setActionMessage(`Ошибка: ${formatApiFailure(response)}`);
                    return;
                }

                setActionMessage("Пользователь удалён.");

                if (editingUser?.id === user.id) {
                    executeCloseEditModal();
                }

                await refreshUsers();
            } catch (err: unknown) {
                setActionMessage(`Ошибка: ${formatThrownError(err)}`);
            }
        },
        [editingUser, executeCloseEditModal, refreshUsers],
    );

    const executeStartEditUser = useCallback((user: UserDto): void => {
        setEditingUser(user);
        setEditStatus("");
    }, []);

    return {
        users,
        listHint,
        listLoading,
        createStatus,
        getByIdInput,
        getByIdText,
        editingUser,
        editStatus,
        actionMessage,
        refreshUsers,
        handleCreateUserSubmit,
        handleGetByIdSubmit,
        handleEditSubmit,
        handleDeleteUser,
        executeStartEditUser,
        executeCloseEditModal,
        setGetByIdInput,
    };
}
