import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";

import { createHealthApi } from "../api/index.js";
import { getApiBaseUrl } from "../config/api-base-url.js";
import { formatThrownError } from "../utils/format-thrown-error.js";

const healthApi = createHealthApi({ baseUrl: getApiBaseUrl() });

export function HomePage(): ReactElement {
    const [healthText, setHealthText] = useState<string>("—");

    const refreshHealth = useCallback(async (): Promise<void> => {
        try {
            const res = await healthApi.checkHealth();
            setHealthText(`OK — ${res.timestamp}`);
        } catch (err: unknown) {
            setHealthText(`Ошибка: ${formatThrownError(err)}`);
        }
    }, []);

    useEffect(() => {
        void refreshHealth();
    }, [refreshHealth]);

    return (
        <section>
            <h2>Health</h2>
            <button type="button" onClick={() => void refreshHealth()}>
                Проверить /api/health
            </button>
            <pre>{healthText}</pre>
        </section>
    );
}
