# XM²code Versioned Player Saves Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace direct global learning-data storage with one default versioned player save, optional additional saves, three integrity-checked recovery points, and a stable storage adapter that future native databases and cloud sync can implement.

**Architecture:** A small catalog remains in physical browser storage, while every player save receives a namespaced `Storage` adapter. Existing `STORAGE` methods continue using their current keys through the active adapter, so course UI does not need a broad rewrite. Destructive import/reset/restore operations create a recovery snapshot first; switching saves changes the catalog and reloads the application.

**Tech Stack:** React 18, browser `Storage` contract, Node `node:test`, existing curriculum migration utilities.

---

## Worktree and existing changes

The repository is already on `codex/v2-phase-a-trusted-practice`, not `main` or `master`. The normal checkout contains user-owned changes in course, settings, storage migration, and tests. Work in place so those changes remain visible; never use `git add .`, never rewrite `courses.js`, and stage only files listed by this plan.

## File responsibility map

- `src/data/playerSaveRepository.js`: catalog validation, default save migration, active namespace adapter, save creation/switching, checksummed recoveries.
- `src/main.jsx`: initialize the default/legacy-migrated save before React reads language or progress.
- `src/utils/storage.js`: route existing keys through the active adapter and create recoveries before destructive operations.
- `src/components/SaveSlots.jsx`: show the active slot, switch an existing slot, and add one slot only after the player clicks.
- `src/components/Settings.jsx`: render the save management card without changing course content.
- `src/styles/global.css`: minimal save-slot layout using existing card/button tokens.
- `tests/playerSaveRepository.test.js`: catalog, migration, isolation, corruption, rollback, and recovery behavior.
- `tests/storageSaveBoundary.test.js`: source contract proving learning data does not bypass the adapter.
- `tests/saveSlotsSourceContract.test.js`: user-visible one-default-plus-add behavior.

### Task 1: Define the repository contract with failing tests

**Files:**
- Create: `tests/playerSaveRepository.test.js`

- [x] **Step 1: Write the failing catalog and isolation tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStorage } from './helpers/memoryStorage.js';
import {
  ACTIVE_SAVE_KEY,
  SAVE_CATALOG_KEY,
  createPlayerSaveRepository,
} from '../src/data/playerSaveRepository.js';

test('first initialization creates exactly one default save and migrates legacy data', () => {
  const physical = createMemoryStorage({
    codedex_lang: 'zh',
    codedex_progress: '{"ch1":{"ch1_01":{"done":true}}}',
  });
  const repo = createPlayerSaveRepository(physical, {
    now: () => 100,
    idFactory: () => 'save-default',
  });
  repo.initialize();
  assert.equal(repo.listSaves().length, 1);
  assert.equal(repo.getActiveSave().id, 'save-default');
  assert.equal(repo.getActiveStorage().getItem('codedex_lang'), 'zh');
  assert.equal(physical.getItem('codedex_progress'), null);
  assert.ok(physical.getItem(SAVE_CATALOG_KEY));
  assert.equal(physical.getItem(ACTIVE_SAVE_KEY), 'save-default');
});

test('adding and switching saves keeps learning data isolated', () => {
  const physical = createMemoryStorage();
  const ids = ['save-one', 'save-two'];
  const repo = createPlayerSaveRepository(physical, {
    now: () => 100,
    idFactory: () => ids.shift(),
  });
  repo.initialize();
  repo.getActiveStorage().setItem('codedex_lang', 'zh');
  const second = repo.addSave('第二个存档');
  repo.switchSave(second.id);
  assert.equal(repo.getActiveStorage().getItem('codedex_lang'), null);
  repo.getActiveStorage().setItem('codedex_lang', 'en');
  repo.switchSave('save-one');
  assert.equal(repo.getActiveStorage().getItem('codedex_lang'), 'zh');
});
```

- [x] **Step 2: Run RED**

Run: `node --test tests/playerSaveRepository.test.js`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `playerSaveRepository.js`.

### Task 2: Implement catalog, namespace adapter, and atomic legacy migration

**Files:**
- Create: `src/data/playerSaveRepository.js`

- [x] **Step 1: Add constants, validators, checksum, and namespaced storage**

Implement these public exports with no external dependency:

```js
export const SAVE_SCHEMA_VERSION = 1;
export const SAVE_CATALOG_KEY = 'xm2_save_catalog_v1';
export const ACTIVE_SAVE_KEY = 'xm2_active_save_id_v1';
export const MAX_PLAYER_SAVES = 12;
export const MAX_RECOVERIES = 3;

export function createPlayerSaveRepository(physicalStorage, options = {}) {
  return {
    initialize,
    listSaves,
    getActiveSave,
    getActiveStorage,
    addSave,
    switchSave,
    createRecovery,
    listRecoveries,
    restoreRecovery,
  };
}

