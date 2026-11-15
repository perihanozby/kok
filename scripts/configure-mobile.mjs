import { readFile, writeFile } from 'node:fs/promises';
const path = 'mobile/package.json';
const pkg = JSON.parse(await readFile(path, 'utf8'));
Object.assign(pkg, {name: 'kok-mobile', version: '0.1.0', private: true, description: 'KÖK Android application'});
delete pkg.repository;
for (const name of ['@types/jest', 'eslint', 'eslint-config-expo', 'jest', 'jest-expo', 'prettier']) {
  if (pkg.dependencies[name]) {
    pkg.devDependencies[name] = pkg.dependencies[name];
    delete pkg.dependencies[name];
  }
}
Object.assign(pkg.scripts, {typecheck: 'tsc --noEmit', lint: 'eslint .', format: 'prettier --write App.tsx src app.json package.json eslint.config.js', test: 'jest --runInBand'});
pkg.jest = {preset: 'jest-expo', testMatch: ['**/__tests__/**/*.test.ts?(x)']};
await writeFile(path, JSON.stringify(pkg, null, 2) + '\n');
await writeFile('mobile/app.json', JSON.stringify({expo: {
  name: 'KÖK', slug: 'kok-dijital-aile-mirasi', version: '0.1.0', orientation: 'default', scheme: 'kok', userInterfaceStyle: 'light',
  plugins: ['./plugins/withAndroidSafety'],
  android: {package: 'com.kok.dijitalailemirasi', versionCode: 1, allowBackup: false, predictiveBackGestureEnabled: false,
    blockedPermissions: ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE']},
}}, null, 2) + '\n');
