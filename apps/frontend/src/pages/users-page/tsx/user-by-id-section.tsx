import type { ReactElement, SubmitEvent } from "react";

type UserByIdSectionProps = {
    readonly userIdInput: string;
    readonly resultText: string;
    readonly onUserIdInputChange: (value: string) => void;
    readonly onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function UserByIdSection(props: UserByIdSectionProps): ReactElement {
    const { userIdInput, resultText, onUserIdInputChange, onSubmit } = props;

    return (
        <section>
            <h2>Пользователь по id</h2>
            <p className="section-hint">
                GET <code>/api/users/:id</code>
            </p>
            <form onSubmit={(event) => void onSubmit(event)}>
                <label>
                    UUID
                    <input
                        name="userId"
                        type="text"
                        value={userIdInput}
                        onChange={(event) => onUserIdInputChange(event.target.value)}
                        placeholder="550e8400-e29b-41d4-a716-446655440000"
                        autoComplete="off"
                    />
                </label>
                <button type="submit">Загрузить</button>
            </form>
            {resultText.length > 0 ? <pre>{resultText}</pre> : null}
        </section>
    );
}
