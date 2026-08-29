# XM²code Platform Contract and Shells Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the shared React product depend on one validated platform contract, retain the hardened Electron shell, and add source-controlled Capacitor iOS/Android and HarmonyOS ArkUI/ArkWeb shells without granting player code native privileges.

**Architecture:** The shared app bootstraps a frozen, versioned platform descriptor before initializing player saves. The descriptor exposes only platform identity, form factor, capability flags, and a Web Storage-compatible persistence surface; it never exposes Electron IPC, Node, raw Capacitor plugins, or HarmonyOS native objects. Native shells load the same production `dist` bundle. Mobile and HarmonyOS copies are generated from `dist`, so product code has one source of truth.

**Tech Stack:** React 18, Vite 6, Electron 42, Capacitor 8.5.0, Swift Package Manager, Android Gradle project, HarmonyOS Stage model, ArkUI/ArkWeb, Node `node:test`.

---

## Existing-change boundary

The worktree contains user-owned changes in `.gitignore`, course content, settings/storage rollback behavior, gamification, and curriculum tests. Never stage those files wholesale. This phase may modify clean entry/config files and add new `src/platform`, `apps/mobile`, `apps/harmony`, scripts, tests, and documentation. Any required overlap must be staged by hunk.

## Task 1: Define a strict shared platform contract

**Files:**
- Create: `tests/platformContract.test.js`
- Create: `src/platform/platformContract.js`

- [ ] **Step 1: Write failing contract tests**

Cover strict shell/OS/form-factor enums, storage shape validation, immutable descriptors, capability defaults, rejection of unknown fields, and detection of Electron custom origin, Capacitor iOS/Android globals, HarmonyOS marker, and ordinary web.

- [ ] **Step 2: Run RED**

Run: `node --test tests/platformContract.test.js`

Expected: FAIL because the contract module is absent.

- [ ] **Step 3: Implement the contract**

Export `PLATFORM_CONTRACT_VERSION`, allowed enum constants, `createPlatformAdapter`, `detectPlatformEnvironment`, `initializePlatform`, and `getPlatform`. Accept only:

```js
{
  version: 1,
  shell: 'web' | 'electron' | 'capacitor' | 'harmony',
  os: 'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'harmonyos' | 'unknown',
  formFactor: 'desktop' | 'tablet' | 'mobile' | 'foldable' | 'unknown',
  capabilities: {
    nativeStorage: boolean,
    secureAuthentication: boolean,
    managedUpdates: boolean,
    windowManagement: boolean,
  },
  storage: Storage,
}
```

Clone and deeply freeze metadata. Keep the storage object private behind a frozen facade so native objects are not leaked. Do not accept arbitrary methods or extra capability names.

- [ ] **Step 4: Run GREEN**

Run: `node --test tests/platformContract.test.js`

Expected: all platform contract tests PASS.

## Task 2: Bootstrap shared data through the platform adapter

**Files:**
- Modify: `src/main.jsx`
- Create: `tests/platformBootstrapSourceContract.test.js`

- [ ] **Step 1: Write the failing source boundary test**

Prove `initializePlatform()` runs before `initializePlayerSaves()`, player saves receive `platform.storage`, and shared product code outside `src/platform` contains no direct `Capacitor`, Harmony native, Electron renderer, or Node API reference.

- [ ] **Step 2: Run RED**

Run: `node --test tests/platformBootstrapSourceContract.test.js`

- [ ] **Step 3: Wire the boot sequence**

Initialize and validate the platform once, pass its storage facade to `initializePlayerSaves`, and set stable `data-xm-shell`, `data-xm-os`, and `data-xm-form-factor` attributes on the document root for responsive design. Failure must render a small safe startup error instead of silently falling back to an unvalidated native bridge.

- [ ] **Step 4: Run GREEN and regressions**

Run: `npm test`

Expected: all tests PASS.

## Task 3: Keep Electron as the hardened desktop shell

**Files:**
- Create: `apps/desktop/README.md`
- Create: `apps/desktop/shell-manifest.json`
- Modify: `tests/electronSecurity.e2e.mjs`

- [ ] **Step 1: Add desktop shell assertions**

In Electron E2E, verify the platform descriptor reports `shell=electron`, an OS matching the host, desktop form factor, and no privileged globals. Keep all existing network, navigation, permissions, and host-file isolation checks.

- [ ] **Step 2: Add the desktop manifest**

