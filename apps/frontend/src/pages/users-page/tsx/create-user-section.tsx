import type { ReactElement, SubmitEvent } from "react";

type CreateUserSectionProps = {
    readonly statusText: string;
    readonly onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function CreateUserSection(props: CreateUserSectionProps): ReactElement {
    const { statusText, onSubmit } = props;

    return (
        <section>
            <h2>Создать пользователя</h2>
            <p className="section-hint">
                POST <code>/api/users</code>
            </p>
            <form onSubmit={(event) => void onSubmit(event)}>
                <label>
                    Email
                    <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                    Имя
                    <input name="displayName" type="text" required autoComplete="name" />
                </label>
                <button type="submit">Создать</button>
            </form>
            {statusText.length > 0 ? <p>{statusText}</p> : null}
        </section>
    );
}
