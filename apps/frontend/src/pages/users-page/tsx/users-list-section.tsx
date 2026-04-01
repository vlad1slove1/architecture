import type { UserDto } from "@mvp/shared";
import type { ReactElement } from "react";

type UsersListSectionProps = {
    readonly users: readonly UserDto[] | null;
    readonly listHint: string;
    readonly listLoading: boolean;
    readonly actionMessage: string;
    readonly onRefresh: () => void;
    readonly onEditUser: (user: UserDto) => void;
    readonly onDeleteUser: (user: UserDto) => void;
};

export function UsersListSection(props: UsersListSectionProps): ReactElement {
    const { users, listHint, listLoading, actionMessage, onRefresh, onEditUser, onDeleteUser } =
        props;

    return (
        <section>
            <h2>Пользователи</h2>
            <button type="button" disabled={listLoading} onClick={() => void onRefresh()}>
                {listLoading ? "Загрузка…" : "Обновить список"}
            </button>
            {listHint.length > 0 && users === null ? <pre>{listHint}</pre> : null}
            {listHint.length > 0 && users !== null && users.length === 0 ? <p>{listHint}</p> : null}
            {users !== null && users.length > 0 ? (
                <div className="users-table-wrap">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: UserDto) => (
                                <tr key={user.id}>
                                    <td>
                                        <code>{user.id}</code>
                                    </td>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td className="actions">
                                        <button
                                            type="button"
                                            className="button-inline"
                                            onClick={() => {
                                                onEditUser(user);
                                            }}
                                        >
                                            Изменить
                                        </button>
                                        <button
                                            type="button"
                                            className="button-inline button-danger"
                                            onClick={() => void onDeleteUser(user)}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
            {actionMessage.length > 0 ? <p>{actionMessage}</p> : null}
        </section>
    );
}
