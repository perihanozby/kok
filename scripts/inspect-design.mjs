import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';

// Source is data: do not execute scripts from the supplied HTML.
const root = 'design/stitch-original/stitch_k_k_family_heritage_app_ui_ux';
const reviews = JSON.parse(await readFile('design/reviews.json', 'utf8'));
const screens = [];
for (const entry of (await readdir(root, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
  if (!entry.isDirectory() || entry.name === 'k_k_heritage_design_system') continue;
  const directory = join(root, entry.name);
  const html = await readFile(join(directory, 'code.html'), 'utf8');
  const png = await readFile(join(directory, 'screen.png'));
  assert.equal(png.subarray(0,8).toString('hex'), '89504e470d0a1a0a');
  const clean = value => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  screens.push({
    folder: entry.name,
    title: clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    headings: [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => clean(m[1])),
    buttons: [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map(m => clean(m[1])),
    fields: [...html.matchAll(/<(input|textarea|select)\b[^>]*>/gi)].map(m => m[0]),
    icons: [...new Set([...html.matchAll(/<[^>]+class="[^"]*material-symbols[^"\n]*"[^>]*>([^<]+)<\//g)].map(m=>m[1].trim()))],
    png: { width: png.readUInt32BE(16), height: png.readUInt32BE(20) },
    review: reviews[entry.name] ?? 'Yalnızca yapısal tarama; HTML ve PNG birlikte görsel olarak incelenmedi.',
  });
}
assert.equal(screens.length, 52, 'Expected 52 HTML/PNG pairs');
await mkdir('design', { recursive: true });
await writeFile('design/source-index.json', JSON.stringify(screens, null, 2) + '\n');
const rows = screens.map(s => `| ${s.folder} | ${s.headings.join(' / ').replaceAll('|','/')} | ${s.png.width}×${s.png.height} | ${reviews[s.folder] ? 'İncelendi; ayrıntılar design/reviews.json' : 'Bekliyor'} |`);
await writeFile('docs/SCREEN_INVENTORY.md', '# Ekran envanteri\n\n52 HTML/PNG çifti betikle doğrulandı. Aşağıdaki başlıklar HTML’den çıkarılmış ham metindir; ürün başlığı veya tamamlanmış analiz değildir. Görsel inceleme ve bileşen/etkileşim/veri sözleşmesi değerlendirmesi Faz 0–2 kapsamında bekliyor. PNG boyutları yalnızca dosya doğrulaması içindir; mobil ölçü kaynağı değildir.\n\n| Kaynak klasör | HTML başlıkları | PNG | Birlikte inceleme |\n|---|---|---|---|\n' + rows.join('\n') + '\n');
console.log(`Verified ${screens.length} HTML/PNG pairs; generated structural index.`);
