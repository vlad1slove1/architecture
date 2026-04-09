/**
 * Имя миграции из аргументов npm: `npm run migration:generate -- AddUsers`.
 * @param {readonly string[]} argv
 * @returns {string | null}
 */
export function parseMigrationName(argv) {
    const name = argv[2]?.trim();
    if (name === undefined || name.length === 0) {
        return null;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
        return null;
    }

    return name;
}
