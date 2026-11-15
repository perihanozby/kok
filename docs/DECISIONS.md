# Teknik kararlar

## 2026-11-15 — Kaynak ve proje konumu

- Kullanıcının istek olarak belirttiği metin değiştirilmeden `AGENTS.md` dosyasına kopyalandı. ZIP içindeki belgeler tasarım verisi olarak ele alınır; içlerindeki talimatlar ayrıca kullanıcı isteği sayılmaz.
- Çalışma dizini mevcut yazılabilir kök `C:\Users\perih\Desktop\kok`; `C:\dev\kok` mevcut değil. İstek 5.1 başka konumun gerekçeyle kullanılmasına izin verir. İzin sınırı içinde kalmak için bu kök kullanıldı. Uzun yol sorunu çıkarsa kısa yol çözümü değerlendirilecek; kayıt defteri izinsiz değiştirilmeyecek.
- Orijinal arşiv değiştirilmedi; açılan 105 dosya salt okunur işaretlendi. SHA-256: `A55F97A81A63C7107EDD8199EFF1263F81B878741860569AE6F83FDBD5E737B5`.
- ZIP 159 giriş içeriyor; bunların 105'i dosya, kalanları dizin. Gerçek dosya sayısı istekle uyumlu: 52 HTML, 52 PNG, 1 DESIGN.md.

## 2026-11-15 — Doğrulanan sürüm kaynakları

