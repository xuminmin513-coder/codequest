import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { _electron as electron } from 'playwright';

test('XM²code keeps the approved desktop and mobile learning layout', { timeout: 60000 }, async () => {
  const profileDir = await mkdtemp(path.join(tmpdir(), 'xm2-ui-e2e-'));
  let electronApp;

  try {
    electronApp = await electron.launch({
      args: ['.', '--xmcode-e2e'],
      env: { ...process.env, XMCODE_E2E_USER_DATA: profileDir },
    });
    const page = await electronApp.firstWindow();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => (document.querySelector('#root')?.childElementCount ?? 0) > 0);

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByText('XM²code', { exact: true }).first().waitFor();
    assert.equal(await page.getByText('🦊').count(), 0);
    await page.locator('.dashboard-continue-card').waitFor();

    await page.getByRole('button', { name: '设置', exact: true }).click();
    await page.locator('.save-slots-card').waitFor();
    assert.equal(await page.locator('.save-profile-card').count(), 1);
    assert.equal(await page.locator('.save-add-tile').count(), 1);

    await page.getByRole('button', { name: '课程地图', exact: true }).click();
    await page.locator('.lesson-path-item:not([disabled])').first().click();
    await page.locator('.lesson-workspace').waitFor();

    const desktopLayout = await page.evaluate(() => {
      const workspace = document.querySelector('.lesson-workspace').getBoundingClientRect();
      const brief = document.querySelector('.lesson-brief').getBoundingClientRect();
      const coding = document.querySelector('.lesson-coding-column').getBoundingClientRect();
      const editor = document.querySelector('.lesson-editor-card').getBoundingClientRect();
      const drawer = document.querySelector('.lesson-result-drawer');
      return {
        briefRatio: brief.width / workspace.width,
        codingWider: coding.width > brief.width,
        editorHeight: editor.height,
        drawerBackground: getComputedStyle(drawer).backgroundColor,
      };
    });
    assert.ok(desktopLayout.briefRatio >= 0.22 && desktopLayout.briefRatio <= 0.29, JSON.stringify(desktopLayout));
    assert.equal(desktopLayout.codingWider, true);
    assert.ok(desktopLayout.editorHeight >= 400, JSON.stringify(desktopLayout));
    assert.equal(desktopLayout.drawerBackground, 'rgb(255, 255, 255)');

    await page.locator('.cm-content').fill('print("Hello, World!")');
    await page.getByRole('button', { name: /运行代码/ }).click();
    await page.locator('.lesson-result-drawer .status-badge').filter({ hasText: '1 / 1 通过' }).waitFor({ timeout: 30000 });
    assert.equal(await page.locator('.confetti-container').count(), 1);

    const badgeDialog = page.getByRole('dialog', { name: '新徽章解锁！' });
    if (await badgeDialog.isVisible()) {
      await badgeDialog.getByRole('button', { name: '太棒了！' }).click();
    }
    await page.getByRole('tab', { name: '运行输出' }).click();
    await page.locator('.lesson-program-output').filter({ hasText: 'Hello, World!' }).waitFor();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.mobile-topbar').waitFor();
    await page.locator('.mobile-navigation').waitFor();
    assert.equal(await page.locator('.lesson-brief').isVisible(), true);
    assert.equal(await page.locator('.desktop-sidebar').isVisible(), false);

    const mobileLayout = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      gridColumns: getComputedStyle(document.querySelector('.lesson-workspace')).gridTemplateColumns,
      resultTabJustify: getComputedStyle(document.querySelector('.lesson-result-tabs')).justifyContent,
    }));
    assert.ok(mobileLayout.documentWidth <= mobileLayout.viewportWidth + 1, JSON.stringify(mobileLayout));
    assert.equal(mobileLayout.gridColumns.trim().split(/\s+/).length, 1);
    assert.equal(mobileLayout.resultTabJustify, 'center');
  } finally {
    await electronApp?.close();
    await rm(profileDir, { recursive: true, force: true });
  }
});
