# KÖK — Dijital Aile Mirası

Android için Expo/React Native mobil uygulaması ve .NET/PostgreSQL arka ucu. Proje hazırlık aşamasındadır; teslim edilmiş uygulama veya doğrulanmış APK henüz yoktur.

İstek ve faz kuralları: [AGENTS.md](AGENTS.md). Gerçek ilerleme: [docs/IMPLEMENTATION_PROGRESS.md](docs/IMPLEMENTATION_PROGRESS.md). Ortam: [docs/ENV_AUDIT.md](docs/ENV_AUDIT.md).

Çalışma dizini `C:\Users\perih\Desktop\kok`. Ortam değişkenleri `scripts/env.ps1` ile yalnızca süreç için ayarlanır. PowerShell betikleri mevcut sistem politikası nedeniyle `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/<betik>.ps1` biçiminde çalıştırılır; kalıcı execution policy değiştirilmez.

Tasarım kaynağı `design/stitch-original/` altında salt okunur yerel kopyadır; Git dışında tutulur. `node scripts/inspect-design.mjs`, 52 HTML/PNG çiftini doğrular ve yapısal dizini yeniden üretir. Tam görsel inceleme henüz yapılmadı.
