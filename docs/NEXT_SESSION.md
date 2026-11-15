# Devam noktası

Faz 0 devam ediyor. Önce git status/log, IMPLEMENTATION_PROGRESS.md ve ENV_AUDIT.md okunmalı. `mobile/` resmi Expo 58.0.34 TypeScript şablonundan açıldı; bağımlılık kurulumu ve sonraki sonuçlar ilerleme kaydından kontrol edilmeli.

1. npm kurulum sonucunu ve lockfile'ı kontrol et; gerekli paketleri resmi kaynaklardan doğrula.
2. Expo applicationId/name/slug, yerel KÖK açılış ekranı ve TS strict ayarlarını hazırla.
3. Android prebuild ile gerçek Gradle/AGP/SDK/NDK değerlerini kaydet.
4. Eksik araç veya SDK lisans ihtiyacı varsa kullanıcının 1.4/5.3 kurallarına göre toplu onay iste; onaysız kurma/kabul etme.
5. Faz 0 kabulünü doğrula, commit/tag; Faz 1 debug build, ADB kurulum ve Metro reverse.
6. İlk açılışı ve logcat'i kaydet; Faz 1 kullanıcı kapısında dur.

Ortam: süreç için scripts/env.ps1; kalıcı PATH/registry değiştirme. Telefon API 30 arm64; SDK C:\Android\Sdk; JDK17. PostgreSQL17 mevcut ve çalışıyor. Docker kapalı ve zorunlu değil. Sistem PowerShell politikası için sadece alt süreç Bypass kullanılır.

Doğrulama: `node scripts/inspect-design.mjs`, `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/audit-env.ps1`, mobil oluşturulduğunda npm run typecheck/lint/test ve debug build.
