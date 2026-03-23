# Scripts

This folder contains project maintenance and scaffolding utilities.

## Commands

### `npm run cleanup`

Runs [cleanupUploads.ts](/c:/Users/LiamH/Desktop/Projects/Store/scripts/cleanupUploads.ts).

- Removes zero-byte files from the upload storage
- Removes directories that become empty after file cleanup
- Safe to run multiple times

### `npm run module -- <name>`

Runs [createModule/index.ts](/c:/Users/LiamH/Desktop/Projects/Store/scripts/createModule/index.ts).

- Creates a backend module under `src/modules/<name>`
- Creates a matching migration in `src/database/migrations`
- Uses the project's current route, type, and validation naming conventions

## `createModule` layout

- `index.ts`: builds config and runs the scaffold process
- `generators/`: creates folders, files, and migrations
- `templates/`: template strings for generated files
- `utils/`: filesystem and naming helpers

