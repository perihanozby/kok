import { readFile, writeFile } from 'node:fs/promises';
const screens = JSON.parse(await readFile('design/source-index.json', 'utf8'));
const usage = {};
for (const screen of screens) {
  for (const name of screen.icons) (usage[name] ??= []).push(screen.folder);
}
const icons = Object.keys(usage).sort();
await writeFile('design/icons.json', JSON.stringify({ icons, usage, status: 'Extracted names only; font codepoint resolution pending.' }, null, 2) + '\n');
console.log(`Extracted ${icons.length} unique icon names. Font mapping has not been validated.`);