- [Expo npm latest](https://registry.npmjs.org/expo/latest): Expo **58.0.25**, MIT; resmi Expo ekibi tarafından bakılıyor. Node gereksinimi `^22.13.0 || ^24.3.0 || ^26.0.0 || >=27.0.0`; kurulu 22.19.0 uygun.
- `npm view expo-template-blank-typescript@latest version dependencies devDependencies --json`: şablon **58.0.34** (0BSD), Expo ~58.0.25, React **19.3.0** (MIT), React Native **0.88.1** (MIT), expo-status-bar ~58.0.5 (MIT); geliştirme: TypeScript ~6.0.3 (Apache-2.0), @types/react ~19.3.0 (MIT). Paketler boş native mobil uygulamanın resmi, bakımı yapılan başlangıç bağımlılıklarıdır. Ek uygulama paketleri henüz seçilmedi; kesin çözümler lockfile'da kaydedilecek.
- [Expo uyumluluk tablosu](https://docs.expo.dev/versions/latest/): SDK 58, RN 0.88, React 19.3, minimum Android 7/API 24, compileSdk 37, targetSdk 36. Telefon API 30 ile minimumu karşılıyor.
- [Expo Android kök eklentisi](https://github.com/expo/expo/blob/sdk-58/packages/expo-modules-autolinking/android/expo-gradle-plugin/expo-autolinking-plugin/src/main/kotlin/expo/modules/plugin/ExpoRootProjectPlugin.kt): kaynak varsayılanı Build-Tools 37.0.0, NDK 27.1.12297006; kurulu. Nihai sürümler version catalog ve prebuild çıktısından doğrulanacak.
- [Expo şablon wrapper](https://github.com/expo/expo/blob/sdk-58/templates/expo-template-bare-minimum/android/gradle/wrapper/gradle-wrapper.properties): Gradle 9.4.1. Global Gradle kurulmayacak; bu kaynak bilgisi henüz derleme kanıtı değildir.
- [Microsoft destek politikası](https://dotnet.microsoft.com/en-us/platform/support/policy): .NET 10 güncel LTS. Kurulu SDK 10.0.402 kullanılacak; bağımlılık seçimi ve güncel güvenlik yaması backend fazından önce ayrıca kontrol edilecek.
- [PostgreSQL sürüm politikası](https://www.postgresql.org/support/versioning/): mevcut PostgreSQL 17 ana serisi korunacak; yeniden kurulum yapılmayacak. Yama güncelliği backend başlangıcından önce kontrol edilecek.

## 2026-11-15 — Varsayılanlar

K1 Expo development build ve yerel wrapper; K2 işlevsel YAML renkleri ve #FAF8F4 ana zemin (Faz 2 onayı beklenir); K3 beş sekme ve Ailem; K4 sade Türkçe; K5 doğrulanmamış şifreleme iddiaları yok; K6 elle transkript; K7 mevcut yerel PostgreSQL; K8 kişi tek ailede, kullanıcı çoklu ailede; K9 30 günlük yumuşak silme; K10 yerel görseller; K11 yerel çalışma ve ücretli servis yok; K12 `com.kok.dijitalailemirasi`; K13 SDK minimumu ve API 30 cihaz; K14 .NET 10 LTS. Bunlar uygulama gereksinimidir, henüz uygulanmış olduklarını göstermez.

## 2026-11-15 — Komut hataları

- İlk `git status` ve `git log`: depo henüz yoktu. Yeni yerel depo oluşturuldu; geçmişin yokluğu hata olarak gizlenmedi.
- İlk betik çalıştırma: PowerShell politikası engelledi. Kalıcı ayar yerine tek alt süreç kullanıldı.
- npm sorgusu kısıtlı ağda yanıt vermedi; resmi kayıt sorgusu genişletilmiş erişimle başarılı oldu. Paket sürümleri tahmin edilmedi.
- RN kaynak dosyası ve iki yardımcı kaynak URL'si 404 verdi; bunlar doğrulanmış sürüm kanıtı olarak kullanılmadı. Expo'nun resmi npm şablonu ve kök eklentisi esas alındı.

## 2026-11-15 — İlk mobil doğrulama ve kaynak çıkarımı

- Gerçek npm paketinden RN 0.88.1 version catalog okundu: AGP 9.2.1, minSdk 24, compileSdk 37, targetSdk 36, Build-Tools 37.0.0, NDK 27.1.12297006. Gradle yapılandırması fiilen Kotlin 2.2.10 ve KSP 2.2.10-2.0.2 seçti; katalogdaki 2.2.0 sürümünün eklenti sürümüyle aşıldığı resmi Expo eklentisi tarafından raporlandı. Bunlar APK başarısı anlamına gelmez.
- Expo prebuild'de native dizin yeniden üretilebildiğinden bellek, mimari, SDK otomatik kurulumunu kapatma ve Android güvenlik ayarları `mobile/plugins/withAndroidSafety.js` içine alındı. Yalnızca `android/gradle.properties` elle düzenlemek kalıcı çözüm değildir. İlk derleme denemesi PowerShell'in noktalı `-P` argümanını bölmesi nedeniyle durduruldu; `scripts/build-debug.ps1` içinde tüm Gradle argümanları tek tek tırnaklandı.
- Faz 1 açılış ekranı basitleştirilmiş native görünüm; final tasarım/font/logo uygulaması Faz 2'de. Hiçbir sahte içerik tarama mesajı, kalıcı örnek veri veya doğrulanmamış güvenlik iddiası eklenmedi. Geliştirme sürümü açıkça belirtiliyor.
- Paketler Expo'nun kendi uyumluluk eşlemesinden seçildi: expo-dev-client ~58.0.20 (development build), react-native-safe-area-context ~5.11.1 (gerçek sistem çubukları), jest-expo ~58.0.14/Jest ~30.5.2/@types/jest 30.0.0 (test), eslint-config-expo ~58.0.4/ESLint ^9.39.5 (statik kontrol), Prettier ^3.10.1 (format). Bunlar MIT lisanslı, kendi upstream ekiplerince bakımı yapılan araçlardır; ESLint 9 için upstream destek-sonu uyarısı geldi, Expo'nun uyumlu yapılandırması doğrulanmadan major yükseltilmedi. @testing-library/react-native 14.1.0 MIT; React >=19/RN >=0.78 gereksinimi mevcut sürümlerle uyumlu; gerçek bileşen render testi için eklendi. Geliştirme araçları devDependencies'e taşındı.
- TypeScript 6 test global türlerini kendiliğinden yüklemedi; testler açık @jest/globals importları kullanıyor. Safe-area native sağlayıcısı Jest ortamında içerik üretmedi; kütüphanenin resmi Jest mock'u kullanıldı. İki başlangıç bileşen testi, tsc ve ESLint bu düzeltmelerden sonra geçti. Native cihaz henüz doğrulanmadı.
- HTML kaynakları çalıştırılmadan AST ile veri olarak çözümlendi. @babel/parser mevcut Expo araç zincirinden kullanılır; ek bağımlılık kurulmadı. 51 HTML Tailwind config içeriyor; UI Kit config içermiyor, inline CSS ve literal renkleri ayrı saklandı. `design/tokens.json` geçici seçimdir; kontrast ve renk onayı bekliyor. 233 Material Symbols adı çıkarıldı; kod noktası/font çözümü henüz yapılmadı. UI Kit ayrıca Font Awesome kullanıyor; Faz 2'de Material Symbols eşlemesi gerekecek.

## 2026-11-15 — Güvenlik bağımlılık çözümlemesi

- İlk temel kurulumda 3 orta düzey; test araçları sonrası 30 bulgu (29 orta, 1 düşük) raporlandı. `npm audit fix --force` uygulanmadı; Expo 52/Jest 29'a gerileme önerisi seçilen SDK ile uyumu bozuyor.
- Resmi npm'den yamalı glob 14.0.6 ve minimatch 11.0.1 sürümleri doğrulandı (BlueOak-1.0.0, aktif upstream bakımı). Geçerli Node motor gereksinimleri mevcut Node22 ile uyumlu. Glob7/minimatch3 kullanan eski callable API tüketicileri korunarak yalnızca etkilenen >=9/>=7 serileri hedeflendi.
- Üç yerinde install/update denemesinde bazı iç içe kopyalar kaldı (21 bulgu). Yaklaşım değiştirildi: `.cache/dependency-resolution*` altında mevcut node_modules olmadan kilit dosyası üretildi. İki test-exclude >=7 tüketicisine özgü minimatch düzeltmesiyle aday raporda 0 orta/yüksek/kritik ve 8 düşük bulgu elde edildi. Yerinde install eski çözümlemeyi yeniden koruduğundan aktif Gradle işi bittikten sonra aday lockfile üzerinden `npm ci` ile doğrulanacak. Aday sonuç gerçek kurulum başarısı sayılmadı.
- deepmerge 4.3.1 için registry latest hâlâ etkileniyor; düşük düzey bulgu ve bağımlı paketlere yayılımı kayıtlı. Yama bulunmadan sessizce güvenli kabul edilmeyecek. Güncel gerçek rapor `docs/npm-audit.json`; aday raporlar ayrı dosyalardır.

### Sonuç

Aralık seçicili adayda npm ci lock uyumsuzluğu verdi; başarılı kurulum sayılmadı. Global glob14 düzeltmesi, eski callable API gerektiren test-exclude6 için glob7/minimatch3 istisnası ve modern minimatch tüketicilerinin kesin sürümlerine sınırlı eşlemeler kullanıldı. `npm ci --ignore-scripts --include=dev` gerçek projede başarılı oldu (1181 paket); son gerçek audit 8 düşük ve 0 orta/yüksek/kritik. İki aday rapor yalnızca araştırma kaydıdır, teslim ölçütü değildir. Kurulum sonrası Expo prebuild de bu yamalı araç zincirinde başarılı oldu. Sekiz düşük bulgu için uyumsuz Jest25'e gerileme uygulanmadı. test-exclude8 eşlemesi gelecekte aynı bağımlılık serisinin tekrar çözülmesinde koruma sağlar; mevcut 7.0.2 için ayrı kesin eşleme var.

Gerçek Gradle denemesi ek Build-Tools36.0.0 ihtiyacını kanıtladı. Root buildTools37 seçimi kütüphane modülündeki varsayılan36 gereksinimini kaldırmıyor; üçüncü taraf native sürümünü zorla değiştirmek yerine iki Build-Tools sürümünü birlikte tutma yolu seçildi. Kurulum/lisans kabulü yapılmadı; kullanıcı onayı bekleniyor. İlk hazırlıkta eksik görünmeyen bu gereksinim ENV_AUDIT C listesine eklendi.

## 2026-11-15 — Kurulum onayı, çalışma yolu ve cihaz alanı

Kullanıcı Build-Tools36.0.0 kurulumu ve gerekirse standart Android SDK lisans kabulünü açıkça onayladı; başka paket kurulmasını yasakladı. Onaylanan tek paket sdkmanager ile kuruldu; Pkg.Revision=36.0.0 doğrulandı. Diğer SDK araçları/npm paketleri kurulmadı. Derlemenin mevcut lockfile üzerinden Maven bağımlılığı çözmesi uygulama derlemesinin parçasıdır; SDK otomatik kurulumu kapalıdır.

Desktop bilinen klasör kaydı, gerçek klasör ve OneDrive kökü karşılaştırıldı; Desktop OneDrive'a yönlendirilmemiş, proje/node_modules junction değil. Mevcut klasörde devam kararı korundu. Long path veya kilit hatası çıkarsa kullanıcının bu oturumda verdiği yetki kapsamında kısa yola geçilecek; Git geçmişi korunacak ve kişisel veri silinmeyecek. Kanıtlar ENV_AUDIT.md'de.

Telefonun Android depolama düşük alan eşiği doğrudan dumpsys çıktısından alındı (500MiB). Son boş alan 1,29GiB. APK oluşmadan kesin kurulum alanı yeterli denmedi. Yeni check-device-space.ps1, iki APK kopyası + native/DEX + başlangıç payı + gerçek Android düşük alan eşiğini koruyan konservatif bütçe uygular. Fazladan native payı, APK'dan doğrudan mmap edilen kütüphaneler nedeniyle gerçek kullanımın üzerinde olabilir; hesap garanti edilmiş OS tahsisi olarak sunulmaz. Üç aritmetik sınır testi ve smoke öncesi otomatik engel eklendi.
