# Монорепозиторий: React + NestJS + общие контракты

Корневой пакет `architecture-mvp` (npm workspaces): **`@mvp/shared`** — типы и маршруты API, **`@mvp/backend`** (NestJS + PostgreSQL + TypeORM) и **`@mvp/frontend`** (React 19 + Vite + React Router).

## Структура

```
packages/shared/              # @mvp/shared — контракты API (сборка tsc → dist, CommonJS)
  src/contracts/

apps/backend/
  src/
    core/
      config/                 # Zod-валидация .env, EnvConfigModule
      database/               # data-source, migrations/
        seeds/                # run-seeds.ts, seed.module, seed.service
          constants/          # общие константы сидов
          database/           # SeedDatabaseModule (TypeORM для CLI)
          user/               # SeedUserModule + SeedUserService
          notes/              # SeedNotesModule + SeedNotesService
    modules/
      users/                  # domain, infrastructure/persistence (TypeORM), controller, service
      notes/
    load-env.ts               # dotenv до bootstrap
    main.ts

apps/frontend/
  src/ ...
```

## База данных (Docker + скрипты)

1. Скопируйте [`apps/backend/.env.example`](apps/backend/.env.example) в **`apps/backend/.env`**. Для работы с контейнером Postgres с хоста задайте **`DB_HOST=127.0.0.1`** и совпадающие с Compose **`DB_USER` / `DB_PASSWORD` / `DB_NAME`** (и при необходимости **`POSTGRES_*`** для скриптов `db:drop` / `db:create`).
2. Поднимите Postgres: **`npm run db:up`** (из корня репозитория).
3. Миграции и сиды выполняются **на хосте** (после `npm install` в корне):
    - **`npm run db:migrate`** — сборка бэкенда и `typeorm migration:run` по **`dist/src/core/database/data-source.js`**.
    - **`npm run db:seed`** — сборка и заполнение тестовыми данными (идемпотентно).
4. **`npm run db:reset`** — `DROP DATABASE` / `CREATE DATABASE` через `docker compose exec … psql`, затем снова миграции (сиды не запускаются).
5. Дополнительно: **`npm run db:down`** — остановить compose; **`npm run db:drop`** / **`npm run db:create`** — только пересоздать пустую БД (скрипт [`scripts/db/db-admin.sh`](scripts/db/db-admin.sh)).

**Миграции: `generate` vs `create`**

- **`npm run migration:generate -w @mvp/backend`** сравнивает **текущие TypeORM-сущности** с **реальной схемой в Postgres** и генерирует SQL только если есть отличия. Сообщение _«No changes in database schema were found»_ означает, что БД уже совпадает с кодом (например, после `db:migrate`) — это нормально, а не поломка контейнера. Чтобы появился diff, сначала измените entity (поля, индексы и т.д.), затем снова запустите `migration:generate`.
- **`npm run migration:create -w @mvp/backend`** создаёт **пустой** шаблон миграции в **`src/core/database/migrations/`** (имя с timestamp добавит TypeORM). Используйте, когда нужно написать SQL вручную без автосравнения.

Другое имя файла для generate: из `apps/backend` —  
`nest build && npx typeorm migration:generate src/core/database/migrations/ВашеИмя -d dist/src/core/database/data-source.js`.  
Для create: `npx typeorm migration:create src/core/database/migrations/ВашеИмя`.

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

Откройте `http://localhost:5173`. Запросы к API по умолчанию идут на `http://localhost:3000` (переопределение через **`VITE_API_BASE_URL`**; см. `apps/frontend/src/config/api-base-url.ts`). Порт бэкенда задаётся **`PORT`** в `apps/backend/.env` (по умолчанию `3000` после валидации Zod).

## Зависимости и контракты

- **`@mvp/shared`** собирается в **CommonJS**, чтобы Nest подключал пакет через `require`, а фронт при разработке мог резолвить тот же API через алиас Vite на исходники `src`.
- **class-validator** / **class-transformer** — валидация тел запросов на бэкенде.
- Ответы `users` и `notes`: сервисы работают с **доменными моделями**, контроллеры мапят их в **`UserDto` / `NoteDto`** из `@mvp/shared` для совпадения с фронтом.
