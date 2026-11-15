import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

// Parse data syntax only. No eval, vm, browser execution or remote HTML resources.
const require = createRequire(resolve('mobile/package.json'));
const { parse } = require('@babel/parser');
const root = 'design/stitch-original/stitch_k_k_family_heritage_app_ui_ux';
const screens = JSON.parse(await readFile('design/source-index.json', 'utf8'));
function literal(node) {
  if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral'].includes(node.type)) return node.value;
  if (node.type === 'NullLiteral') return null;
  if (node.type === 'ArrayExpression') return node.elements.map(literal);
  if (node.type === 'ObjectExpression') {
    return Object.fromEntries(node.properties.map(property => {
      assert.equal(property.type, 'ObjectProperty', 'Only static object properties are allowed');
      assert.equal(property.computed, false);
      return [property.key.name ?? property.key.value, literal(property.value)];
    }));
  }
  throw new Error(`Non-data AST rejected: ${node.type}`);
}
const configurations = {};
const cssOnlySources = {};
for (const screen of screens) {
  const html = await readFile(`${root}/${screen.folder}/code.html`, 'utf8');
  const script = html.match(/<script\b[^>]*id="tailwind-config"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
  if (!script && screen.folder === 'k_k_ui_kit_tasar_m_sistemi_dok_mantasyonu') {
    cssOnlySources[screen.folder] = {
      colors: [...new Set(html.match(/#[\da-f]{6}\b/gi))].sort(),
      styleBlocks: [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(match => match[1]),
      note: 'UI Kit has no Tailwind config; literal CSS and utility values are preserved separately.',
    };
    continue;
  }
  assert.ok(script, `Missing Tailwind config: ${screen.folder}`);
  const ast = parse(script);
  const assignment = ast.program.body.find(node => node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression')?.expression;
  assert.equal(assignment?.left.type, 'MemberExpression');
  assert.equal(assignment.left.object.name, 'tailwind');
  assert.equal(assignment.left.property.name, 'config');
  configurations[screen.folder] = literal(assignment.right);
}
const document = await readFile(`${root}/k_k_heritage_design_system/DESIGN.md`, 'utf8');
const frontmatter = document.split('---')[1];
const yaml = {};
const stack = [{ indent: -1, value: yaml }];
for (const line of frontmatter.split(/\r?\n/)) {
  if (!line.trim()) continue;
  const match = line.match(/^(\s*)([\w-]+):\s*(.*?)\s*$/);
  assert.ok(match, `Unsupported YAML line: ${line}`);
  const [, spaces, key, raw] = match;
  while (stack.at(-1).indent >= spaces.length) stack.pop();
  const parent = stack.at(-1).value;
  if (!raw) { parent[key] = {}; stack.push({ indent: spaces.length, value: parent[key] }); }
  else parent[key] = raw.replace(/^(['"])(.*)\1$/, '$2');
}
await writeFile('design/tokens.json', JSON.stringify({
  status: 'Extracted source tokens. K2 provisional theme choice; Phase 2 approval and contrast tests pending.',
  designDocument: yaml,
  htmlConfigurations: configurations,
  cssOnlySources,
  provisionalColors: { ...yaml.colors, background: '#FAF8F4' },
}, null, 2) + '\n');
assert.equal(Object.keys(configurations).length + Object.keys(cssOnlySources).length, 52);
console.log(`Extracted ${Object.keys(configurations).length} Tailwind configurations, one CSS UI Kit and DESIGN.md.`);
