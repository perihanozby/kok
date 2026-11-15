import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const files = execFileSync('git', ['-c', `safe.directory=${process.cwd().replaceAll('\\', '/')}`, 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const patterns = [
  /\bAKIA[0-9A-Z]{16}\b/g,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/g,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b/g,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
];
const findings = [];
for (const file of files) {
  const bytes = await readFile(file);
  if (bytes.includes(0)) continue;
  const content = bytes.toString('utf8');
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) findings.push(file);
  }
}
if (findings.length) {
  console.error(`Potential secrets found in: ${[...new Set(findings)].join(', ')}. Values are intentionally hidden.`);
  process.exitCode = 1;
} else {
  console.log(`Scanned ${files.length} repository candidates; no known credential/private-key signatures found. This does not prove absence of all secrets.`);
}