export function initializePlayerSaves(storage = globalThis.localStorage) { /* singleton */ }
export function getPlayerSaveRepository() { /* initialized singleton */ }
export function getActivePlayerStorage() { return getPlayerSaveRepository().getActiveStorage(); }
```

The namespaced adapter must implement `length`, `key(index)`, `getItem`, `setItem`, `removeItem`, and `clear`. Physical keys use `xm2_save_data:<encoded save id>:<encoded learning key>`.

Catalog parsing accepts only `{schemaVersion, checksum, activeSaveId, saves}` and save entries accept only `{id,name,createdAt,updatedAt}`. IDs match `/^save-[A-Za-z0-9_-]{1,80}$/`; names are trimmed strings of 1–40 characters; timestamps are finite non-negative numbers. Compute checksum from deterministic JSON with sorted object keys using synchronous FNV-1a. Invalid catalogs throw `PlayerSaveCorruptionError` and are never silently overwritten.

- [x] **Step 2: Implement first initialization transaction**

On empty physical storage:

1. Create one save named `默认存档`.
2. Copy only the existing learning/config keys declared by the repository legacy allowlist into its namespace.
3. Write and re-read the validated catalog and active ID.
4. Only after validation succeeds, remove copied legacy keys.
5. If any write fails, restore the physical snapshot and rethrow.

On an existing valid catalog, validate the active save and return without adding another slot.

- [x] **Step 3: Implement add and switch**

`addSave(name)` creates metadata only and does not switch automatically. `switchSave(id)` validates the target, updates catalog `activeSaveId` and the separate active key atomically, then makes subsequent adapter calls target the new namespace. Reject duplicate IDs, unknown IDs, invalid names, and more than 12 saves.

- [x] **Step 4: Run GREEN and full unit tests**

Run: `node --test tests/playerSaveRepository.test.js`
Expected: 2 tests PASS.

Run: `npm test`
Expected: all existing tests and the new tests PASS.

### Task 3: Add checksummed recovery snapshots

**Files:**
- Modify: `tests/playerSaveRepository.test.js`
- Modify: `src/data/playerSaveRepository.js`

- [x] **Step 1: Add failing recovery tests**

```js
test('recoveries keep the newest three valid snapshots', () => {
  let time = 100;
  const physical = createMemoryStorage();
  const repo = createPlayerSaveRepository(physical, {
    now: () => time++,
    idFactory: () => 'save-one',
  });
  repo.initialize();
  for (let value = 1; value <= 4; value += 1) {
    repo.getActiveStorage().setItem('codedex_progress', JSON.stringify({ value }));
    repo.createRecovery(`snapshot-${value}`);
  }
  const recoveries = repo.listRecoveries();
  assert.deepEqual(recoveries.map(item => item.reason), ['snapshot-4', 'snapshot-3', 'snapshot-2']);
});

test('restore rejects a tampered recovery without changing active data', () => {
  const physical = createMemoryStorage();
  const repo = createPlayerSaveRepository(physical, {
    now: () => 100,
    idFactory: () => 'save-one',
  });
  repo.initialize();
  repo.getActiveStorage().setItem('codedex_progress', '{"value":1}');
  const recovery = repo.createRecovery('before-import');
  repo.getActiveStorage().setItem('codedex_progress', '{"value":2}');
  const key = `xm2_save_recoveries:${repo.getActiveSave().id}`;
  const raw = JSON.parse(physical.getItem(key));
  raw[0].data.codedex_progress = '{"value":999}';
  physical.setItem(key, JSON.stringify(raw));
  assert.throws(() => repo.restoreRecovery(recovery.id), /checksum/i);
  assert.equal(repo.getActiveStorage().getItem('codedex_progress'), '{"value":2}');
});
```

- [x] **Step 2: Run RED**

Run: `node --test tests/playerSaveRepository.test.js`
Expected: FAIL because recovery methods are not implemented.

- [x] **Step 3: Implement recovery creation and restore**

Recovery records contain only `{id,saveId,createdAt,reason,data,checksum}`. Snapshot all keys visible through the active namespace adapter. Values must be strings, reasons 1–80 characters, and snapshot JSON at most 1 MiB. Store newest first and retain three.

Restore flow:

1. Parse and validate every recovery before mutation.
2. Verify the selected checksum.
3. Capture current namespace.
4. Create a `before-recovery` snapshot.
5. Clear and replace the active namespace.
6. Re-read and compare all restored values.
7. On failure, restore the captured namespace and original recovery list.

- [x] **Step 4: Run GREEN**

Run: `node --test tests/playerSaveRepository.test.js`
Expected: 4 tests PASS.

### Task 4: Route existing STORAGE through the active save

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/utils/storage.js`
- Create: `tests/storageSaveBoundary.test.js`

- [x] **Step 1: Write the failing source boundary test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('React initializes player saves before rendering', () => {
  const source = read('src/main.jsx');
  assert.match(source, /initializePlayerSaves\(\)/);
  assert.ok(source.indexOf('initializePlayerSaves()') < source.indexOf('createRoot'));
});

