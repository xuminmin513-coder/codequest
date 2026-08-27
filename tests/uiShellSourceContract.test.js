import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('sidebar uses semantic navigation and approved brand', () => {
  const source = read('src/components/Sidebar.jsx');
  assert.match(source, /import BrandMark/);
  assert.match(source, /<nav[^>]*aria-label=/);
  assert.match(source, /<button/);
  assert.doesNotMatch(source, /logo-icon">⌨️|xmmcode/);
});

test('app exposes the responsive mobile navigation', () => {
  const app = read('src/App.jsx');
  const sidebar = read('src/components/Sidebar.jsx');
  assert.match(app, /<MobileNavigation/);
  assert.match(sidebar, /mobile-navigation/);
  assert.match(sidebar, /aria-label=/);
});
