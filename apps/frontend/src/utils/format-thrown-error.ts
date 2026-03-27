export function formatThrownError(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
}
