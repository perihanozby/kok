# Ortam denetimi

Tarih: 15 Kasım 2026, Europe/Istanbul. Betik: `scripts/audit-env.ps1`. Yerel ayrıntılı çıktı: `docs/audit-env.raw.txt` (cihaz kimliği ve yerel yollar içerdiğinden Git dışında).

## A — Hazır olduğu doğrulananlar

| Araç / donanım | Kanıt |
|---|---|
| Windows | Windows 11 Pro x64, 10.0.26200 |
| CPU / RAM | Intel i5-10210U; 4 çekirdek / 8 mantıksal işlemci; yaklaşık 7,8 GiB RAM |
| Disk | C: yaklaşık 53,2 GiB boş (ilk ölçüm) |
| Node / npm | 22.19.0 / 10.9.3 |
| Git | 2.51.0.windows.1 |
| Java / javac | Temurin 17.0.21, her ikisi de başarılı |
| .NET SDK | 10.0.402 (ayrıca 8.0.413, 9.0.305); .NET 10 runtime 10.0.13 |
| PostgreSQL | 17.6; `postgresql-x64-17` Running; localhost:5432 accepting connections |
| VS Code | 1.146.0 |
| Android SDK | `C:\Android\Sdk`; Platform 35 ve 37.0; Build-Tools 35.0.0 ve 37.0.0; NDK 27.1.12297006; CMake 3.22.1; command-line tools latest |
| ADB | 1.0.41; platform-tools 37.0.1 |
| Telefon | Redmi Note 9S; Android 11 / API 30 / arm64-v8a; `device`; art arda üç `get-state` başarılı |
| Telefon donanımı | Mikrofon mevcut; 1080×2400 px; yoğunluk 440 dpi |
| Telefon depolaması | `/data` 1.296.704 KiB boş; %99 dolu. Uygulama/medya testleri sırasında izlenecek. |

## B — Ek doğrulama / sınırlamalar

- `LongPathsEnabled=0`; değiştirilmedi. Yerel derlemede uzun yol davranışı kanıtlanacak.
- `JAVA_HOME`, `ANDROID_HOME`, `ANDROID_SDK_ROOT` ayarlı değil; mevcut yolları kullanan süreç kapsamlı `scripts/env.ps1` hazırlandı.
- Docker istemcisi kurulu (29.1.3), servis durmuş; engine erişilemiyor. K7 uyarınca mevcut PostgreSQL kullanılacak; Docker kurulmayacak.
- PostgreSQL servisinin hazır olması, uygulama için kimliği doğrulanmış bağlantı veya test veritabanı oluşturulduğu anlamına gelmez. Kimlik bilgileri okunmadı, veri değiştirilmedi.
- Android platform klasörü `android-37.0`; Expo compileSdk=37 ile gerçek çözümlemesi henüz Gradle üzerinden doğrulanmadı.
- Expo şablonu npm kaynağından doğrulandı; gerçek prebuild çıktısındaki AGP/Gradle/SDK/NDK uyumu kontrol edilecek.
- Bilgisayarda ilk ölçümde yalnızca yaklaşık 0,82 GiB RAM boştu. Gradle tek worker ile başlayacak; derleme kapasitesi henüz kanıtlanmadı.
- 8081 portunda dinleyici bulunmadı.
- İlk kısıtlı denemede CIM ve ADB erişim hatası verdi. Aynı salt okunur kontroller genişletilmiş erişimle başarılı oldu; bu hatalar araç eksikliği olarak sayılmadı.
- PowerShell script execution varsayılan olarak engelli. Yalnızca alt süreçte `-ExecutionPolicy Bypass` kullanıldı.
- Winget yolu mevcut; kısıtlı süreçte başlatılamadı. Kurulum gerekmediğinden bu yardımcı araç zorunlu kabul edilmedi.

## C — Eksik / uyumsuz araç kurulum listesi

Mevcut kanıtla zorunlu eksik araç saptanmadı. Sistem kurulumu veya SDK lisans kabulü yapılmadı. Prebuild/Gradle incelemesi ek araç gereksinimi gösterirse sürümü ve gerekçesiyle tek toplu onay istenecek.

Faz 0 henüz tamamlanmadı: üretilmiş Android projesinin uyumu ve ilk APK yolu doğrulaması bekliyor. Mobil ve backend testleri henüz mevcut değil.
