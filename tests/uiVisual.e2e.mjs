import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { _electron as electron } from 'playwright';

function parseRgb(color) {
  const channels = color.match(/\d+(?:\.\d+)?/g)?.map(Number);
  assert.ok(channels?.length === 3 || channels?.length === 4, `Expected an RGB or RGBA color, received ${color}`);
  if (channels.length === 4) assert.equal(channels[3], 1, `Expected an opaque color, received ${color}`);
  return channels.slice(0, 3);
}

function relativeLuminance(color) {
  const channels = parseRgb(color).map(channel => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

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

    const preRunLesson = await page.evaluate(() => {
      const rect = element => {
        const { top, right, bottom, left, width, height } = element.getBoundingClientRect();
        return { top, right, bottom, left, width, height };
      };
      const colors = (element, type) => {
        const style = getComputedStyle(element);
        const body = element.querySelector('p, li') || element;
        const label = type === 'hint'
          ? element.querySelector('strong') || body
          : element.querySelector('h2, h3') || body;
        return {
          background: style.backgroundColor,
          border: style.borderLeftColor,
          body: getComputedStyle(body).color,
          label: getComputedStyle(label).color,
        };
      };
      const first = selector => document.querySelector(selector);
      const learn = first('.lesson-content-section--learn');
      const task = first('.lesson-content-section--task');
      const hint = first('.lesson-content-callout--hint');
      const existingExample = first('.lesson-content-section--example');
      let probe;

      try {
        if (!existingExample) {
          probe = document.createElement('section');
          probe.className = 'lesson-content-section lesson-content-section--example';
          probe.innerHTML = '<h2>Example</h2><p>Example body</p>';
          document.querySelector('.lesson-brief-content').append(probe);
        }
        const example = existingExample || probe;
        const primaryActions = [...document.querySelectorAll('.lesson-primary-action')];
        const editorActions = first('.lesson-editor-actions');
        const editor = first('.lesson-editor-card');
        const wrapper = first('.editor-wrapper');
        const taskHeading = task?.querySelector('h2, h3')?.textContent?.trim();
        const hintsInline = first('.hints-inline');
        const hintsTitle = hintsInline?.querySelector('.hints-title');
        const hintSummary = first('.hint-step summary')?.textContent?.trim();
        return {
          primaryActionCount: primaryActions.length,
          primaryActionInEditorActions: primaryActions[0] ? editorActions.contains(primaryActions[0]) : false,
          primaryActionInLessonActions: primaryActions.some(action => [...document.querySelectorAll('.lesson-actions')].some(container => container.contains(action))),
          primaryActionInNavigation: primaryActions.some(action => Boolean(action.closest('nav'))),
          lessonActionCount: document.querySelectorAll('.lesson-actions').length,
          semanticExists: {
            learn: Boolean(learn),
            task: Boolean(task),
            hint: Boolean(hint),
          },
          exampleStyleSource: existingExample ? 'rendered' : 'probe',
          semantic: {
            learn: colors(learn, 'section'),
            example: colors(example, 'section'),
            task: colors(task, 'section'),
            hint: colors(hint, 'hint'),
          },
          taskHeading,
          hintText: hint?.textContent?.trim(),
          hintTitle: hintsTitle?.textContent?.trim(),
          hintSummary,
          hintsTitleContrast: hintsInline && hintsTitle ? {
            background: getComputedStyle(hintsInline).backgroundColor,
            text: getComputedStyle(hintsTitle).color,
          } : null,
          geometry: {
            editor: rect(editor),
            wrapper: rect(wrapper),
            footer: rect(editorActions),
            runButton: rect(primaryActions[0]),
          },
        };
      } finally {
        probe?.remove();
      }
    });
    assert.equal(preRunLesson.primaryActionCount, 1, JSON.stringify(preRunLesson));
    assert.equal(preRunLesson.primaryActionInEditorActions, true, JSON.stringify(preRunLesson));
    assert.equal(preRunLesson.primaryActionInLessonActions, false, JSON.stringify(preRunLesson));
    assert.equal(preRunLesson.primaryActionInNavigation, false, JSON.stringify(preRunLesson));
    assert.equal(preRunLesson.lessonActionCount, 0, JSON.stringify(preRunLesson));
    assert.deepEqual(preRunLesson.semanticExists, { learn: true, task: true, hint: true }, JSON.stringify(preRunLesson));
    assert.ok(['rendered', 'probe'].includes(preRunLesson.exampleStyleSource), JSON.stringify(preRunLesson));
    assert.match(preRunLesson.taskHeading, /任务|挑战|练习|\b(?:Task|Challenge|Exercise)\b/i, JSON.stringify(preRunLesson));
    assert.match(preRunLesson.hintText, /提示|注意|\b(?:Hint|Tip)\b/i, JSON.stringify(preRunLesson));
    assert.match(preRunLesson.hintTitle, /提示|注意|\b(?:Hint|Tip)\b/i, JSON.stringify(preRunLesson));
    assert.match(preRunLesson.hintSummary, /提示|注意|\b(?:Hint|Tip)\b/i, JSON.stringify(preRunLesson));

    const surfaces = Object.values(preRunLesson.semantic);
    assert.equal(new Set(surfaces.map(surface => surface.background)).size, 4, JSON.stringify(preRunLesson.semantic));
    assert.equal(new Set(surfaces.map(surface => surface.border)).size, 4, JSON.stringify(preRunLesson.semantic));
    for (const [name, surface] of Object.entries(preRunLesson.semantic)) {
      assert.ok(contrastRatio(surface.body, surface.background) >= 4.5, `${name} body contrast: ${JSON.stringify(surface)}`);
      assert.ok(contrastRatio(surface.label, surface.background) >= 4.5, `${name} heading or label contrast: ${JSON.stringify(surface)}`);
    }
    assert.ok(preRunLesson.hintsTitleContrast, JSON.stringify(preRunLesson));
    assert.ok(contrastRatio(preRunLesson.hintsTitleContrast.text, preRunLesson.hintsTitleContrast.background) >= 4.5, `inline hint title contrast: ${JSON.stringify(preRunLesson.hintsTitleContrast)}`);

    const { editor, wrapper, footer, runButton } = preRunLesson.geometry;
    assert.ok(runButton.left >= editor.left && runButton.right <= editor.right && runButton.top >= editor.top && runButton.bottom <= editor.bottom, JSON.stringify(preRunLesson.geometry));
    assert.ok(wrapper.left >= editor.left && wrapper.right <= editor.right && wrapper.top >= editor.top && wrapper.bottom <= editor.bottom, JSON.stringify(preRunLesson.geometry));
    assert.ok(footer.left >= editor.left && footer.right <= editor.right && footer.top >= wrapper.bottom - 0.5 && footer.bottom <= editor.bottom, JSON.stringify(preRunLesson.geometry));
    assert.ok(runButton.left >= footer.left && runButton.right <= footer.right && runButton.top >= footer.top && runButton.bottom <= footer.bottom, JSON.stringify(preRunLesson.geometry));
    assert.ok(runButton.height >= 44, JSON.stringify(preRunLesson.geometry));

    await page.locator('.cm-content').fill('print("Hello, World!")');
    await page.getByRole('button', { name: /运行代码/ }).click();
    await page.locator('.lesson-result-drawer .status-badge').filter({ hasText: '1 / 1 通过' }).waitFor({ timeout: 30000 });
    assert.equal(await page.locator('.confetti-container').count(), 1);
    const nextAction = page.locator('.lesson-actions').filter({ has: page.getByRole('button', { name: /下一关|Next/ }) });
    await nextAction.waitFor();
    assert.equal(await nextAction.count(), 1);

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
    const mobileRunAction = page.locator('.lesson-primary-action');
    const mobileBeforeScroll = await page.evaluate(() => {
      const button = document.querySelector('.lesson-primary-action');
      const main = document.querySelector('.app-main');
      const { top, right, bottom, left } = button.getBoundingClientRect();
      return {
        scrollTop: main.scrollTop,
        button: { top, right, bottom, left },
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      };
    });
    await mobileRunAction.scrollIntoViewIfNeeded();
    assert.equal(await mobileRunAction.isVisible(), true);

    const mobileLayout = await page.evaluate(() => {
      const rect = element => {
        const { top, right, bottom, left, width, height } = element.getBoundingClientRect();
        return { top, right, bottom, left, width, height };
      };
      const editor = document.querySelector('.lesson-editor-card');
      const wrapper = document.querySelector('.editor-wrapper');
      const footer = document.querySelector('.lesson-editor-actions');
      const main = document.querySelector('.app-main');
      const runButtons = [...document.querySelectorAll('.lesson-primary-action')];
      const runButtonStyle = getComputedStyle(runButtons[0]);
      return {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        appScrollTop: main.scrollTop,
        documentWidth: document.documentElement.scrollWidth,
        gridColumns: getComputedStyle(document.querySelector('.lesson-workspace')).gridTemplateColumns,
        resultTabJustify: getComputedStyle(document.querySelector('.lesson-result-tabs')).justifyContent,
        runButtonCount: runButtons.length,
        editor: rect(editor),
        wrapper: rect(wrapper),
        footer: rect(footer),
        runButton: rect(runButtons[0]),
        runButtonStyle: {
          display: runButtonStyle.display,
          visibility: runButtonStyle.visibility,
          opacity: Number(runButtonStyle.opacity),
        },
      };
    });
    assert.ok(mobileLayout.documentWidth <= mobileLayout.viewportWidth + 1, JSON.stringify(mobileLayout));
    assert.equal(mobileLayout.gridColumns.trim().split(/\s+/).length, 1);
    assert.equal(mobileLayout.resultTabJustify, 'center');
    assert.equal(mobileLayout.runButtonCount, 1, JSON.stringify(mobileLayout));
    assert.notEqual(mobileLayout.runButtonStyle.display, 'none', JSON.stringify(mobileLayout));
    assert.notEqual(mobileLayout.runButtonStyle.visibility, 'hidden', JSON.stringify(mobileLayout));
    assert.notEqual(mobileLayout.runButtonStyle.visibility, 'collapse', JSON.stringify(mobileLayout));
    assert.ok(mobileLayout.runButtonStyle.opacity > 0, JSON.stringify(mobileLayout));
    assert.ok(mobileLayout.runButton.height >= 44, JSON.stringify(mobileLayout));
    assert.ok(mobileLayout.runButton.left >= 0 && mobileLayout.runButton.right <= mobileLayout.viewportWidth && mobileLayout.runButton.top >= 0 && mobileLayout.runButton.bottom <= mobileLayout.viewportHeight, JSON.stringify(mobileLayout));
    const mobileRunWasOffscreen = mobileBeforeScroll.button.left < 0 || mobileBeforeScroll.button.right > mobileBeforeScroll.viewportWidth || mobileBeforeScroll.button.top < 0 || mobileBeforeScroll.button.bottom > mobileBeforeScroll.viewportHeight;
    if (mobileRunWasOffscreen) assert.notEqual(mobileLayout.appScrollTop, mobileBeforeScroll.scrollTop, JSON.stringify({ mobileBeforeScroll, mobileLayout }));
    assert.ok(mobileLayout.runButton.left >= mobileLayout.editor.left && mobileLayout.runButton.right <= mobileLayout.editor.right && mobileLayout.runButton.top >= mobileLayout.editor.top && mobileLayout.runButton.bottom <= mobileLayout.editor.bottom, JSON.stringify(mobileLayout));
    assert.ok(mobileLayout.footer.left >= mobileLayout.editor.left && mobileLayout.footer.right <= mobileLayout.editor.right && mobileLayout.footer.top >= mobileLayout.wrapper.bottom - 0.5 && mobileLayout.footer.bottom <= mobileLayout.editor.bottom, JSON.stringify(mobileLayout));
    assert.ok(mobileLayout.runButton.left >= mobileLayout.footer.left && mobileLayout.runButton.right <= mobileLayout.footer.right && mobileLayout.runButton.top >= mobileLayout.footer.top && mobileLayout.runButton.bottom <= mobileLayout.footer.bottom, JSON.stringify(mobileLayout));
  } finally {
    try {
      await electronApp?.close();
    } finally {
      await rm(profileDir, { recursive: true, force: true });
    }
  }
});

