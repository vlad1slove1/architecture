import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.js";
import "./index.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement === null) {
    throw new Error("Missing #root");
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
