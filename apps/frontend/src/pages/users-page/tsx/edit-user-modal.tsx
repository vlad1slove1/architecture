import type { UserDto } from "@mvp/shared";
import type { MouseEvent, ReactElement, SubmitEvent } from "react";
import { useEffect, useRef } from "react";

type EditUserModalProps = {
    readonly user: UserDto | null;
    readonly statusText: string;
    readonly onRequestClose: () => void;
    readonly onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function EditUserModal(props: EditUserModalProps): ReactElement | null {
    const { user, statusText, onRequestClose, onSubmit } = props;
    const firstFieldRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (user === null) {
            return;
        }

        const previousOverflow: string = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                onRequestClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        firstFieldRef.current?.focus();

        return (): void => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [user, onRequestClose]);

    if (user === null) {
        return null;
    }

    return (
        <div
            className="modal-backdrop"
            role="presentation"
            onClick={(event: MouseEvent<HTMLDivElement>): void => {
                if (event.target === event.currentTarget) {
                    onRequestClose();
                }
            }}
        >
            <div
                className="modal-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-user-dialog-title"
            >
                <h2 id="edit-user-dialog-title">Редактировать пользователя</h2>
                <p className="section-hint">
                    PATCH <code>/api/users/{user.id.slice(0, 8)}…</code>
                </p>
                <form key={user.id} onSubmit={(event) => void onSubmit(event)}>
                    <label>
                        Email
                        <input
                            ref={firstFieldRef}
                            name="editEmail"
                            type="email"
                            required
                            autoComplete="email"
                            defaultValue={user.email}
                        />
                    </label>
                    <label>
                        Имя
                        <input
                            name="editDisplayName"
                            type="text"
                            required
                            autoComplete="name"
                            defaultValue={user.displayName}
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={onRequestClose}>
                            Отмена
                        </button>
                    </div>
                </form>
                {statusText.length > 0 ? <p>{statusText}</p> : null}
            </div>
        </div>
    );
}
