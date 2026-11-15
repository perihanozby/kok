# Aktif proje konumu: C:\dev\kok

Desktop klasörü korunmuş bir yedektir. Güncel geliştirme, derleme ve Git işlemleri C:\dev\kok altında yapılmalıdır. Başka SDK/npm paketi kurma; mevcut bağımlılıklar kopyalandı. Uzun yol hatası nedeniyle CMake nesne yolu sınırı 200 olarak ayarlandı. Yeni kökte debug derlemesi ve kurulum doğrulaması bekliyor.

# Devam noktası

Faz0 ortam kabulü sağlandı, Build-Tools36.0.0 açık kullanıcı onayıyla kuruldu. Faz1 debug derlemesi devam ediyor. Önce git status/log, IMPLEMENTATION_PROGRESS.md ve ENV_AUDIT.md okunmalı. Kullanıcı **başka paket kurulmasını yasakladı**; SDK otomatik indirmesini kapalı tut.

1. Aktif build/process ve docs/build-debug.local.log durumunu kontrol et; aynı derlemeyi eşzamanlı tekrar başlatma.
2. Build-Tools36 zaten kuruldu; yeniden kurma. Yeni eksik SDK ihtiyacı çıkarsa kullanıcıya bildir; onay kapsamı başka paketleri içermez.
3. Node/npm/JDK/SDK süreç ortamını env.ps1 ile yükle. `npm ci --ignore-scripts --include=dev`, typecheck/lint/test ve audit sonuçlarını kontrol et.
4. Değişen native güvenlik/bellek eklentisini `expo prebuild --platform android --no-install` ile uygula; beklenmedik temizleme yapma. İlk prebuild native klasörü yeniden üretmişti; önemli ayarlar artık config plugin içinde.
5. Desktop OneDrive'a yönlendirilmemiş; şimdilik mevcut kök korunuyor. Gerçek long-path/kilit hatası çıkarsa kullanıcının yetkisiyle kısa konuma Git geçmişini koruyarak geç. Recursive move/delete öncesi mutlak yolları doğrula, kaynak veriyi kaybetme.
6. `scripts/build-debug.ps1` ile debug APK üret; hata olursa önce gerçek hata kaynağını düzelt. SDK otomatik kurulumu kapalı kalmalı.
7. Metro'yu `expo start --dev-client --localhost --port 8081` ile başlat; localhost dışına açma.
8. APK oluşunca `scripts/check-device-space.ps1` çalıştır; JSON raporundaki gerçek APK+native+DEX boyutlarıyla konservatif bütçeyi doğrula. Yetmezse kurma; ek boşaltılacak miktarı söyle. Yeterliyse `scripts/device-smoke.ps1` ile kur/ADB reverse/başlat/log/screenshot; screenshot'u görsel incele. PII içerebilen logcat yerelde ve Git dışında.
9. Faz1 kabulünde kullanıcıya yalnızca “Telefonda KÖK açılış ekranını görüyor musun?” sorusu. Kullanıcı doğrulaması olmadan Faz2'ye geçme.

Ortam: süreç için scripts/env.ps1; kalıcı PATH/registry değiştirme. Telefon API 30 arm64; SDK C:\Android\Sdk; JDK17. PostgreSQL17 mevcut ve çalışıyor. Docker kapalı ve zorunlu değil. Sistem PowerShell politikası için sadece alt süreç Bypass kullanılır.

Doğrulama: `node scripts/inspect-design.mjs`, `node scripts/extract-design-tokens.mjs`, `node scripts/extract-icons.mjs`, audit-env.ps1, mobile içinde npm run typecheck/lint/test. Backend olmadığından dotnet build/test ve gerçek PostgreSQL entegrasyon testleri henüz çalıştırılamaz.

Git yazmaları sandbox içinde reddedildi; genişletilmiş komutta yalnızca `git -c safe.directory=C:/Users/perih/Desktop/kok ...` kullanıldı. Global safe.directory veya sistem ayarı değiştirilmedi. İlk hazırlık commit'i cc8f63d. Henüz faz tamamlanma etiketi yok.

Son kontroller: gerçek npm ci, Expo prebuild, typecheck, ESLint, iki RNTL/Jest testi ve aynı testlerin App.tsx coverage çalıştırması başarılı. Gerçek audit 8 düşük/0 orta/0 yüksek/0 kritik. Kalan düşük deepmerge bulgusu KNOWN_ISSUES.md'de. Native SDK eksikliği çözülmeden APK oluşturulamadı; telefonda sadece ADB/donanım kontrolleri yapıldı. `install-approved-sdk.ps1` ve `device-smoke.ps1` yalnızca sözdizimi kontrolünden geçti, çalıştırılmış sayılmamalı.
