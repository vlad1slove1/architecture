import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./app-layout.js";
import { HomePage } from "./pages/home-page.js";
import { NotesPage } from "./pages/notes-page.js";
import { UsersPage } from "./pages/users-page/users-page.js";

export function App(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/notes" element={<NotesPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
