import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('XM²code has one reusable brand component and no fox branding', () => {
  assert.equal(existsSync(new URL('../src/components/ui/BrandMark.jsx', import.meta.url)), true);
  const brand = read('src/components/ui/BrandMark.jsx');
  assert.match(brand, /XM²/);
  assert.match(brand, /XM²code/);
  assert.doesNotMatch(brand, /fox|狐狸/i);
});

test('shared page components expose semantic wrappers', () => {
  assert.match(read('src/components/ui/PageHeader.jsx'), /<header/);
  assert.match(read('src/components/ui/Surface.jsx'), /ui-surface/);
  assert.match(read('src/components/ui/StatusBadge.jsx'), /status-badge/);
});

test('the product description uses the approved global name', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.match(pkg.description, /XM²code/);
  assert.doesNotMatch(pkg.description, /xmmcode/);
});
