import type { ApiFailureBody } from "@mvp/shared";

export function formatApiFailure(failure: ApiFailureBody): string {
    return `${failure.error} (${failure.code})`;
}
