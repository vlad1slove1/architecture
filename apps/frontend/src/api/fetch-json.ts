async function parseJsonResponse<TResponse>(response: Response): Promise<TResponse> {
    const text: string = await response.text();
    if (!response.ok) {
        let message: string = `${response.status} ${response.statusText}`;

        try {
            const errBody: unknown = JSON.parse(text) as unknown;

            if (
                errBody !== null &&
                typeof errBody === "object" &&
                "message" in errBody &&
                Array.isArray((errBody as { message: unknown }).message)
            ) {
                const parts: unknown[] = (errBody as { message: unknown[] }).message;
                message = parts.map(String).join("; ");
            } else if (
                errBody !== null &&
                typeof errBody === "object" &&
                "error" in errBody &&
                typeof (errBody as { error: unknown }).error === "string"
            ) {
                message = (errBody as { error: string }).error;
            }
        } catch {
            // оставляем message по статусу
        }

        throw new Error(message);
    }

    if (text.trim().length === 0) {
        return undefined as TResponse;
    }

    return JSON.parse(text) as TResponse;
}

export async function getJson<TResponse>(baseUrl: string, path: string): Promise<TResponse> {
    const response: Response = await fetch(`${baseUrl}${path}`);
    return parseJsonResponse<TResponse>(response);
}

export async function postJson<TBody, TResponse>(
    baseUrl: string,
    path: string,
    body: TBody,
): Promise<TResponse> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return parseJsonResponse<TResponse>(response);
}

export async function patchJson<TBody, TResponse>(
    baseUrl: string,
    path: string,
    body: TBody,
): Promise<TResponse> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return parseJsonResponse<TResponse>(response);
}

export async function deleteJson<TResponse>(baseUrl: string, path: string): Promise<TResponse> {
    const response: Response = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
    });
    return parseJsonResponse<TResponse>(response);
}
