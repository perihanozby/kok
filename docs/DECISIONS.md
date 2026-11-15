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