Record supported targets (`darwin-arm64`, `darwin-x64`, `win32-x64`, `linux-x64`), custom origin, entry point, update-channel policy, and required signing states. This is source metadata for later CI and packaging; do not embed signing secrets.

- [ ] **Step 3: Verify Electron**

Run: `npm run build`

Run: `npm run test:e2e`

Expected: production bundle and Electron E2E PASS.

## Task 4: Add Capacitor iOS and Android shells

**Files:**
- Create: `apps/mobile/package.json`
- Create: `apps/mobile/package-lock.json`
- Create: `apps/mobile/capacitor.config.json`
- Create: `apps/mobile/scripts/sync-web.mjs`
- Create: `apps/mobile/.gitignore`
- Generate: `apps/mobile/ios/**`
- Generate: `apps/mobile/android/**`
- Create: `tests/mobileShellContract.test.js`

- [ ] **Step 1: Write failing mobile shell tests**

Assert the app ID is `com.xm2code.app`, app name is `XM²code`, `webDir` is a generated local directory, Capacitor packages are pinned to stable `8.5.0`, no live-reload server is configured, iOS uses Swift Package Manager, Android has no broad storage/network exceptions, and generated projects are source controlled while copied web assets are ignored.

- [ ] **Step 2: Run RED**

Run: `node --test tests/mobileShellContract.test.js`

- [ ] **Step 3: Install and initialize Capacitor**

Use exact packages `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, and `@capacitor/android` at `8.5.0`. Generate iOS with the default Swift Package Manager path and Android with the official CLI. Do not add native plugins until a shared product capability requires them.

- [ ] **Step 4: Add deterministic web sync**

The sync script removes only `apps/mobile/www`, copies the already-verified root `dist`, rejects missing `index.html` or Python worker assets, and then runs `cap sync`. It must not copy secrets or development files.

- [ ] **Step 5: Verify available mobile tooling**

Run the mobile contract test and Capacitor config/sync validation. If full Xcode or Android SDK is absent, record that exact environment blocker; do not claim simulator or device success.

## Task 5: Add the HarmonyOS Stage/ArkWeb shell

**Files:**
- Create: `apps/harmony/AppScope/**`
- Create: `apps/harmony/entry/**`
- Create: `apps/harmony/build-profile.json5`
- Create: `apps/harmony/hvigorfile.ts`
- Create: `apps/harmony/oh-package.json5`
- Create: `apps/harmony/scripts/sync-web.mjs`
- Create: `apps/harmony/README.md`
- Create: `tests/harmonyShellContract.test.js`

- [ ] **Step 1: Write failing HarmonyOS shell tests**

Assert Stage model files exist, `deviceTypes` includes `phone`, `tablet`, and `2in1`, ArkWeb loads `$rawfile('index.html')`, JavaScript and DOM storage are enabled, file and online-image access are disabled, no `INTERNET` permission exists for the offline shell, navigation is blocked outside packaged resources, and the page injects only the minimal HarmonyOS platform marker.

- [ ] **Step 2: Run RED**

Run: `node --test tests/harmonyShellContract.test.js`

- [ ] **Step 3: Implement ArkUI/ArkWeb host**

Use one Stage-model `UIAbility` and one ArkUI page. Load the shared bundle from `entry/src/main/resources/rawfile`. Preserve the hardened web CSP and do not expose filesystem, account, network, or arbitrary native-call proxies to the page. Include phone/tablet/2in1 targets and resize the Web component to the current window.

- [ ] **Step 4: Add deterministic Harmony bundle sync**

Copy only verified `dist` output into `rawfile`, preserving worker/Wasm paths. The script must refuse symlinks and refuse to delete outside the exact rawfile target.

- [ ] **Step 5: Verify available HarmonyOS tooling**

Run the source contract and sync validation. Run hvigor only when DevEco/hvigor is installed; otherwise record the missing official SDK as a blocker for compile, simulator, and device claims.

## Task 6: Phase verification and scoped commit

- [ ] **Step 1: Run complete verification**

Run: `npm test`

Run: `npm run validate:curriculum`

Run: `npm run build`

Run: `npm run test:e2e`

Run mobile and Harmony sync/source-contract checks.

Run: `git diff --check`

- [ ] **Step 2: Inspect generated/native scope**

Confirm no certificates, provisioning profiles, SDK paths, copied `www`/`rawfile` output, user data, or secrets are staged. Preserve every pre-existing user-owned modification.

- [ ] **Step 3: Commit the platform phase**

Commit message:

```text
feat: add cross-platform application shells
```