test('long pages keep a real vertical scroll container', { timeout: 30000 }, async () => {
  const profileDir = await mkdtemp(path.join(tmpdir(), 'xm2-scroll-e2e-'));
  let electronApp;

  try {
    electronApp = await electron.launch({
      args: ['.', '--xmcode-e2e'],
      env: { ...process.env, XMCODE_E2E_USER_DATA: profileDir },
    });
    const page = await electronApp.firstWindow();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => (document.querySelector('#root')?.childElementCount ?? 0) > 0);
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.locator('.dashboard-continue-card').waitFor();

    const desktopScroll = await page.evaluate(() => {
      const main = document.querySelector('.app-main');
      return {
        clientHeight: main.clientHeight,
        scrollHeight: main.scrollHeight,
        overflowY: getComputedStyle(main).overflowY,
      };
    });

    assert.ok(
      desktopScroll.scrollHeight > desktopScroll.clientHeight,
      `Expected the main content to scroll: ${JSON.stringify(desktopScroll)}`,
    );
    assert.ok(
      ['auto', 'scroll'].includes(desktopScroll.overflowY),
      `Expected vertical overflow to be enabled: ${JSON.stringify(desktopScroll)}`,
    );

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileScroll = await page.evaluate(() => {
      const main = document.querySelector('.app-main');
      return {
        clientHeight: main.clientHeight,
        scrollHeight: main.scrollHeight,
        overflowY: getComputedStyle(main).overflowY,
      };
    });

    assert.ok(
      mobileScroll.scrollHeight > mobileScroll.clientHeight,
      `Expected the mobile content to scroll: ${JSON.stringify(mobileScroll)}`,
    );
    assert.ok(
      ['auto', 'scroll'].includes(mobileScroll.overflowY),
      `Expected mobile vertical overflow to be enabled: ${JSON.stringify(mobileScroll)}`,
    );
  } finally {
    try {
      await electronApp?.close();
    } finally {
      await rm(profileDir, { recursive: true, force: true });
    }
  }
});
