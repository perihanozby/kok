# Uygulama ilerlemesi

FAZ/OTURUM: Faz 0 — devam ediyor. TARİH: 2026-11-15.

Tamamlanan işler: istek bütünü okundu ve AGENTS.md olarak korundu; boş çalışma dizini ve alternatif kök kontrol edildi; yerel Git başlatıldı; ortam ve bağlı telefon denetlendi; ZIP 105 dosya olarak açıldı ve salt okunur korundu; 52 HTML/PNG çifti betikle doğrulandı; resmi Expo sürümleri araştırıldı; TypeScript şablonu açıldı.

Değiştirilen dosyalar: AGENTS.md, temel depo ayarları, scripts/audit-env.ps1, scripts/env.ps1, scripts/inspect-design.mjs, docs belgeleri, design/source-index.json, mobile resmi şablonu.

Önemli komutlar: audit-env.ps1; adb devices/getprop/get-state; psql --version; pg_isready; npm view; npm pack; node scripts/inspect-design.mjs; git init.

Başarılı kontroller: 52 PNG imzası ve HTML dosyası, 52 çift sayısı; JDK 17; API/ABI; üç USB kararlılık sorgusu. Bunlar uygulama birim testleri değildir.

Başarısız/atlanan testler: ilk PowerShell execution policy, kısıtlı CIM/ADB/ağ erişimi hata verdi; süreç kapsamlı ve genişletilmiş salt okunur kontrollerle çözüldü. Uygulama testleri ve derleme henüz çalıştırılmadı.

Cihazda DOĞRULANANLAR: yalnızca ANDROID_TEST_REPORT.md içindeki donanım/ADB kontrolleri.

Cihazda DOĞRULANMAYANLAR: bütün uygulama davranışları ve APK.

Bilinen sorunlar: KNOWN_ISSUES.md.

Sonraki adım: Expo bağımlılıklarını çözümle; gerçek Android prebuild sürümlerini kontrol et; ek araç gerekirse toplu onay iste; Faz 0 kabulünden sonra ilk debug APK.

Kullanıcı onayı: şu an zorunlu eksik araç saptanmadı; herhangi bir lisans kabulü veya sistem değişikliği yapılmadı. Faz 1 sonunda telefondaki açılış ekranı kullanıcı doğrulaması gerekecek.
