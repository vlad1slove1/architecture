# Монорепозиторий: React + NestJS + общие контракты

Корневой пакет `architecture-mvp` (npm workspaces): **`@mvp/shared`** — типы и маршруты API, **`@mvp/backend`** (NestJS) и **`@mvp/frontend`** (React 19 + Vite + React Router).

## Структура

```
packages/shared/              # @mvp/shared — контракты API (сборка tsc → dist, CommonJS)
  src/
    contracts/
      api-routes.ts           # префикс и пути
      health.contract.ts
      user.contract.ts
      index.ts

apps/backend/                 # NestJS: глобальный префикс /api, CORS, ValidationPipe
  src/
    main.ts
    modules/
      app.module.ts
      health/                 # HealthModule, HealthController, HealthService
      users/                  # controller → service → repository
        dto/create-user.dto.ts
        types/user.types.ts
        user.mapper.ts

apps/frontend/                # React 19 + Vite + react-router-dom
  src/
    App.tsx                   # маршруты: /, /users
    app-layout.tsx
    main.tsx
    pages/
      home-page.tsx
      users-page.tsx
    api/                      # fetch-json, health.api, users.api
    config/api-base-url.ts
  vite.config.ts              # алиас @mvp/shared → packages/shared/src (исходники)
```

## Скрипты (из корня репозитория)

Установка и полная сборка:

```bash
npm install
npm run build
```

Запуск всего стека в разработке (сборка shared, затем watch shared + backend + frontend):

```bash
npm run dev
```

Только бэкенд или только фронт (shared собирается/смотрится отдельно):

```bash
npm run dev:backend
npm run dev:frontend
```

Продакшен-старт Nest после сборки:

```bash
npm run start:backend
# эквивалент: npm run start -w @mvp/backend
```

Линтинг и форматирование:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

Фронт отдельно (если бэкенд уже запущен и shared собран):

```bash
npm run dev -w @mvp/frontend
# превью прод-сборки: npm run build -w @mvp/frontend && npm run preview -w @mvp/frontend
```

## Локальная разработка

Откройте `http://localhost:5173`. Запросы к API по умолчанию идут на `http://localhost:3000` (переопределение через переменную окружения **`VITE_API_BASE_URL`**; см. `apps/frontend/src/config/api-base-url.ts`). Порт бэкенда задаётся **`PORT`** (по умолчанию `3000`).

## Зависимости и контракты

- **`@mvp/shared`** собирается в **CommonJS**, чтобы Nest подключал пакет через `require`, а фронт при разработке мог резолвить тот же API через алиас Vite на исходники `src`.
- **class-validator** / **class-transformer** — валидация тела `POST /api/users` на бэкенде.
