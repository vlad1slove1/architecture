#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${ROOT_DIR}/apps/backend/.env"

if [[ -f "${ENV_FILE}" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "${ENV_FILE}"
    set +a
fi

POSTGRES_USER="${POSTGRES_USER:-mvp}"
POSTGRES_DB="${POSTGRES_DB:-mvp}"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.yml"

compose_exec_psql() {
    docker compose -f "${COMPOSE_FILE}" exec -T db psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" "$@"
}

case "${1:-}" in
drop)
    compose_exec_psql -d postgres -c "DROP DATABASE IF EXISTS \"${POSTGRES_DB}\" WITH (FORCE);"
    ;;
create)
    compose_exec_psql -d postgres -c "CREATE DATABASE \"${POSTGRES_DB}\";"
    ;;
*)
    echo "Usage: $0 {drop|create}" >&2
    exit 1
    ;;
esac
