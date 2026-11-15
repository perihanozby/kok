import { access, readFile, writeFile } from 'node:fs/promises';

const pending = {
  PROJECT_OVERVIEW: 'Ürün kapsamı', ARCHITECTURE: 'Mimari', DESIGN_SYSTEM: 'Tasarım sistemi',
  NAVIGATION_MAP: 'Gezinti haritası', API_CONTRACT: 'API sözleşmesi', DATABASE_SCHEMA: 'Veritabanı şeması',
  SECURITY_MODEL: 'Güvenlik modeli', DESIGN_GAPS: 'Tasarım boşlukları', GLOSSARY_TR: 'Türkçe sözlük',
  COSTS_AND_INFRA: 'Maliyet ve altyapı', RELEASE: 'Yayın hazırlığı',
};
for (const [name, title] of Object.entries(pending)) {
  const path = `docs/${name}.md`;
  try { await access(path); } catch {
    await writeFile(path, `# ${title}\n\nDurum: hazırlanmadı. İlgili uygulama fazında gerçek uygulama ve doğrulama kanıtlarıyla doldurulacak. Gereksinim kaynağı: AGENTS.md.\n`);
  }
}
const request = await readFile('AGENTS.md', 'utf8');
const criteriaSection = request.split('# BÖLÜM 15')[1].split('# BÖLÜM 16')[0];
const criteria = [...criteriaSection.matchAll(/^\d+\. (.+)$/gm)].map(m => m[1]);
const screens = JSON.parse(await readFile('design/source-index.json', 'utf8'));
const path = 'docs/ACCEPTANCE_MATRIX.md';
try { await access(path); } catch {
  await writeFile(path, '# Kabul matrisi\n\nHiçbir kabul maddesi henüz tamamlanmadı. Donanım/ADB kontrolleri uygulama doğrulaması değildir.\n\n| Kriter | Durum | Kanıt |\n|---|---|---|\n' +
    criteria.map((c,i)=>`| ${i+1}. ${c} | Bekliyor | Yok |`).join('\n') +
    '\n\n| Tasarım kaynağı | Kodlandı | Otomatik test | Cihazda doğrulandı |\n|---|---|---|---|\n' +
    screens.map(s=>`| ${s.folder} | Hayır | Hayır | Hayır |`).join('\n') + '\n');
}
console.log('Documentation skeleton created without overwriting existing files.');
