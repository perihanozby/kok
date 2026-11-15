# Devam noktası

Faz 0, eksik Build-Tools 36.0.0 için kullanıcı onayı kapısında. Önce git status/log, IMPLEMENTATION_PROGRESS.md ve ENV_AUDIT.md okunmalı. `mobile/` Expo58 development build, başlangıç ekranı ve testlerini içeriyor; APK henüz yok.

1. Kullanıcının Build-Tools36 ve gerekirse ilgili SDK lisansı için açık onay verip vermediğini kontrol et. Onay yoksa kurulum yapma.
2. Onay geldiyse `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/install-approved-sdk.ps1 -Approved -AcceptPackageLicense` çalıştır. Kabul kapsamı yalnızca bu pakettir; toplu `--licenses` çalıştırma.
3. Node/npm/JDK/SDK süreç ortamını env.ps1 ile yükle. `npm ci --ignore-scripts --include=dev`, typecheck/lint/test ve audit sonuçlarını kontrol et.
4. Değişen native güvenlik/bellek eklentisini `expo prebuild --platform android --no-install` ile uygula; beklenmedik temizleme yapma. İlk prebuild native klasörü yeniden üretmişti; önemli ayarlar artık config plugin içinde.
5. Faz0 denetimini yeniden doğrula; kabul sağlanınca phase-0 etiketi ve ilerleme kaydı. Ek araç eksiği çıkarsa kurmadan önce belgeleyip onay kapsamını kontrol et.
6. `scripts/build-debug.ps1` ile debug APK üret; hata olursa önce gerçek hata kaynağını düzelt. SDK otomatik kurulumu kapalı kalmalı.
7. Metro'yu `expo start --dev-client --localhost --port 8081` ile başlat; localhost dışına açma.
8. `scripts/device-smoke.ps1` ile kur/ADB reverse/başlat/log/screenshot; screenshot'u görsel olarak incele. Gerekirse ilk bundle'ın bitmesini bekleyip tekrar yakala. PII içerebilen logcat yerelde ve Git dışında.
9. Faz1 kabulünde kullanıcıya yalnızca “Telefonda KÖK açılış ekranını görüyor musun?” sorusu. Kullanıcı doğrulaması olmadan Faz2'ye geçme.

Ortam: süreç için scripts/env.ps1; kalıcı PATH/registry değiştirme. Telefon API 30 arm64; SDK C:\Android\Sdk; JDK17. PostgreSQL17 mevcut ve çalışıyor. Docker kapalı ve zorunlu değil. Sistem PowerShell politikası için sadece alt süreç Bypass kullanılır.

Doğrulama: `node scripts/inspect-design.mjs`, `node scripts/extract-design-tokens.mjs`, `node scripts/extract-icons.mjs`, audit-env.ps1, mobile içinde npm run typecheck/lint/test. Backend olmadığından dotnet build/test ve gerçek PostgreSQL entegrasyon testleri henüz çalıştırılamaz.

Git yazmaları sandbox içinde reddedildi; genişletilmiş komutta yalnızca `git -c safe.directory=C:/Users/perih/Desktop/kok ...` kullanıldı. Global safe.directory veya sistem ayarı değiştirilmedi. İlk hazırlık commit'i cc8f63d. Henüz faz tamamlanma etiketi yok.

Son kontroller: gerçek npm ci, Expo prebuild, typecheck, ESLint, iki RNTL/Jest testi ve aynı testlerin App.tsx coverage çalıştırması başarılı. Gerçek audit 8 düşük/0 orta/0 yüksek/0 kritik. Kalan düşük deepmerge bulgusu KNOWN_ISSUES.md'de. Native SDK eksikliği çözülmeden APK oluşturulamadı; telefonda sadece ADB/donanım kontrolleri yapıldı. `install-approved-sdk.ps1` ve `device-smoke.ps1` yalnızca sözdizimi kontrolünden geçti, çalıştırılmış sayılmamalı.