test('learning storage routes through the active player adapter', () => {
  const source = read('src/utils/storage.js');
  assert.match(source, /getActivePlayerStorage/);
  assert.doesNotMatch(source, /globalThis\.localStorage|window\.localStorage/);
});
```

- [x] **Step 2: Run RED**

Run: `node --test tests/storageSaveBoundary.test.js`
Expected: FAIL because initialization and adapter import are absent.

- [x] **Step 3: Initialize before React and shadow the Storage dependency**

At the top of `main.jsx`, import and call `initializePlayerSaves()` before `ReactDOM.createRoot`.

In `storage.js`, import `getActivePlayerStorage` and define a module-local adapter facade:

```js
const localStorage = {
  get length() { return getActivePlayerStorage().length; },
  key(index) { return getActivePlayerStorage().key(index); },
  getItem(key) { return getActivePlayerStorage().getItem(key); },
  setItem(key, value) { return getActivePlayerStorage().setItem(key, value); },
  removeItem(key) { return getActivePlayerStorage().removeItem(key); },
  clear() { return getActivePlayerStorage().clear(); },
};
```

Existing storage methods continue unchanged and now operate inside the active save.

- [x] **Step 4: Add recovery gates**

Before `restartForV2`, `restoreCurriculumArchive`, and `importAllData`, call repository `createRecovery` with `before-reset`, `before-curriculum-restore`, or `before-import`. If snapshot creation fails, do not start the destructive operation.

- [x] **Step 5: Run boundary and regression tests**

Run: `node --test tests/storageSaveBoundary.test.js tests/storageMigration.test.js tests/curriculumMigration.test.js`
Expected: PASS.

Run: `npm test`
Expected: all tests PASS.

### Task 5: Add the one-default-plus-add save UI

**Files:**
- Create: `src/components/SaveSlots.jsx`
- Modify: `src/components/Settings.jsx`
- Modify: `src/styles/global.css`
- Create: `tests/saveSlotsSourceContract.test.js`

- [x] **Step 1: Write failing UI source contract**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('settings exposes player saves through a dedicated component', () => {
  const settings = read('src/components/Settings.jsx');
  assert.match(settings, /import SaveSlots/);
  assert.match(settings, /<SaveSlots/);
});

test('save UI adds a slot only from an explicit button action', () => {
  const source = read('src/components/SaveSlots.jsx');
  assert.match(source, /listSaves\(\)/);
  assert.match(source, /addSave\(/);
  assert.match(source, /添加存档槽/);
  assert.match(source, /switchSave\(/);
  assert.doesNotMatch(source, /while\s*\([^)]*saves/);
});
```

- [x] **Step 2: Run RED**

Run: `node --test tests/saveSlotsSourceContract.test.js`
Expected: FAIL because `SaveSlots.jsx` is absent.

- [x] **Step 3: Implement SaveSlots**

Render all existing saves, mark the active one, and provide a switch button only for inactive saves. The add button asks for a name using the localized default `存档 N`/`Save N`, calls `addSave`, then switches to the new save only after success and reloads. Do not pre-create six slots. Display repository errors through `addToast`.

- [x] **Step 4: Integrate Settings and styles**

Add a settings card headed `存档 / Saves` above data import/export. Reuse `.settings-card`, `.setting-item`, `.toggle-btn`, and add only compact `.save-slot-*` rules for active status and button spacing.

- [x] **Step 5: Run GREEN and build**

Run: `node --test tests/saveSlotsSourceContract.test.js`
Expected: PASS.

Run: `npm test`
Expected: all tests PASS.

Run: `npm run build`
Expected: exit 0.

### Task 6: Runtime and migration verification

**Files:**
- Modify: `docs/superpowers/plans/2026-08-24-versioned-player-saves.md` only to mark completed checkboxes.

- [x] **Step 1: Verify legacy migration in Electron E2E**

Extend the existing Electron E2E or add a focused test that seeds a temporary user-data directory with legacy local storage, launches the app, and proves exactly one catalog entry exists and the old progress is readable through the active adapter.

Run: `npm run test:e2e`
Expected: all Electron E2E tests PASS.

- [x] **Step 2: Complete verification**

Run: `npm test`
Expected: 0 failures.

Run: `npm run validate:curriculum`
Expected: `Curriculum valid: 26 chapters, 104 lessons.`

Run: `npm run build`
Expected: exit 0 with bundled local Pyodide assets.

Run: `git diff --check`
Expected: exit 0.

- [x] **Step 3: Inspect scope and commit only this phase**

List `git status --short`, distinguish pre-existing user files, and stage only the repository, tests, main entry, save UI, scoped portions of Settings/storage/styles, architecture spec, and this plan. Never stage `src/data/courses.js` or unrelated user changes. Commit message:

```text
feat: add versioned player saves
```
