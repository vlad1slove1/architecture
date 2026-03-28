import type { ReactElement } from "react";
import { Link, Outlet } from "react-router-dom";

export function AppLayout(): ReactElement {
    return (
        <>
            <h1>MVP: shared + React + Nest</h1>
            <p>
                Бэкенд: <code>http://localhost:3000</code> · Фронт:{" "}
                <code>http://localhost:5173</code>
            </p>

            <nav className="app-nav" aria-label="Основная навигация">
                <Link to="/">Главная</Link>
                <Link to="/users">Пользователи</Link>
                <Link to="/notes">Заметки</Link>
            </nav>

            <Outlet />
        </>
    );
}
