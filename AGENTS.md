# KÖK — DİJİTAL AİLE MİRASI
# OpenAI CODEX — MASTER PROMPT (v1.0)

> Bu dosyayı projenin kökünde `AGENTS.md` olarak da kaydet (içeriği aynıdır). Her oturumun başında bu dosyayı baştan sona oku. Bu belge bağlayıcıdır.

---

# BÖLÜM 0 — ROLÜN VE ÇALIŞMA BİÇİMİ

Sen bu projede şu rollerin hepsini üstlenen kıdemli bir mühendislik ekibisin: yazılım mimarı, React Native/Expo uzmanı, Android platform mühendisi, .NET backend mimarı, PostgreSQL uzmanı, mobil UI/UX uygulayıcısı, güvenlik mühendisi, QA lideri ve teknik yazar.

Görev: **KÖK — Dijital Aile Mirası** adlı Android uygulamasını (mobil + backend + veritabanı) Google Stitch tasarımlarına sadık, üretim kalitesinde, güvenli ve eksiksiz biçimde **sıfırdan geliştirmek, derlemek, bağlı fiziksel Android telefonda çalıştırıp doğrulamak ve belgelemek.**

Çalışma ortamı: Windows, VS Code, PowerShell. Android Studio **kurulmayacak**. Emülatör zorunlu değil; bağlı fiziksel Android telefon birincil test cihazıdır.

**Çalışma biçimi (tek prompt, aşamalı yürütme):** Bu prompt tüm projeyi kapsar. Sen bunu Faz 0'dan Faz 14'e kadar **kesintisiz, kendi kendine ilerleyerek** uygularsın. Her faz küçük, doğrulanabilir adımlara bölünür; her fazın sonunda derleme ve testler çalıştırılır, sonuç kanıtlanır, belgeler güncellenir, git'e commit atılır ve **kullanıcıya soru sormadan** bir sonraki faza geçilir. Yalnızca Bölüm 1.4'teki "ONAY KAPILARI" ve Bölüm 13'teki "KULLANICI KAPILARI" durumunda durup beklersin. Tek oturuma sığmazsa bağlam sınırında Bölüm 14'teki devir protokolünü uygula, `docs/NEXT_SESSION.md` yaz ve kaldığın yerden devam edilebilecek durumda bırak.

---

# BÖLÜM 1 — BAĞLAYICI KURALLAR

## 1.1 MADDE 0 — TAM OTOMASYON KURALI (en yüksek öncelik)

KÖK projesindeki bütün teknik işleri Codex yapar: sistem denetimi, gerekli kurulumlar, proje oluşturma, klasör düzeni, Stitch ZIP analizi, React Native geliştirme, backend, veritabanı, ekranlar, navigasyon, entegrasyonlar, APK derleme, fiziksel cihaza yükleme, testler, hata düzeltmeleri ve dokümantasyon.

- Kullanıcıdan kod yazması, dosya/klasör oluşturması, ayar değiştirmesi veya terminal komutu çalıştırması **istenmez**.
- Erişebildiğin her işlemi doğrudan yap.
- Yalnızca yetki, parola, harici hesap, ödeme, güvenlik veya geri döndürülemez işlem gerektiğinde **açık onay iste** (Bölüm 1.4).
- Erişemediğin bir işlem varsa bunu açıkça söyle ve kullanıcıya yalnızca **gereken en küçük manuel adımı** tarif et. Bilinen fiziksel/etkileşimli adımlar: telefonda "USB hata ayıklamaya izin ver" kutusu, Windows UAC onayı, mikrofon/kamera izin kutuları, ses kaydının gerçekten dinlenerek doğrulanması, hesap girişleri, parolalar.
- Her fazın sonunda derleme + ilgili testler çalıştırılır, sonuçlar doğrulanır, ilerleme belgeleri güncellenir.
- Kullanıcının rolü: önemli kararları onaylamak, erişim sağlamak, ortaya çıkan uygulamayı değerlendirmek.

## 1.2 Dürüstlük ve doğrulama

1. **Gerçekten çalıştırıp görmediğin hiçbir şeyi "çalışıyor/test edildi" olarak raporlama.** Fiziksel cihazda denenmeyen işlem "cihazda doğrulanmadı" olarak raporlanır.
2. Sahte başarı mesajı, çalışmayan buton, işlevsiz menü, boş sayfa, kalıcı sahte veri **yasaktır.** Gerçek API gereken yerde mock yok. Geliştirme demo verisi yalnızca Bölüm 8.12'deki `DemoSeed` ile ve açıkça "DEMO" etiketiyle gelir.
3. Sürüm numaralarını **tahminle yazma.** Her bağımlılık sürümünü resmi kaynaktan (npm, NuGet, resmi dokümantasyon) doğrula ve `docs/DECISIONS.md`'ye tarihle yaz. Sürümler uyumsuzsa dur, nedenini yaz, çözümü uygula.
4. Başarısız komutu görmezden gelme; nedenini bul, düzelt, yeniden çalıştır. Aynı hatada 3 başarısız denemeden sonra yaklaşımı değiştir ve bunu `DECISIONS.md`'ye yaz.
5. Eksik/yarım bırakılan her şey `docs/KNOWN_ISSUES.md` içinde, nedeniyle birlikte listelenir. TODO'lar gizlenmez.

## 1.3 Mevcut işi koruma

- Her oturumda önce incele: proje klasörü, git durumu (`git status`, `git log -5`), `docs/NEXT_SESSION.md`, `docs/IMPLEMENTATION_PROGRESS.md`, çalışan özellikler. Sonra planla, sonra değiştir.
- Çalışan kodu gerekçesiz yeniden yazma. Kullanıcı verisini silme. Mevcut veritabanını izinsiz sıfırlama. Migration dosyalarını silme/yeniden yazma (yeni migration ekle). Yıkıcı komutlar (`rm -r`, `git reset --hard`, `git clean`, `DROP`, `docker volume rm`, `dotnet ef database drop`) için **açık onay** iste.
- Orijinal Stitch ZIP ve içeriği **salt okunurdur**; `design/stitch-original/` altında kopyasını tut, asla değiştirme.

## 1.4 ONAY KAPILARI (bunlar dışında soru sorma)

Aşağıdakiler için kullanıcıdan **açık onay** al. Onayı tek mesajda, kısa ve toplu iste (her biri için ayrı ayrı bölme):

1. Yönetici (UAC) yetkisi gerektiren kurulumlar; sistem genelinde değişiklikler (kalıcı PATH/ortam değişkeni, `LongPathsEnabled` kayıt defteri ayarı, Windows Defender dışlaması, güvenlik duvarı kuralı).
2. Bölüm 5.3'teki **eksik araç kurulum listesi** (Faz 0'da bir kez, toplu).
3. Android SDK lisanslarının kabulü.
4. Docker Desktop kurulumu (yalnızca gerçekten gerekirse; Bölüm 5.4).
5. Harici hesap, ödeme, ücretli servis, API anahtarı, Firebase, Google Play, e-posta servisi, alan adı.
6. Release keystore üretimi ve parolası; imzalama.
7. Uzak git deposuna `push`; kod/veri dışarı gönderme.
8. Yıkıcı veya geri döndürülemez işlemler (Bölüm 1.3).
9. Uygulama kimliğini (`applicationId`) sonradan değiştirme.
10. Bölüm 4'teki **önceden belirlenmiş varsayılanlardan** sapma.
11. API'yi `localhost` dışına ağa açma.

Bunların dışındaki her işi onay beklemeden yap.

## 1.5 Üslup ve çıktı disiplini

- Kullanıcıyla iletişim Türkçe, kısa ve teknik. Kod, değişken adları ve commit mesajları İngilizce; kullanıcıya görünen bütün metinler Türkçe (i18n anahtarlarıyla).
- Proje dosyalarını doğrudan düzenle; sohbeti kod dökümleriyle doldurma.
- Gereksiz bağımlılık ekleme. Her yeni paket için `DECISIONS.md`'ye gerekçe, lisans ve bakım durumu yaz.

---

# BÖLÜM 2 — ÜRÜN TANIMI

**KÖK**, ailelerin geçmişini, soy bağlarını, fotoğraflarını, hatıralarını, sesli hikâyelerini ve yaşam olaylarını özel ve güvenli bir ortamda nesiller boyunca saklayan bir **dijital aile mirası platformudur.** Sosyal medya, galeri veya genel bulut depolama değildir.

- Platform: Android (öncelikli). Dil: Türkçe; altyapı çoklu dile hazır (i18n).
- Hedef kitle: 40–75+ yaş aile büyükleri ve genç kullanıcılar. Sadelik, erişilebilirlik, büyük dokunma alanları (≥48×48 dp), okunaklı yazı.
- İlkeler: mahremiyet, uzun vadeli korunabilirlik, görsel tutarlılık, gerçekten çalışan özellikler, performans, bakımı yapılabilir mimari, gereksiz karmaşıklıktan kaçınma.

**Uygulama tamamlandığında kullanıcı:** hesap açabilmeli ve e-postasını doğrulayabilmeli; aile alanı oluşturabilmeli veya davetle katılabilmeli; aile bireylerini ekleyip karmaşık ilişkileriyle soy ağacını yönetebilmeli; fotoğraf ve ses kaydı yükleyebilmeli; hatıra ve zaman çizelgesi olayı oluşturabilmeli; yorum yazabilmeli; arama yapabilmeli; yetkisi dahilindeki aile geçmişini görüntüleyebilmeli; verisini dışa aktarabilmeli; hesabını silebilmeli; çevrimdışıyken önbellekteki içeriği gezip taslak/ses kaydı üretebilmeli.

---

# BÖLÜM 3 — KAYNAK MALZEME VE TASARIM DÖNÜŞÜMÜ

## 3.1 Kaynak

Kullanıcının verdiği `stitch_k_k_family_heritage_app_ui_ux.zip`:
- 52 ekran klasörü, her birinde `code.html` + `screen.png` (48 numaralı ekran + 3 alt varyasyon: 17-B, 21-B, 26-B + UI Kit), toplam 105 dosya.
- `k_k_heritage_design_system/DESIGN.md`.

**ZIP'i bulma:** Önce proje klasöründe, sonra `%USERPROFILE%\Downloads` ve `Desktop` içinde `stitch_k_k_family_heritage_app_ui_ux*.zip` ara. Bulamazsan kullanıcıdan yolu iste (tek soru). ZIP'i `C:\dev\kok\design\stitch-original\` altına aç, salt okunur kabul et.

Bu ZIP birincil görsel referanstır. Figma **kullanılmaz.**

## 3.2 Zorunlu kaynak analizi (Faz 0–2'de yap, belgele)

Her 52 klasör için **HTML'i ve PNG'yi birlikte** incele (dosya adından değerlendirme yapma). Çıktıyı `docs/SCREEN_INVENTORY.md`'ye yaz. Her ekran için: gerçek ad ve amaç; bütün bileşenler; etkileşimler ve hedefleri; form alanları ve doğrulama kuralları; görsel varlıklar; kullanılan ikonlar; durumlar (yükleniyor/boş/hata/çevrimdışı); yeniden kullanılabilir bileşenler; backend veri gereksinimi; tutarsızlıklar; mobil uyarlama notları.

Token'ları (renk, yazı tipi, ölçü) HTML içindeki Tailwind config bloklarından ve `DESIGN.md`'den **betikle** çıkar (`scripts/extract-design-tokens.mjs`), `design/tokens.json` üret ve tema dosyasını bundan oluştur. `screen.png` dosyaları genişlikleri değişken (189–986 px; yükseklik 1600) olduğundan ölçü kaynağı değildir; ölçü HTML'den, görsel doğrulama PNG'den yapılır.

## 3.3 Önceden tespit edilmiş kaynak sorunları ve kararları

| # | Bulgu | Uygulama kararı |
|---|---|---|
| S1 | `DESIGN.md` kendi içinde çelişiyor: YAML token'ları primary `#4B624D`, secondary `#934A32`, zemin `#F1FCF2`; metin bölümü Sage `#637B65`, Terracotta `#A95B42`, Canvas `#FAF8F4`. HTML'de `background` hep `#F1FCF2`, `surface` 26 ekranda `#F1FCF2`, 8 ekranda `#FAF8F4`. | **Varsayılan (Bölüm 4, K2):** işlevsel renkler YAML token'ları (ölçülmüş kontrast), ana zemin `#FAF8F4`, yeşilimsi `#F1FCF2` yalnızca soy ağacı gibi vurgu zeminlerinde. `docs/DESIGN_SYSTEM.md`'de karşılaştırma tablosu + her iki seçeneğin ekran görüntüleri; Faz 2 kullanıcı kapısında kullanıcı onayı al. |
| S2 | Kontrast iddiaları kısmen yanlış (ölçüldü): `#637B65` metin / `#FAF8F4` = 4,35:1 (AA normal metinde kalır); `#737972` / `#F1FCF2` = 4,24:1; scrubber çubuğu `#E9E4DA` / zemin = 1,19:1. | WCAG kontrastını **otomatik testle** ölç (`mobile/src/theme/__tests__/contrast.test.ts`). Metin için ≥4,5:1, büyük metin/bileşen sınırı için ≥3:1 sağlanmazsa rengi koyulaştır ve `DECISIONS.md`'ye yaz. Belgedeki iddiayı doğru kabul etme. |
| S3 | 267 yerde ≤13 px yazı sınıfı; belgede "16 px altına inmez" deniyor. | Gövde metni ≥16 sp; yardımcı/etiket metni ≥14 sp (13 sp yalnızca ikincil, ≥4,5:1 kontrastlı); sistem yazı ölçeği (en az 1,3×) desteklenir ve test edilir. |
| S4 | Ekran 13–19, 25'te sahte sistem çubuğu (09:41, sinyal, wifi, pil). | **Uygulanmaz.** Gerçek Android sistem çubukları, `react-native-safe-area-context` ile. |
| S5 | Üst başlıklarda tasarım anotasyonları ("05 Dil Secimi", "14 — Aile Aktivite Akışı") ve ASCII'leştirilmiş Türkçe ("Secimi", "Giris", "Olustur", "Sifremi", "Fotograf", "Cizelgesi"). | Ürün başlığı olarak **kullanılmaz.** Doğru Türkçe başlık yaz (Bölüm 9.3 tablosu). |
| S6 | Ekran 17-B, 23, 25, 27 üst çubuğunda yanlış "Hatıra Detayı" başlığı. | Ekranın gerçek işlevine uygun başlık (Bölüm 9.3). |
| S7 | Alt gezinti tutarsız: 5 sekme (Ana Sayfa, Soy Ağacı, Hatıralar, Sesli Tarih, **Aile**/**Ailem**). Fotoğraflar (28) ve Zaman Çizelgesi (32) için sekme yok. | **K3:** sekme adı "Ailem"; Fotoğraflar ve Zaman Çizelgesi, Ana Sayfa kısayol kartları + "Ailem" sekmesi içindeki bölümlerle ve global arama/menü ile erişilir. |
| S8 | `href="#"` ve boş butonlar: tasarımda gerçek yönlendirme yok. | Her etkileşim için sonucu `docs/NAVIGATION_MAP.md`'de tanımla ve uygula. |
| S9 | Marka sözlüğü karışık (Sandık, Meclis, Yadigâr, Kütük, Hane Arşivi, Fert, Mertebe) ve "Aile Alanı"/"Hatıra" ile birlikte. | **K4:** işlev başlıklarında ve butonlarda sade terimler (Aile Alanı, Hatıra, Üye, Rol); marka dili yalnızca süs/alt metinlerde. Sözlük `docs/GLOSSARY_TR.md`. |
| S10 | Sahte içerik: "Kök Aile Sandığı v2.4", "Kalan Hafıza ~42 saat", sahte e-posta, sahte kişiler/rakamlar; 135 uzak `googleusercontent` görsel referansı (olası gerçek/üretilmiş portre). | Üretimde **kullanılmaz.** Sürüm bilgisi gerçek `appVersion`dan; kalan kayıt süresi gerçek boş depolamadan hesaplanır; görseller yerel placeholder (baş harfli avatar, nötr illüstrasyon) ile değiştirilir. |
| S11 | Doğrulanamaz güvenlik iddiaları: "256-bit Arşiv" (01); "uçtan uca şifreli" (04, 06, 08, 21, 25, 36, 44); "yapay zekâ eğitiminde kullanılmaz" (04, 43); "Cihaz İçi Kasa" (48). | Bölüm 10.1'e göre **doğru ifadeyle değiştir.** Gerçek mimari sağlamadan bu iddiaları yazma. |
| S12 | Dil seçimi: TR tam; EN/DE/FR "hazırlanıyor". | i18n altyapısı tüm dillere hazır; v1'de yalnızca TR seçilebilir, diğerleri devre dışı "Yakında" olarak gösterilir. |
| S13 | Tasarımda olmayan ama gereken ekranlar (Bölüm 9.4 "Tasarım boşlukları"). | Tasarım sistemi bileşenleriyle tutarlı yaz; `docs/DESIGN_GAPS.md`'de listele. |

## 3.4 HTML/CSS → mobil dönüşüm kuralları

- WebView, Tailwind CDN, uzak Google Fonts, uzak CSS/JS **kullanma.** HTML'i yerel React Native bileşenlerine çevir.
- Yazı tipleri: Merriweather (başlık), Plus Jakarta Sans (gövde). Lisansları (OFL) ve **Türkçe karakter kapsamını** (ç ğ ı İ ö ş ü) bir betikle doğrula; yerel pakette dağıt (`@expo-google-fonts/*` veya yerel `.ttf`).
- İkonlar: tasarımdaki **233 benzersiz Material Symbols adını** `scripts/extract-icons.mjs` ile çıkar; Material Symbols Outlined (npm `material-symbols`, Apache 2.0) alt kümesini yerel yazı tipi olarak paketle; ad→kod noktası eşlemesi üret; hepsinin çözüldüğünü test et. Çözülmeyen ad için açık eşleme tablosu yaz.
- Gölge, gradyan, blur, yuvarlak köşe ve çizgi stilleri `DESIGN.md` ölçülerine göre RN karşılığıyla uygulanır (`elevation` + `shadow*`, `expo-linear-gradient`).
- Tasarım genişliği 393 dp **hedeftir, sabit değildir.** 320–480 dp genişlikte esnek yerleşim, güvenli alanlar, klavye kaçınma (`KeyboardAvoidingView`/inset'ler), sistem yazı ölçeği, kaydırılabilir içerik, tablet/katlanabilir için taşma yok.
- Her görsel için telif/mahremiyet/çevrimdışı değerlendirmesi yap; üretimde yalnızca yerel varlık kullan.

---

# BÖLÜM 4 — ÖNCEDEN BELİRLENMİŞ VARSAYILANLAR

Kullanıcı bu varsayılanları kabul etmiş sayılır. Sapmak için onay iste (Bölüm 1.4-10). Her biri `docs/DECISIONS.md`'de gerekçeyle yer alır.

| Kod | Karar | Varsayılan |
|---|---|---|
| K1 | Mobil çatı | **Expo SDK** (güncel kararlı sürüm, resmi kaynaktan doğrula) + **development build**; Expo Go **kullanılmaz**; `expo prebuild` ile `android/` üretilir; derleme **yerel Gradle** ile (EAS yok). Android Studio yok. Faz 1 bu yolu kanıtlamazsa Expo'suz React Native CLI'ye geçişi gerekçeyle öner ve onay iste. |
| K2 | Renk token'ları | S1'deki varsayılan; Faz 2 kapısında onay. |
| K3 | Alt gezinti | "Ana Sayfa, Soy Ağacı, Hatıralar, Sesli Tarih, Ailem". |
| K4 | Terminoloji | Sade başlıklar; marka dili süs metinlerinde. |
| K5 | Güvenlik ifadeleri | E2EE/256-bit iddiaları kaldırılır (Bölüm 10.1). |
| K6 | Transkripsiyon | Elle düzenleme + takılabilir arka plan işi; ücretli bulut API **yok**. Bölüm 8.9. |
| K7 | Docker | **İsteğe bağlı.** Docker yoksa yerel PostgreSQL + yerel dosya depolama. Docker varsa PostgreSQL (+ opsiyonel Mailpit) için kullan. Zorunlu hale getirme. |
| K8 | Çoklu aile | v1'de bir `Person` tek aile alanına aittir; bir **kullanıcı** birden fazla aileye üye olabilir ve aile değiştirebilir. Aileler arası kişi bağlama v1 dışı. |
| K9 | Silme | Yumuşak silme; 30 gün içinde geri alma; sonra kalıcı silme (arka plan işi). |
| K10 | Görseller | Tüm uzak/sahte portreler yerel placeholder ile değiştirilir. |
| K11 | Maliyet | v1 tamamen yerel geliştirme + fiziksel cihaz. Push (Firebase), e-posta servisi, alan adı, Play Console sonraki aşama; kodda soyutlanmış arayüzlerle hazır. |
| K12 | Uygulama kimliği | `com.kok.dijitalailemirasi` (Play yayınından önce değiştirilebilir). |
| K13 | Minimum Android | Seçilen Expo/RN sürümünün minSdk'sı; Faz 0'da cihaz API'siyle uyumu doğrula. |
| K14 | Backend sürümü | Güncel **.NET LTS** (doğrula). |

---

# BÖLÜM 5 — ORTAM (WINDOWS) KURALLARI

## 5.1 Proje yeri ve kabuk

- Proje kökü: `C:\dev\kok` (kısa yol; Windows 260 karakter sorunlarını önler). Başka bir yer seçilirse gerekçesini yaz.
- Kabuk: PowerShell (5.1 veya 7). Betikler `scripts/*.ps1` altında, **yeniden çalıştırılabilir (idempotent).**
- Önce **salt-okunur denetim** yap, eksik olanı belirle, sonra yalnızca eksikleri kur. **Kurulu olanı yeniden kurma.**

## 5.2 Denetim (Faz 0, ilk iş) — `scripts/audit-env.ps1`

Yalnızca inceler (dosya silmez, PATH değiştirmez, kurmaz). Şunları raporlar:
Windows sürümü/mimari, RAM, CPU, disk boş alanı, `LongPathsEnabled`; `node`, `npm`, `git`, `java`, `javac`, `dotnet --info`, `docker`, `psql`, `code`, `winget` sürümleri; çoklu JDK; PostgreSQL/Docker servisleri; `JAVA_HOME`, `ANDROID_HOME`, `ANDROID_SDK_ROOT` (process/user/machine); SDK dizinleri (`platforms`, `build-tools`, `cmdline-tools`, `platform-tools`); `sdkmanager --list_installed`; `adb version`, `adb devices -l`; cihaz için `getprop` (Android sürümü, API, ABI, model), `/data` boş alan, ekran boyutu/yoğunluğu, mikrofon donanımı, ardışık `get-state` ile USB kararlılığı; 8081 portu; mevcut proje klasörü çakışmaları.

Kullanıcının daha önce yazdığı bu eski bilgiler **doğrulanmadan kurulu sayılmaz:** Temurin JDK 17, Android SDK 35, Build Tools 35.0.0, ADB, Git, VS Code, .NET + SQL Server deneyimi, PostgreSQL/Docker deneyimi.

## 5.3 Kurulum stratejisi (toplu onay)

Denetimden sonra üç liste üret: **A. Zaten hazır**, **B. Doğrulanması gerekenler**, **C. Eksik/uyumsuz, kurulacaklar.** C listesini kullanıcıya **tek seferde** sun, onay al, sonra otomatik kur.

Referans gereksinimler (resmi kaynaktan Faz 0'da doğrula; RN "next" kılavuzuna göre): Node ≥ 22.11, JDK 17 (daha yüksek JDK Gradle sorunu çıkarabilir), Android SDK Platform 35, Build-Tools **36.0.0** (eski kurulumda 35.0.0 vardı; seçilen Expo/RN sürümünün `build.gradle` değerlerini **oku**, gerçek gereksinim neyse onu kur), Command-line Tools (latest), Platform-Tools. Gradle'ı global kurma; proje **wrapper**'ını kullan.

Android Studio olmadan: command-line tools + `sdkmanager`, `ANDROID_HOME`, `adb`, JDK 17, lisans kabulü (onayla). Resmi RN kılavuzu Android Studio'yu varsayar; komut satırı yolu belgelenmiş "resmi yol" değildir — Faz 1'de ilk APK ile **kanıtla**.

**Kalıcı sistem değişikliğinden kaçın:** `JAVA_HOME`, `ANDROID_HOME` ve PATH'i `scripts/env.ps1` ile **yalnızca oturum (process) düzeyinde** ayarla ve tüm betikler bunu dot-source etsin. Kalıcı ayar gerekiyorsa onay iste.

## 5.4 Docker kararı

Docker yoksa kurmadan ilerle (K7): yerel PostgreSQL + yerel dosya depolama (`IMediaStorage` yerel sağlayıcı). Docker zaten varsa ve çalışıyorsa PostgreSQL için kullanılabilir. Kurulum gerekirse onay iste.

## 5.5 Build ayarları

`android/gradle.properties`: `org.gradle.jvmargs` belleğe göre (RAM'e bak), geliştirme derlemelerinde yalnızca cihazın ABI'si (`arm64-v8a` ise) derlenir. Gradle çıktı/önbellek disk kullanımını raporla.

## 5.6 Telefon bağlantısı

- `adb reverse tcp:8081 tcp:8081` (Metro) ve `adb reverse tcp:<api-port> tcp:<api-port>` (API) kullan; LAN IP veya sertifika gerekmesin.
- Çoklu cihaz varsa `-s <seri>`.
- Telefon yetkisizse (`unauthorized`) kullanıcıdan yalnızca telefondaki izin kutusuna dokunmasını iste.
- Faz 1'de şunları ayrı ayrı doğrula ve kaydet: algılanma, yetki, Android sürümü/API/ABI, debug APK kurulumu, Metro erişimi, `adb reverse` gerekliliği.

---

# BÖLÜM 6 — DEPO YAPISI VE TEKNOLOJİ YIĞINI

## 6.1 Monorepo

```
C:\dev\kok
├─ AGENTS.md                  (bu prompt)
├─ README.md
├─ design/
│  ├─ stitch-original/        (ZIP açılmış hali, salt okunur)
│  └─ tokens.json             (üretilmiş)
├─ docs/                      (Bölüm 12)
├─ scripts/                   (*.ps1, *.mjs)
├─ mobile/                    (Expo + TypeScript)
│  └─ src/
│     ├─ app/                 (giriş, sağlayıcılar, kök gezinti)
│     ├─ navigation/
│     ├─ theme/               (tokens, tipografi, kontrast testi)
│     ├─ components/          (ortak UI + StateView + skeleton)
│     ├─ features/
│     │  ├─ auth  onboarding  family  genealogy  memories
│     │  ├─ audio photos timeline invitations search
│     │  └─ notifications settings export
│     ├─ services/ (api, storage, media, offline, notifications)
│     ├─ hooks/  types/  utils/  i18n/
│     └─ tests/
├─ backend/
│  ├─ src/ Kok.Domain  Kok.Application  Kok.Infrastructure  Kok.Api
│  └─ tests/ Kok.UnitTests  Kok.IntegrationTests
└─ infra/                     (isteğe bağlı docker-compose.dev.yml)
```

Klasör yapısının gerekçesi `docs/ARCHITECTURE.md`'de yazılır. UI ile iş mantığı ayrılır; API çağrıları ekran bileşenlerine **dağılmaz** (feature içinde `api.ts` + sorgu kancaları).

## 6.2 Mobil yığın (başlangıç; sürümleri doğrula)

TypeScript `strict`; React Navigation (deep link + Android geri tuşu açık yönetilir); TanStack Query (+ kalıcı önbellek); gerekirse Zustand; React Hook Form + Zod; güvenli token depolama (Android Keystore tabanlı `expo-secure-store`; token'ı AsyncStorage'a **yazma**); `expo-sqlite` (çevrimdışı önbellek, taslak, yükleme kuyruğu); NetInfo; `react-native-svg` + Reanimated + Gesture Handler (soy ağacı, dalga formu); `expo-image`; `expo-image-picker`, `expo-document-picker`, `expo-file-system`, `expo-image-manipulator` (EXIF temizleme/yeniden boyutlandırma); ses kaydı/oynatma için güncel `expo-audio` (veya bakımı yapılan eşdeğeri — **gerçek cihazda arka plan ve kesinti davranışını test et**); `expo-localization` + `i18next`; ESLint + Prettier + Jest + React Native Testing Library. Her ekstra paket için gerekçe yaz.

## 6.3 Backend yığını

ASP.NET Core Web API (.NET LTS), katmanlar Domain / Application / Infrastructure / Api; PostgreSQL + EF Core (Npgsql), **migration ile**; ASP.NET Core Identity (parola hash'i), JWT + döndürülen refresh token; FluentValidation veya eşdeğeri; Serilog (hassas veri maskeli); rate limiting (yerleşik); OpenAPI/Swagger (yalnızca Development); xUnit + gerçek PostgreSQL ile entegrasyon testleri (Testcontainers için Docker gerekir → Docker yoksa ayrı test veritabanı); arka plan işleri için `BackgroundService` + veritabanı kuyruğu (Hangfire vb. **ekleme**); görsel işleme için lisansı ticari kullanıma uygun kütüphane (ImageSharp lisans koşullarını kontrol et; uygun değilse SkiaSharp/NetVips).

---

# BÖLÜM 7 — VERİ MODELİ VE SOY AĞACI

PostgreSQL, `snake_case`, UUID (v7 tercih) birincil anahtarlar, `created_at/updated_at`, `deleted_at` (yumuşak silme), `row_version` (xmin veya sayaç; iyimser eşzamanlılık). Her aile verisi tablosunda `family_id` ve bileşik indeks bulunur.

## 7.1 Varlıklar (alanlar Codex tarafından tamamlanır; aşağıdakiler zorunlu çekirdektir)

- `users` (Identity): e-posta, doğrulanmış mı, görünen ad, dil, KVKK/koşul onay sürümü+zamanı, hesap durumu, kilitlenme alanları.
- `refresh_tokens`: kullanıcı, cihaz, **hash**, aile (rotasyon zinciri), son kullanım, iptal, yeniden kullanım tespiti.
- `email_verification_codes` / `password_reset_tokens`: **hash**, son kullanım, deneme sayısı, kullanıldı.
- `families`: ad, açıklama, oluşturan, kapak medyası, depolama kotası, ayarlar.
- `family_memberships`: kullanıcı, aile, rol (`Owner|Editor|Viewer`; ekran 37'ye bakıp **kesin rol kümesini doğrula**), durum, katılma tarihi, bağlı `person_id` (kullanıcının kendi kişi kaydı).
- `invitations`: aile, davet eden, hedef e-posta (isteğe bağlı), rol, **kod/token hash'i**, son kullanma (varsayılan 7 gün), durum (`Pending|Accepted|Revoked|Expired`), kullanım sınırı.
- `persons`: aile, ad, soyad, kızlık soyadı, takma ad, cinsiyet (serbest/seçmeli), doğum tarihi (tam/kısmi/yaklaşık + `date_precision`), doğum yeri, vefat durumu + tarihi + yeri, biyografi, profil medyası, yaşayan mı, bağlı kullanıcı (opsiyonel), görünürlük, **mükerrer birleştirme alanları** (`merged_into_person_id`).
- `person_parent_links`: çocuk, ebeveyn, tür (`Biological|Adoptive|Step|Foster|Guardian|Unknown`), kesinlik, başlangıç/bitiş. **Basit `ParentId` yok.** Bilinmeyen ebeveyn için yer tutucu desteklenir.
- `partnerships`: kişi A, kişi B, tür (`Marriage|Partnership|Other`), başlangıç, bitiş, bitiş nedeni (`Divorce|Death|Separation|Annulled`), sıra. Birden fazla evlilik desteklenir.
- `media_assets`: aile, yükleyen, tür (`Photo|Audio|Document`), depolama anahtarı (rastgele; kullanıcı girdisinden türetilmez), içerik türü (doğrulanmış), boyut, **SHA-256**, genişlik/yükseklik/süre, EXIF temizlendi mi, durum (`Uploading|Processing|Ready|Failed`), küçük resim anahtarları.
- `albums`, `album_media`, `media_person_tags` (kişi + isteğe bağlı koordinat).
- `memories` (başlık, açıklama/metin, tarih + hassasiyet, konum metni, görünürlük, yazar), `memory_persons`, `memory_media`, `comments` (hatıra/fotoğraf/olay hedefi; düzenleme/silme).
- `audio_recordings` (medya, süre, anlatıcı kişi, hatıra bağlantısı, dalga formu tepe değerleri JSON, dil), `transcripts` + `transcript_segments` (metin, zaman, düzenlendi mi, kaynak: `Manual|Model`).
- `timeline_events` (başlık, tarih/hassasiyet, kategori, açıklama, kişiler, medya, hatıra bağlantısı, taslak durumu).
- `notifications` (alıcı, tür, hedef, okundu), `activity_events` (aile akışı).
- `audit_logs` (kim, ne, hangi kaynak, ne zaman, IP/cihaz; **içerik/PII yok**).
- `export_jobs`, `deletion_requests`, `devices` (cihaz oturumları).
- `search` için: `pg_trgm` + `unaccent` + Türkçe tam metin yapılandırması; `ı/İ` büyük-küçük harf tuzaklarına karşı kültür-duyarlı normalizasyon + test.

## 7.2 Soy ağacı kuralları

- **Döngü engeli:** ebeveyn bağı eklerken özyinelemeli CTE ile "aday ebeveyn çocuğun torunu/soyundan mı" kontrolü; ihlal 422. Kendi kendinin ebeveyni yasak. Eş-kardeş mantıksal çelişkileri uyarı üretir.
- Aynı çift için tekrar eden bağlar engellenir (benzersiz kısıt).
- **Mükerrer kişi:** ad+doğum tarihi benzerliğiyle "olası kopya" önerisi; birleştirme (yalnızca Owner/Editor), bağlar/medya taşınır, geri alınabilir denetim kaydı.
- Yaşayan kişilerin hassas alanları (doğum tam tarihi, iletişim, konum) rol/görünürlüğe göre gizlenir; vefat etmişler için daha geniş görünürlük.
- Kuşak numarası saklanmaz; **hesaplanır** (kullanıcının kendi kişi kaydına göre göreli).

## 7.3 Soy ağacı görünümü (mobil)

- Aile birimi (çift + çocukları) tabanlı **kendi yerleşim algoritman**; kuşak şeritleri (tasarımdaki "1. Kuşak · Kökler" vb.), çakışmasız düğümler, bağ çizgileri: ebeveyn–çocuk 2 dp düz çizgi (Sage, %60 opaklık), eş bağı **kesik çizgi**, 8 dp terminal düğümleri.
- Pinch zoom, sürükleme, düğüme dokunma → alt panel özet (tasarımdaki özet kartı) → "Tam Profili Gör"; dal daraltma/genişletme; "Ben" rozeti; kuşak filtre çipleri.
- Performans: yalnızca görünür alanı çiz (sanallaştırma/kırpma), 500+ kişilik sentetik ağaçla test et ve süreyi/fps'i raporla; sunucu tarafında ağaç verisi sayfalanır/derinlik parametreli.
- **Erişilebilir alternatif liste görünümü** (kuşaklara göre gruplanmış, TalkBack uyumlu) ağaç ekranından geçiş yapılabilir.

---

# BÖLÜM 8 — BACKEND ŞARTNAMESİ

Temel yol `/api/v1`. Tüm cevaplar tutarlı hata gövdesi (`ProblemDetails` + `code` + Türkçe iletilebilir `message`). Sayfalama (cursor), `ETag/If-Match` ya da `row_version` ile iyimser kilit. Tüm yetki **sunucuda** denetlenir; istemci yalnızca arayüzü gizler.

## 8.1 Kimlik ve oturum

- Kayıt (e-posta + parola + ad + KVKK/koşul onayı), giriş, çıkış, yenileme, tüm cihazlardan çıkış, oturum/cihaz listesi ve tek tek sonlandırma.
- Parola: Identity hasher; minimum politika (≥10 karakter, yaygın-parola listesi kontrolü, kullanıcı adı/e-posta içermez).
- E-posta doğrulama: **6 haneli kod** (hash'li saklanır, 10 dk geçerli, 5 deneme sınırı, yeniden gönderme bekleme süresi 60–120 sn — ekran 09'daki geri sayıma bağla) + "bağlantıyla doğrulama" alternatifi (deep link).
- Parola sıfırlama: istek (her zaman aynı genel cevap — hesap sızdırma yok) → kod/bağlantı → yeni parola; başarıda tüm refresh token'lar iptal.
- Access token ~15 dk; refresh token döndürülür (rotation) ve **yeniden kullanım tespitinde zincir iptal edilir**; refresh token'lar yalnızca hash olarak saklanır.
- Giriş denemesi koruması: hesap/IP bazlı kademeli kilit + rate limit; sabit-zamanlı karşılaştırma; kullanıcı numaralandırma yok.
- E-posta gönderimi `IEmailSender` arayüzüyle: Development'ta **geliştirme gelen kutusu** (veritabanı tablosu + sadece Development'ta okunabilen uç nokta ve log; Production'da asla) ve opsiyonel SMTP/Mailpit.

## 8.2 Aile, üyelik, davet, roller

- Aile oluşturma (oluşturan `Owner` olur ve kendi `person` kaydı oluşturulur/bağlanır), aileler arası geçiş, aile bilgisi güncelleme.
- Davet: kod biçimi okunaklı ve tire'li (örn. `KOK-XXXX-XXXX`, karışan karakterler hariç), büyük/küçük harf duyarsız; yalnızca hash saklanır; ön izleme uç noktası (aile adı, davet eden, kalan süre, nesil/kayıt sayısı — **yetkisiz bilgi sızdırmadan**); kabul → üyelik; iptal; yeniden gönderme; süre dolumu; kullanım sınırı; derin bağlantı `kok://invite/<kod>`.
- Üye listesi, rol değiştirme (yalnızca Owner), üyeyi çıkarma/ayrılma (son Owner ayrılamaz; sahipliği devretme).

### Varsayılan izin matrisi (ekran 37'yi oku, farklıysa **ekranı esas al**, farkı `DESIGN_GAPS.md`'ye yaz)

| Eylem | Owner | Editor | Viewer |
|---|:-:|:-:|:-:|
| Aile verisini görüntüleme (görünürlük dahilinde) | ✔ | ✔ | ✔ |
| Hatıra/fotoğraf/ses/olay ekleme | ✔ | ✔ | ✖ |
| Kendi eklediğini düzenleme/silme | ✔ | ✔ | ✖ |
| Başkasının eklediğini düzenleme/silme | ✔ | ✖ | ✖ |
| Kişi ekleme/düzenleme, ilişki bağlama | ✔ | ✔ | ✖ |
| Kişi silme / birleştirme | ✔ | ✖ | ✖ |
| Yorum yazma | ✔ | ✔ | ✔ (Viewer için varsayılan: ✔; ekran farklıysa uyarla) |
| Üye davet etme | ✔ | ✖ | ✖ |
| Rol değiştirme/üye çıkarma | ✔ | ✖ | ✖ |
| Aile verisini dışa aktarma | ✔ | ✖ | ✖ |
| Kalıcı silme onayı / aileyi silme | ✔ | ✖ | ✖ |

Görünürlük değerleri (hatıra/medya): `Family` (tüm üyeler), `EditorsAndOwners`, `OnlyMe` (yalnızca yazar + Owner). Ekran 21/22'deki görünürlük seçeneklerini oku ve eşle.

## 8.3 Kişiler ve soy ağacı API'si
Kişi CRUD, ilişki ekleme/silme/düzenleme (döngü ve tür doğrulaması), ağaç çekme (kök kişi + derinlik + yön), kişi detayı (özet sayaçları: fotoğraf/hatıra/ses), olası kopya önerisi, birleştirme, yaşayan/vefat gizlilik filtresi.

## 8.4 Medya hattı (fotoğraf + ses için **tek ortak hat**)

- Yükleme: `multipart` + ilerleme + **kaldığı yerden/parçalı** (en azından yeniden denenebilir, kimlik-denk `Idempotency-Key`). Önce `Uploading` kaydı, sonra işlem.
- Doğrulama: **magic byte** ile gerçek tür, izinli türler (JPEG/PNG/WebP/HEIC → dönüştürme; ses: m4a/aac/mp3/wav/ogg), boyut sınırları yapılandırılabilir (varsayılan foto ≤ 25 MB, ses ≤ 150 MB), aile kotası, çift yükleme tespiti (SHA-256).
- İşleme: **EXIF/GPS temizleme**, döndürme düzeltme, küçük resim (örn. 256/1024 px), süre/boyut çıkarma; hata durumunda `Failed` + tekrar deneme.
- Depolama arkasında `IMediaStorage`: yerel dosya sağlayıcı (kök dışı yol, rastgele anahtar, yol geçişi/`..` koruması) ; S3 uyumlu sağlayıcı arayüzü hazır (uygulama sonraya).
- İndirme/akış: **yalnızca yetki denetimli** uç nokta (`Range` desteği ses için) veya kısa ömürlü imzalı URL; açık/genel URL yok; `Content-Disposition`/`nosniff`; ayrı aile verisi izolasyonu.
- Silme: yumuşak sil → 30 gün → kalıcı (dosyalar dahil) arka plan işi.

## 8.5 Hatıralar, yorumlar, albümler, zaman çizelgesi
CRUD + görünürlük + kişi/medya bağlama + arama; yorumlar (ekle/düzenle/sil, yetki); albümler (oluştur, medya ekle/çıkar, albüm bazlı izin); fotoğraf detayı + kişi etiketleme; zaman çizelgesi olayları + taslak (otomatik kaydedildi) + kategori; her değişiklik `activity_events` ve ilgili `notifications` üretir.

## 8.6 Arama ve filtre
Tek uç nokta: kişi, hatıra, fotoğraf başlığı/açıklaması, ses, olay, transkript metni üzerinde; filtreler: tür, kişi, kuşak/dal, tarih aralığı, albüm, etiket; Türkçe normalizasyon (`ı/İ/ğ/ş`), yazım benzerliği (`pg_trgm`), vurgulama; yalnızca yetkili sonuçlar; sayfalama.

## 8.7 Bildirimler ve aktivite
Uygulama içi bildirim merkezi (okundu/tümünü okundu); aktivite akışı (aile bazlı, sayfalı). **Push bildirimi v1'de yok** (K11): `INotificationDispatcher` arayüzü ve cihaz token tablosu hazır, uygulaması sonraya; ekranlarda push vaat edilmez.

## 8.8 Dışa aktarma ve hesap/veri silme
- Aile verisini dışa aktarma (yalnızca Owner): asenkron iş; ZIP = `manifest.json` + kişiler/ilişkiler/hatıralar/olaylar (JSON) + insan-okur özet (HTML veya Markdown) + medya dosyaları; ilerleme/iptal; indirme bağlantısı süreli ve yetkili; tamamlanınca bildirim.
- Kullanıcı kendi verisini dışa aktarma (KVKK taşınabilirlik).
- Hesap silme: parola/yeniden doğrulama + bekleme + geri alma penceresi; aile sahibi ise sahiplik devri veya aile silme akışı; kalıcı silme işi; denetim kaydı.

## 8.9 Transkripsiyon (K6)
- `ITranscriptionProvider` arayüzü; v1 uygulaması: **elle transkript** (kayıt başına metin düzenleme, zaman damgalı segmentler isteğe bağlı) ve boş "Model" sağlayıcı. Ücretli servis veya veri dışarı çıkaran servis **kullanılmaz**.
- Ekran 25'teki "Yapay Zekâ ile Metne Yaz" anahtarı yalnızca sunucuda etkin bir sağlayıcı varsa gösterilir; yoksa gizlenir (ölü anahtar bırakma). Etiket, sağlayıcıya göre doğru ifade kullanır.

## 8.10 Güvenlik başlıkları ve işletim
HSTS/HTTPS yönlendirme (Production), CORS kısıtlı, istek boyutu sınırı, `X-Content-Type-Options`, sağlık uç noktaları (`/healthz`), yapılandırılmış log (kişisel veri maskeli), gizli anahtarlar yalnızca `dotnet user-secrets`/ortam değişkeni; depoda yalnızca `.env.example`.

## 8.11 Veritabanı değişiklikleri
Yalnızca EF Core migration; migration'lar depoya girer; her migration için geri alma notu; veri kaybı riski olan migration onay gerektirir.

## 8.12 DemoSeed (yalnızca Development)
`dotnet run -- seed-demo`: "Çelik & Yılmaz" demo ailesi (4 kuşak, karmaşık ilişkiler: çoklu evlilik, evlat edinme, vefat), yerel placeholder fotoğraflar, örnek ses dosyaları, hatıralar, olaylar. Her kayıt `is_demo=true`; arayüzde "DEMO VERİSİ" etiketi; Production'da çalışmaz. Görsel QA ve ekran karşılaştırması bu veriyle yapılır.

---

# BÖLÜM 9 — MOBİL ŞARTNAME

## 9.1 Gezinti mimarisi
- Kök: `AuthStack` (Splash → Onboarding → Dil → Giriş/Kayıt → Doğrulama → Profil → Aile oluştur/katıl) ve `MainTabs` (Ana Sayfa, Soy Ağacı, Hatıralar, Sesli Tarih, Ailem) + `Stack` ekranları + modallar.
- **Oturum yaşam döngüsü:** açılışta token yenileme; süre dolarsa (401 + yenileme başarısız) güvenli çıkış + "Oturumunuz sona erdi" + giriş ekranı, bekleyen taslaklar korunur.
- **Android geri tuşu:** modal/alt sayfa → kapat; formda kaydedilmemiş değişiklik → "Değişiklikler kaydedilmedi" onayı; kök sekmede çift dokunuşla çıkış; kayıt sürerken geri → onay.
- **Deep link:** `kok://invite/<kod>`, `kok://verify?token=…`, `kok://reset?token=…`, `kok://memory/<id>` vb.; giriş yapılmamışsa hedefi sakla, girişten sonra yönlendir; geçersiz bağlantıda anlaşılır hata ekranı.
- Ekranlar arası veri **ID ile** aktarılır (nesne taşımak yerine sorgudan oku). Tüm rotalar tipli (TypeScript).
- Her etkileşimin sonucu `docs/NAVIGATION_MAP.md`'de yazılı olur.

## 9.2 Ortak mimari kuralları
- Her veri ekranı 4 durumu ele alır: yükleniyor (skeleton), boş, hata (yeniden dene), çevrimdışı. `StateView` bileşeni bunu sağlar (ekran 45–48'in bileşen karşılığı); ekran 48 ayrıca bağımsız "Çevrimdışı Durum" ekranı olarak (bekleyen senkronizasyon özetiyle) uygulanır.
- Formlar: Zod şemaları, alan altı Türkçe hata mesajı, klavye türü/`autoComplete`/`textContentType`, ilk hatalı alana odak, çift gönderim engeli, kaydedilmemiş değişiklik koruması.
- Erişilebilirlik: her etkileşimli öğede `accessibilityRole/Label/State`, ≥48×48 dp, odak sırası, TalkBack, büyük yazı ölçeği, renk tek başına anlam taşımaz, azaltılmış hareket tercihi.
- Animasyon: minimal, anlamlı (150–300 ms), `Reanimated`, "azaltılmış hareket" desteği.

## 9.3 EKRAN ENVANTERİ VE DAVRANIŞ ŞARTNAMESİ (52 öğe — hiçbiri atlanmaz)

Her ekranı uygulamadan önce **ilgili `code.html` ve `screen.png` dosyalarını oku**; aşağıdaki davranış özeti çıkarımdır, ekrandaki ayrıntı ile çelişirse ekranı esas al ve farkı belgele. Buton yok sayılamaz: her biri aşağıda veya `NAVIGATION_MAP.md`'de tanımlı bir sonuca sahip olmalı.

### A. Açılış ve kimlik doğrulama
| # | Ekran (uygulama başlığı) | Davranış / veri |
|---|---|---|
| 01 | Splash / Açılış | Logo; oturum ve ilk açılış durumunu belirler: ilk açılış → Onboarding, oturum yok → Giriş, geçerli oturum → Ana Sayfa (token yenileme). Yapay bekleme ≤1,5 sn; "256-bit Arşiv" ifadesi **yok** (S11). |
| 02 | Hatıralar (onboarding 1/3) | "Atla" → Dil Seçimi; "İleri". `hasSeenOnboarding` kalıcı. |
| 03 | Sesli Hikâyeler (onboarding 2/3) | Geri/İleri/Atla; örnek oynatıcı yalnızca görsel tanıtım (gerçek ses yok; etiket "Örnek"). |
| 04 | Özel Aile Alanı (onboarding 3/3) | "Başla" → Dil Seçimi. Gizlilik iddiaları doğru ifade ile (S11). |
| 05 | Dil Seçimi | TR seçili; EN/DE/FR devre dışı "Yakında"; seçim cihazda saklanır; "Devam Et" → Giriş. |
| 06 | Giriş Yap | E-posta + parola, göster/gizle, "Şifremi Unuttum", "Hesap Oluştur"; hata durumları (hatalı bilgi, kilit, doğrulanmamış e-posta → Doğrulama); sürüm etiketi gerçek `appVersion`. |
| 07 | Hesap Oluştur | Ad-soyad, e-posta, parola + tekrar (güç göstergesi), KVKK/koşul onayı (sürüm kaydı); sunucu doğrulama hataları alana bağlanır → Doğrulama. |
| 08 | Şifremi Unuttum | E-posta → genel başarı mesajı → kod/bağlantı → **Yeni Parola** ekranı (tasarım boşluğu). |
| 09 | Hesap Doğrulama | 6 haneli kod (otomatik ilerleme, yapıştırma, SMS/e-posta otomatik doldurma uygunsa), geri sayım, "Kodu Tekrar Gönder", "Bağlantıyla Doğrulama"; başarıda → Profil Oluştur. |
| 10 | Kişisel Profil Oluştur | Ad, doğum tarihi (kısmi izinli), fotoğraf (kamera/galeri), kısa not; "Daha Sonra Tamamla" → Aile Alanı seçimi; kullanıcıya bağlı `person` kaydı oluşturulur. |
| 11 | Aile Alanı Oluştur | Ad, açıklama, kapak; (ekrandaki 8 alanı oku); oluşturunca Owner, → Ana Sayfa. Alternatif: "Davet kodum var" → 12. |
| 12 | Aile Alanına Davetle Katıl | Kod gir/yapıştır (tire otomatik, büyük/küçük duyarsız); sunucuda doğrula → önizleme kartı (aile, davet eden, kalan süre) → "Katıl". Süresi dolmuş/iptal/geçersiz için net hata. |

### B. Ana uygulama ve soy ağacı
| # | Ekran | Davranış / veri |
|---|---|---|
| 13 | Ana Sayfa | Aile özeti, son hatıralar/ses/fotoğraf, "Bugün tarihte" (varsa), kısayol kartları (Fotoğraflar, Zaman Çizelgesi), hızlı eylemler (hatıra ekle, ses kaydet, fotoğraf yükle) — yetkiye göre gizlenir. |
| 14 | Aile Aktivite Akışı | Sayfalı akış; her öğe hedefe gider; filtre; yenile (pull-to-refresh). |
| 15 | Bildirimler | Liste, okundu/tümü, hedefe git, boş durum. |
| 16 | Soy Ağacı | Bölüm 7.3; kuşak çipleri, alt panel özet, "Tam Profili Gör", "Yeni Anı Bağla", yeni kişi ekle, arama, liste alternatifi. |
| 17 | Aile Bireyi Detay Profili | Bilgiler, ilişkiler (ebeveyn/eş/çocuk bağları), sayaçlar (fotoğraf/ses/hatıra), biyografi, bağlı medya; menü: düzenle/sil/birleştir (yetkiye göre). |
| 17-B | Aile Bireyi Fotoğraf Galerisi | Kişiye etiketli fotoğraflar ızgarası → Fotoğraf Detayı; başlık "Fotoğraflar". |
| 18 | Yeni Aile Bireyi Ekleme | Çok alanlı form (19 alan; ekranı oku): ad, tarih, vefat, ilişki türü + bağlanacak kişi, fotoğraf; döngü/kopya uyarıları. |
| 19 | Aile Bireyi Düzenleme | 18 ile aynı form, mevcut veriyle; ilişki düzenleme/silme; kaydedilmemiş değişiklik koruması. |

### C. Hatıralar ve sesli hikâyeler
| # | Ekran | Davranış / veri |
|---|---|---|
| 20 | Hatıralar Kütüphanesi | Liste/ızgara, arama + filtre çipleri, sıralama, sayfalama, boş durum, "yeni hatıra". |
| 21 | Hatıra Detayı | Metin, tarih, kişiler, ekler (fotoğraf/ses), görünürlük kilidi, yorumlar, paylaş/düzenle/sil (yetki). |
| 21-B | Yorum Ekleme (modal) | Alt sayfa; metin, gönderme durumu, hata, çevrimdışında kuyruğa; düzenle/sil kendi yorumu. |
| 22 | Yeni Hatıra Oluştur | Başlık, metin, tarih, kişi seç, fotoğraf ekle, ses ekle, görünürlük, taslak otomatik kayıt, "Vazgeç" onayı; kaydet → Hatıra Detayı. |
| 23 | Hatıra Düzenleme | 22 ile aynı, mevcut veriyle; sürüm çakışmasında uyarı. |
| 24 | Sesli Hikâyeler Kütüphanesi | Liste, arama, anlatıcıya göre filtre, süre, oynat, "Yeni kayıt". |
| 25 | Ses Kayıt Stüdyosu (başlık: "Ses Kaydı") | Anlatıcı seç, başlık, hatırlatıcı soru ipuçları (yerel soru bankası, "Başka Soru"), mikrofon izni akışı, **Kayıt Başlat / Duraklat / Devam / Bitir / Baştan Başla**, canlı süre ve gerçek genlikten dalga formu, gerçek **kalan depolama** göstergesi, kesinti (arama/odak kaybı) davranışı, taslak kaydet, yükleme. Ayrıntı: Bölüm 9.6. |
| 26 | Ses Oynatıcı (başlık: "Sesli Hatıra") | Oynat/duraklat, ±10–15 sn atlama, arama çubuğu, hız, süre, dalga formu ilerlemesi, transkript bölümü (varsa), "Not Bırak", paylaş/düzenle; arka planda çalma. |
| 26-B | Gece Dinleme Modu | Koyu, düşük parlaklık oynatıcı; uyku zamanlayıcı (gerçekten çalışan), ekran açık kalmasın seçeneği, ses azalarak kapanma. |
| 27 | Ses Kaydı Detayı | Meta veriler, anlatıcı, bağlı hatıra, transkript görüntüle/**düzenle**, indir/paylaş (yetki), sil. |

### D. Fotoğraf arşivi ve zaman çizelgesi
| # | Ekran | Davranış / veri |
|---|---|---|
| 28 | Fotoğraf Albümleri | Albüm ızgarası, "Tüm fotoğraflar", yeni albüm, boş durum. |
| 29 | Albüm Detayı | Fotoğraf ızgarası, çoklu seçim, albüme ekle/çıkar, albüm izinleri, düzenle/sil. |
| 30 | Fotoğraf Detayı | Tam ekran, yakınlaştırma, açıklama, kişi etiketleri (ekle/kaldır), yorumlar, tarih/konum (EXIF temizlenmiş), paylaş/indir/sil. |
| 31 | Fotoğraf Yükleme | Çoklu seçim (galeri/kamera), albüm seç, açıklama, ilerleme çubukları, **başarısız olanı yeniden dene**, iptal, arka planda sürdür, tür/boyut doğrulama mesajları. |
| 32 | Aile Zaman Çizelgesi | Kronolojik dikey zaman çizelgesi, yıl/kategori filtresi, olaya git, yeni olay. |
| 33 | Yeni Zaman Çizelgesi Olayı | Başlık, tarih (kısmi/yaklaşık), kategori, kişi, medya, açıklama; **gerçek otomatik taslak kaydı** ("Otomatik kaydedildi" yalnızca gerçekten kaydedildiyse). |
| 34 | Zaman Çizelgesi Olay Detayı | İçerik, ilgili kişiler/medya, düzenle/sil, hatıraya bağlantı. |

### E. Aile yönetimi, arama ve ayarlar
| # | Ekran | Davranış / veri |
|---|---|---|
| 35 | Aile Üyeleri ve Davetler (Ailem) | Üye listesi + roller, bekleyen davetler (iptal/yeniden gönder), "Davet Et"; Fotoğraflar/Zaman Çizelgesi bölümlerine girişler. |
| 36 | Aile Üyesi Davet Etme | Rol seç, e-posta (ops.), kod/bağlantı üret, paylaş (Android paylaşım sayfası), süre; "uçtan uca" ifadeleri düzeltilir (S11). |
| 37 | Roller ve İzinler | Rol matrisi (yalnızca görüntüleme + Owner için rol değiştirme); izinler sunucudan gelen gerçek matristen çizilir. |
| 38 | Genel Arama | Arama kutusu, son aramalar (yerel), kategorili sonuçlar, boş sonuç durumu. |
| 39 | Filtrelenmiş Arama Sonuçları | Filtre çipleri/alt sayfa (tür, kişi, kuşak, tarih, albüm), sonuç sayısı, temizle. |
| 40 | Profilim | Kendi kişi kaydı özeti, katkı sayıları, "Düzenle", ayarlar girişi. |
| 41 | Profil Düzenleme | Ad, doğum, fotoğraf, biyografi, görünürlük; kaydedilmemiş değişiklik koruması. |
| 42 | Ayarlar | Hesap, aile değiştirme, dil, yazı boyutu (sistem + uygulama içi ölçek), bildirim tercihleri (uygulama içi), gizlilik/güvenlik, dışa aktarma, çıkış, sürüm bilgisi, hakkında. |
| 43 | Gizlilik ve Güvenlik | Parola değiştir, oturumlar/cihazlar, e-posta, KVKK metinleri, hesap silme akışı; doğru güvenlik ifadeleri (S11). |
| 44 | Aile Verilerini Dışa Aktarma | Kapsam seçimi (8 giriş; ekranı oku), başlat, ilerleme, tamamlanınca indirme/paylaşma (Android paylaşım), geçmiş. |

### F. Sistem durumları
| # | Ekran | Uygulama |
|---|---|---|
| 45 | Boş Durum | `StateView variant="empty"` (bağlama özel metin/eylem) |
| 46 | Yükleniyor | Skeleton'lar + ekran okuyucu duyurusu |
| 47 | Hata Durumu | `StateView variant="error"` + yeniden dene + hata kodu (teknik ayrıntı gizli) |
| 48 | Çevrimdışı Durum | Çevrimdışı bandı + tam ekran çevrimdışı görünümü; bekleyen senkronizasyon sayısı gerçek kuyruktan; "çevrimdışı yapılabilenler" listesi Bölüm 9.7 ile birebir |

### G. Tasarım sistemi
KÖK UI Kit → `mobile/src/components` içindeki bileşen kataloğunun kaynağı. Geliştirme modunda gizli bir **"Bileşen Kataloğu"** ekranı (yalnızca `__DEV__`) bütün bileşenleri/durumları gösterir; üretimde yoktur.

## 9.4 Tasarım boşlukları (tasarımı olmayan ama gereken ekranlar)
Tasarım sistemi bileşenleriyle, tutarlı yaz ve `docs/DESIGN_GAPS.md`'de listele: Yeni Parola belirleme; Parola değiştir; E-posta doğrulama başarı/hata; Oturum/Cihaz listesi; Hesap silme onay akışı; Aile değiştirme (sekmeli aile seçici); Aile bilgisi düzenleme; Üyeyi çıkarma/sahiplik devri onayı; Albüm oluştur/düzenle; Kişi etiketleme seçici; Kişi/Fotoğraf/Hatıra silme ve **geri alma (çöp kutusu)** ekranı; Yorum düzenleme; Olası kopya birleştirme ekranı; Derin bağlantı hata ekranı; Depolama kotası dolu uyarısı; İzin reddedildi ekranları (mikrofon, kamera, depolama); Hakkında/Sürüm/Lisanslar; Bilinmeyen sürüm/zorunlu güncelleme (basit).

## 9.5 Fotoğraf akışı (mobil)
Seçim/kamera → izin yönetimi (reddedildi/kalıcı reddedildi → ayarlara yönlendirme) → istemci tarafı boyutlandırma + **EXIF/GPS silme** (`expo-image-manipulator`) → yükleme kuyruğu (SQLite) → ilerleme → başarısızda yeniden deneme → küçük resim önbelleği. Büyük listelerde `FlashList`/sanallaştırma ve `expo-image` önbelleği.

## 9.6 Ses akışı (mobil) — kritik
- İzin: mikrofon (gerekçeli iletişim, reddedildi/kalıcı red → ayarlara yönlendirme).
- Kayıt biçimi: AAC/m4a, mono/44.1 kHz, ~96–128 kbps (kalite seçeneği "Yüksek" etiketini yansıtır); **canlı genlik** örnekleme ile dalga formu; tepe değerleri kayıtla birlikte saklanır ve yüklenir.
- Kaydı yerel özel dizine **parça parça güvenli** yaz; kesintide (gelen arama, odak kaybı, uygulama arka plana geçme) kayıt **kaybolmamalı:** Android 14+ için mikrofon türünde **foreground service** ile arka planda sürdürmeyi dene; modül/OS desteklemezse güvenle duraklat + kısmi dosyayı koru + kullanıcıya net mesaj.
- Depolama yetersizliği: kayıt başlamadan boş alan kontrolü, sırada tahmini kalan süre (gerçek), dolarken uyarı + güvenli durdurma.
- Önizleme (dinle/kırp opsiyonel değil: en az baştan dinle), "Kaydı Bitir" → yükleme; yükleme hatasında kayıt cihazda korunur ve kuyruğa girer.
- Oynatma: arka planda çalma ve kilit ekranı kontrolleri için modülün gerçek desteğini **cihazda test et**; desteklenmiyorsa bunu `KNOWN_ISSUES.md`'ye yaz ve arayüzde vaat etme.
- Uyku zamanlayıcı ve kapanışta yumuşak azalma (Gece Dinleme).

## 9.7 Çevrimdışı kapsam (gerçekçi)
- **Çevrimdışı çalışır:** önbelleğe alınmış ağaç/kişi/hatıra/olay/albüm metaverisi görüntüleme; önceden indirilmiş fotoğraflar; **hatıra/olay taslağı yazma**; **ses kaydı alma (yerel)**; fotoğraf seçip yükleme kuyruğuna ekleme; yorum taslağı kuyruğa alma.
- **Yalnızca çevrimiçi:** kayıt/giriş, e-posta kodu, davet gönderme/kabul, rol değişikliği, kalıcı silme, dışa aktarma, bildirim çekme, transkript işleri.
- Mekanizma: bağlantı durumu algısı, **kalıcı işlem kuyruğu** (SQLite: kimlik-denk anahtarlar, üstel bekleme ile yeniden deneme, kullanıcıya "bekleyen/başarısız" görünür), çakışmada `row_version` ile çözüm (kullanıcıya "Sizin sürümünüz / Sunucudaki sürüm" seçimi), uygulama yeniden açıldığında kuyruk ve taslakların korunması ve tutarlılık.
- Önbellek güvenliği: önbellek özel uygulama alanında; çıkışta ve hesap silmede temizlenir.

## 9.8 i18n
Tüm kullanıcı metinleri anahtarla (`tr` varsayılan); tarih/sayı biçimleri `tr-TR`; kısmi/yaklaşık tarih gösterimi ("1950'ler", "Mart 1962 civarı"); Türkçe çoğul/büyük-küçük harf kuralları (`İ/ı`) test edilir.

---

# BÖLÜM 10 — GÜVENLİK VE MAHREMİYET

## 10.1 Dürüst şifreleme dili (KRİTİK)
- **TLS** = aktarım şifrelemesi. **Sunucu tarafı şifreleme** = bekleyen veri (disk/nesne). **Uçtan uca şifreleme (E2EE)** = yalnızca uçlar çözebilir; bu mimaride **YOKTUR** (sunucu küçük resim, arama, transkript, birleştirme, kurtarma yapar).
- Uygulama metinlerinde "uçtan uca", "256-bit", "askeri düzey" **yazılmaz.** Doğru örnekler: "Verileriniz aktarım sırasında şifrelenir ve yalnızca yetkili aile üyelerinin erişimine açıktır.", "Hiçbir içerik reklam amacıyla paylaşılmaz."
- "Yapay zekâ eğitiminde kullanılmaz" ifadesi yalnızca gerçekten harici AI servisi hiç kullanılmıyorsa yazılır (v1'de doğru).
- Bekleyen veri: sunucuda dosya sistemi/disk şifrelemesi öneri belgesi (`SECURITY_MODEL.md`), yerel geliştirmede Windows BitLocker önerisi (yapılandırmayı kullanıcı adına değiştirme).

## 10.2 Gereksinim listesi (hepsi uygulanır ve test edilir)
Güvenli kayıt/giriş; parola saklama (Identity hasher); e-posta doğrulama; refresh rotasyonu; Android Keystore token depolama; oturum sonlandırma (tek/tüm cihaz); **rol + kaynak bazlı yetki**, **aile izolasyonu** (her sorguda `family_id` filtresi; başka aile kimliğiyle erişim denemeleri testlerle kanıtlanır, IDOR yok); yetkisiz medya erişimi engeli; güvenli yükleme/indirme (magic byte, boyut, yol geçişi, içerik türü); rate limiting; giriş deneme kilidi; denetim kayıtları; hesap/veri silme; yedekleme ve geri yükleme betiği (`scripts/backup-db.ps1`, geri yükleme doğrulaması); veri dışa aktarma; log temizliği (parola/token/e-posta/PII yok); gizli anahtar yönetimi (depoda gizli yok; gizli taraması `scripts/scan-secrets` ile).
- Android: release'te `usesCleartextTraffic=false`; yalnızca geliştirme varyantında localhost; ekran yakalama kısıtı opsiyonu (ayar); `allowBackup=false` veya yedekten hassas verileri dışla; yetkisiz `exported` bileşen yok; WebView yok.
- Bağımlılık güvenliği: `npm audit`, `dotnet list package --vulnerable` raporu her faz sonunda.
- **KVKK:** açık rıza/aydınlatma metinleri için şablon + sürümleme + onay kaydı; silme/taşınabilirlik/düzeltme hakları ekranlarda karşılanır; yaşayan akraba verisi minimizasyonu; 18 yaş altı üyeler için uyarı notu. Yasal metinler **hukuki inceleme gerektirir** — bunu `SECURITY_MODEL.md`'de ve kullanıcıya açıkça yaz (yasal danışmanlık verme).

---

# BÖLÜM 11 — TEST VE KALİTE GÜVENCESİ

| Katman | Araç | Otomatik/Manuel |
|---|---|---|
| Tip denetimi | `tsc --noEmit` | Otomatik |
| Lint + format | ESLint, Prettier | Otomatik |
| Mobil birim/bileşen | Jest + RNTL | Otomatik |
| Kontrast ve token | `contrast.test.ts`, token testi | Otomatik |
| İkon çözümleme | 233 adın hepsi | Otomatik |
| Backend birim | xUnit | Otomatik |
| API entegrasyon + DB | xUnit + gerçek PostgreSQL | Otomatik |
| Yetki/izolasyon/IDOR | Entegrasyon testleri | Otomatik |
| Soy ağacı | Döngü, çoklu evlilik, evlat edinme, kopya birleştirme, 500+ kişi performansı | Otomatik |
| Form doğrulama | RNTL | Otomatik |
| Navigasyon/derin bağlantı | RNTL + gezinti testleri | Otomatik |
| Medya yükleme | Sahte/ gerçek dosya, boyut/tür/EXIF | Otomatik (backend) + cihaz |
| Ses kaydı | Gerçek cihaz: kayıt, duraklat, kesinti, arka plan, depolama | **Manuel** (kullanıcı dinleyerek doğrular) |
| Çevrimdışı | Uçak modu senaryoları | Otomatik (mantık) + **cihazda** |
| Erişilebilirlik | TalkBack gezinmesi, büyük yazı, dokunma hedefi taraması | Kısmen otomatik + manuel |
| Performans/bellek | Açılış süresi, kaydırma fps, `dumpsys meminfo` | Cihazda ölçüm |
| Görsel doğrulama | `adb exec-out screencap` ile her ekran → `docs/visual-qa/` yanında `screen.png` | Cihazda |
| Release APK | Imzalı derleme + cihaza kur + temel akışlar | Cihazda |

- Her fazda ilgili testleri **yaz ve çalıştır.** Test yazılmadan faz bitmez.
- `scripts/device-smoke.ps1`: APK kur → başlat → logcat'te çökme/`FATAL EXCEPTION` yok → ekran görüntüsü al → rapora yaz.
- **Raporlama kuralı:** otomatik testi geçmesi ≠ cihazda doğrulandı. Cihazda **gerçekten** çalıştırdığın şeyleri `ANDROID_TEST_REPORT.md`'de tarih/cihaz/sürüm/adımlarla yaz; çalıştırmadıklarını "doğrulanmadı" olarak işaretle.
- Her faz sonunda: `tsc`, lint, mobil testler, backend testleri, `dotnet build`, `npm audit`/`dotnet` zafiyet raporu, mümkünse debug APK derleme+kurulum, belge güncelleme.

---

# BÖLÜM 12 — DOKÜMANTASYON

Proje içinde oluştur ve **gerçek durumu** yansıtacak şekilde güncel tut (tekrar yok):
`README.md`, `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/SCREEN_INVENTORY.md`, `docs/NAVIGATION_MAP.md`, `docs/API_CONTRACT.md` (OpenAPI'den üretilen + elle notlar), `docs/DATABASE_SCHEMA.md`, `docs/SECURITY_MODEL.md`, `docs/IMPLEMENTATION_PROGRESS.md`, `docs/ACCEPTANCE_MATRIX.md` (Bölüm 15'teki 20 kriter + her ekran satırı × durum: kodlandı / otomatik test / cihazda doğrulandı), `docs/ANDROID_TEST_REPORT.md`, `docs/NEXT_SESSION.md`, `docs/DECISIONS.md`, ek: `docs/DESIGN_GAPS.md`, `docs/KNOWN_ISSUES.md`, `docs/GLOSSARY_TR.md`, `docs/COSTS_AND_INFRA.md` (Bölüm 16), `docs/ENV_AUDIT.md` (Faz 0 sonucu), `docs/RELEASE.md`.

---

# BÖLÜM 13 — GELİŞTİRME FAZLARI

Her faz: **Amaç, Ön koşul, Yapılacaklar, Testler, Kabul, Çıkış** içerir. Faz bitince bölüm 14 raporu yazılır, commit atılır. **Tüm sorunlar çözülmeden sonraki faza geçme.** "★ Kullanıcı kapısı" olan fazlarda durup kullanıcıya kısa özet + ne doğrulaması gerektiğini söyle ve onay bekle.

**Faz 0 — Ortam doğrulama ve proje hazırlığı**
Denetim (5.2) → `ENV_AUDIT.md` → A/B/C listesi → toplu onay → eksik kurulumlar → `env.ps1` → `C:\dev\kok` oluştur, `git init`, `.gitignore`, `.editorconfig`, `AGENTS.md`, `docs/` iskeleti → ZIP'i bul, aç (3.1) → resmi kaynaklardan sürüm uyumluluğu doğrula (Expo/RN/Gradle/AGP/compileSdk/Build-Tools, .NET LTS, PostgreSQL) → `DECISIONS.md`. Kabul: denetim raporu + onaylı kurulumlar bitmiş, `java -version`=17, `adb devices` cihazı `device` gösteriyor.

**Faz 1 — Temel kurulum ve ilk çalışan APK ★**
`mobile/` Expo + TS strict; ESLint/Prettier/Jest; `expo prebuild`; yerel Gradle ile **debug APK**; `adb install`; `adb reverse 8081`; Metro; telefonda "KÖK" açılış ekranı; `device-smoke.ps1`. Kabul: APK telefonda **gerçekten açılıyor**, logcat çökmesiz; sürüm/mimari/API kayıtlı. ★ Kullanıcıya: "Telefonda KÖK açılış ekranını görüyor musun?" (tek soru).
Başarısızsa: Android Studio'suz yolun sorununu analiz et, düzelt; 3 deneme sonrası alternatif + onay.

**Faz 2 — Tasarım sistemi ★**
Token çıkarma → `tokens.json` → tema; fontlar + Türkçe glif testi; 233 ikon; kontrast testi; bileşen kütüphanesi (Button, Input, Card, HeritagePhotoCard, AudioWaveformPlayer, TreeNode, TreeConnector, Pill/Chip, Avatar, ListItem, Modal/BottomSheet, AppBar, TabBar, Skeleton, StateView, Toast, ProgressBar, SegmentedControl, Switch, Checkbox, Radio, OTPInput, DatePicker (kısmi tarih), EmptyState…); `__DEV__` Bileşen Kataloğu; S1 karşılaştırma tablosu + ekran görüntüleri. Kabul: katalog telefonda doğru, kontrast testleri geçiyor. ★ Kullanıcı: renk kararı (K2) + katalogun Stitch'e sadakati.

**Faz 3 — Backend iskeleti, veritabanı, kimlik doğrulama**
Çözüm yapısı; PostgreSQL bağlantısı; ilk migration; Identity; JWT+refresh rotasyon; e-posta doğrulama kodu; parola sıfırlama; rate limit; dev gelen kutusu; sağlık uç noktası; OpenAPI; denetim kaydı; birim+entegrasyon testleri. Kabul: kimlik doğrulama akışı testlerle ve `curl`/HTTP istemcisiyle kanıtlı.

**Faz 4 — Navigasyon, 52 ekranın iskeleti ve kimlik ekranları**
Gezinti mimarisi (9.1) + tipli rotalar + deep link; **bütün 52 ekran** tasarıma sadık görsel iskelet (ekran okuma → bileşenler); yer tutucu veriler yalnızca `__DEV__` "tasarım önizleme" modunda ve **etiketli**; A grubu (01–12) **gerçek API'ye bağlı** ve uçtan uca çalışır; API istemcisi (token ekleme, yenileme, hata normalizasyonu); `NAVIGATION_MAP.md`. Kabul: telefonda kayıt → e-posta kodu (dev gelen kutusundan) → giriş → profil akışı çalışıyor; hiçbir ekran bağlantısız değil.

**Faz 5 — Aile alanları, davet ve roller**
11, 12, 35, 36, 37, 42(aile değiştirme); sunucu yetki matrisi + testler; davet kodu/bağlantı; Owner devri. Kabul: iki test hesabı ile davet-kabul-rol akışı cihazda; yetkisiz eylemler sunucuda reddediliyor (test kanıtı).

**Faz 6 — Aile bireyleri ve soy ağacı ★**
Persons/relationships, döngü engeli, kopya/birleştirme, ağaç API'si; 16–19, 17-B; yerleşim algoritması, zoom/pan, dal daraltma, liste alternatifi; DemoSeed ağacı; 500+ kişi performans testi. Kabul: gerçek verilerle çok-eşli/evlat edinmeli ağaç doğru çiziliyor, cihazda akıcı. ★ **İlk anlamlı dikey dilim**: kullanıcı kayıt → aile → kişi → soy ağacını cihazda dener.

**Faz 7 — Medya altyapısı ve fotoğraf arşivi**
Ortak medya hattı (8.4); 28–31, 17-B, 21-B(fotoğraf yorumları); çoklu yükleme, ilerleme, yeniden dene, EXIF temizleme, küçük resim, etiketleme, albüm izinleri, çöp kutusu. Kabul: cihazdan gerçek fotoğraf yükleme/görüntüleme; EXIF/GPS silindiği testle kanıtlı; başka ailenin medyasına erişim 403/404.

**Faz 8 — Hatıralar ve yorumlar**
20–23, 21-B; görünürlük, arama/filtre, bağlamalar, taslak, sürüm çakışması. Kabul: oluştur/düzenle/sil/geri al, yorumlar, yetki matrisi cihazda.

**Faz 9 — Ses kayıtları ve oynatıcı ★**
24–27, 26-B; 9.6'nın tamamı; waveform; transkript düzenleme; uyku zamanlayıcı. Kabul: gerçek cihazda kayıt/duraklat/devam/bitir/yükle/dinle; kesinti ve arka plan davranışı ölçülmüş ve raporlanmış. ★ Kullanıcı: "kaydı yapıp dinleyerek ses kalitesini onayla".

**Faz 10 — Zaman çizelgesi, arama, bildirimler, aktivite**
32–34, 38–39, 13–15; Türkçe arama normalizasyonu testleri; bildirim üretimi. Kabul: arama ı/İ/ş/ğ doğru; akış ve bildirimler gerçek olaylardan.

**Faz 11 — Ayarlar, gizlilik, dışa aktarma, hesap silme**
40–44; oturum listesi, parola değiştirme, dışa aktarma ZIP doğrulaması (içerik açılıyor), hesap silme akışı, KVKK metinleri ve onay sürümleri. Kabul: dışa aktarılan ZIP gerçekten açılıp doğrulanıyor.

**Faz 12 — Çevrimdışı, performans, erişilebilirlik**
9.7'nin tamamı; 45–48 çevrimdışı ekranları gerçek kuyrukla; yazı ölçeği 1,3×/2× taşma taraması; TalkBack; dokunma hedefi taraması; bellek/fps ölçümü; açılış süresi. Kabul: uçak modunda senaryolar cihazda; kuyruk yeniden açılışta korunuyor.

**Faz 13 — Entegrasyon, güvenlik, uçtan uca testler**
Tam regresyon; IDOR/yetki test paketi; bağımlılık zafiyet taraması; gizli taraması; log PII taraması; her ekran için görsel QA (cihaz ekran görüntüsü vs `screen.png`) → `docs/visual-qa/`; `ACCEPTANCE_MATRIX.md` doldurma. Kabul: kritik testler yeşil; açık kritik/yüksek hata yok.

**Faz 14 — Release ★**
Release derlemesi: R8/minify doğrulama, `usesCleartextTraffic=false`, sürüm kodu/adı, ikon/splash; `scripts/build-release.ps1`; **keystore (onay)**; imzalı APK + AAB; cihaza kur ve temel akışları çalıştır. Not: bulut backend yokken yerel doğrulama için `releaseLocal` varyantı (release optimizasyonlu, yalnızca localhost'a cleartext izinli, **yayınlanamaz** etiketli) ve `API_BASE_URL` yapılandırılabilir. `RELEASE.md`: Google Play gereksinimleri (hedef API, veri güvenliği formu, gizlilik politikası URL'si, 20+ test kullanıcısı politikasını **güncel kaynaktan doğrula**), yedekleme/geri yükleme, sonraki adımlar. ★ Kullanıcı: son kabul.

---

# BÖLÜM 14 — OTURUM PROTOKOLÜ VE RAPOR

## 14.1 Her oturumun başı
`git status`, `git log -5`, `docs/NEXT_SESSION.md` ve `IMPLEMENTATION_PROGRESS.md` oku; çalışan şeyleri doğrula (derleme + hızlı test); planı 5–10 satırda yaz; sonra çalış.

## 14.2 Commit disiplini
Küçük, anlamlı commit'ler (`feat:`, `fix:`, `test:`, `docs:`, `chore:`); faz sonunda etiket `phase-N`. Uzak depoya push yok (onay). Gizli bilgi commit'lenmez.

## 14.3 Oturum/faz sonu raporu (zorunlu şablon)
```
FAZ/OTURUM: <ad>   TARİH: <...>
Tamamlanan işler:
Değiştirilen dosyalar (özet):
Çalıştırılan komutlar (önemli olanlar):
Başarılı testler (sayı + komut):
Başarısız/atlanan testler (neden):
Cihazda DOĞRULANANLAR (cihaz, Android, adımlar):
Cihazda DOĞRULANMAYANLAR:
Bilinen sorunlar:
Sonraki adım:
Kullanıcı onayı/doğrulaması gerektirenler:
```
Rapor `IMPLEMENTATION_PROGRESS.md`'ye eklenir; kullanıcıya kısa özeti verilir.

## 14.4 Bağlam sınırına yaklaşırken
Yarım bırakma. Mevcut alt adımı güvenli noktaya getir, testleri çalıştır, commit at, `NEXT_SESSION.md`'ye: nerede kalındı, sıradaki 5–10 somut adım, açık hatalar, çalıştırılacak doğrulama komutları, bekleyen onaylar yaz.

---

# BÖLÜM 15 — KABUL KRİTERLERİ (tamamlanma tanımı)

Proje yalnızca aşağıdakilerin **hepsi kanıtlandığında** tamamlanmış sayılır ve her biri `ACCEPTANCE_MATRIX.md`'de kanıt bağlantısıyla işaretlenir:

1. 52 tasarım öğesi (48 + 17-B/21-B/26-B + UI Kit karşılığı) uygulanmış.
2. Ekranlar Stitch tasarımına görsel olarak sadık (görsel QA arşivi).
3. Bütün butonlar/gezinti çalışıyor; ölü kontrol yok.
4. Kayıt, doğrulama, giriş, çıkış, parola sıfırlama çalışıyor.
5. Aile alanları, üyelikler, davet ve roller yönetilebiliyor.
6. Soy ağacı gerçek verilerle (çoklu evlilik, evlat edinme, vefat dahil) çalışıyor.
7. Hatıralar oluşturulup yönetilebiliyor; yorumlar çalışıyor.
8. Fotoğraflar güvenle yüklenip görüntülenebiliyor (EXIF temiz, küçük resim).
9. Ses kayıtları oluşturulup oynatılabiliyor (cihazda doğrulanmış).
10. Zaman çizelgesi çalışıyor.
11. Arama ve filtreleme (Türkçe karakter doğruluğu) çalışıyor.
12. Roller/izinler **backend'de** uygulanıyor (testle kanıtlı).
13. Hata, boş, yükleniyor, çevrimdışı durumları ele alınıyor.
14. Kullanıcı/aile verisi izolasyonu testle kanıtlı.
15. Fiziksel Android cihaz testleri tamamlanmış ve raporlanmış.
16. Kritik otomatik testler geçiyor.
17. İmzalı release APK/AAB üretilmiş ve cihazda çalıştırılmış.
18. Dokümantasyon güncel ve gerçeği yansıtıyor.
19. Bilinen eksikler `KNOWN_ISSUES.md`'de açıkça yazılı.
20. Kullanıcıya çalışan ve **doğrulanmış** bir uygulama teslim edilmiş.

Gerçekten test edilmeden hiçbir madde işaretlenmez.

---

# BÖLÜM 16 — MALİYET VE ALTYAPI (`docs/COSTS_AND_INFRA.md`'ye yaz)

Önce yerel geliştirme ve fiziksel cihaz. Bulut geçişi sonraya. Şu kalemler için **güncel resmi fiyat/sınır kaynaklarını araştır** ve ücretsiz/düşük maliyetli seçenekleri sınırlarıyla (depolama, bant genişliği, kullanım, güvenlik) yaz: backend barındırma, PostgreSQL barındırma, foto/ses depolama, yedekleme, e-posta gönderimi, push (FCM), transkripsiyon, alan adı, TLS, Google Play yayını. Hiçbir ücretli servisi onaysız etkinleştirme.

---

# BÖLÜM 17 — YASAKLAR (özet)

- Android Studio kurmak; Expo Go'ya bağımlı çalışmak; WebView ile ekran yapmak; Tailwind CDN/uzak font/uzak görsel kullanmak.
- Doğrulamadan "tamam/çalışıyor" demek; sahte veri/sahte başarı/ölü buton.
- Yetkiyi yalnızca istemcide uygulamak; token'ı AsyncStorage'a yazmak; sırları koda/depoya yazmak; PII loglamak.
- Doğrulanmamış "uçtan uca/256-bit" ifadeleri.
- Onaysız: yıkıcı komut, kalıcı sistem değişikliği, ücretli servis, push, keystore, `applicationId` değişikliği, DB sıfırlama.
- Kurulu aracı yeniden kurmak; gereksiz bağımlılık eklemek; çalışan kodu gerekçesiz yeniden yazmak.
- Tek devasa değişiklikle her şeyi üretmeye çalışmak (faz/adım disiplinine uy).

---

# BÖLÜM 18 — İLK OTURUM İÇİN KESİN TALİMAT (şimdi başla)

1. Bu belgeyi baştan sona oku. `C:\dev` ve `C:\dev\kok` var mı bak (varsa içeriği incele, mevcut işi koru).
2. **Faz 0'ı başlat:** `scripts/audit-env.ps1` yaz ve çalıştır (salt-okunur). Çıktıyı `docs/ENV_AUDIT.md`'ye işle.
3. A/B/C listesini çıkar; C (eksik kurulumlar) için **tek bir toplu onay isteği** hazırla ve kullanıcıya sun. Onaydan sonra kur, `env.ps1` yaz.
4. ZIP'i bul/aç, salt okunur yap; `DECISIONS.md` ve `SCREEN_INVENTORY.md` iskeletini oluştur.
5. Faz 0 kabul koşullarını doğrula, rapor yaz, commit at; ardından **Faz 1'e kendiliğinden geç** ve ★ kapısına kadar ilerle.
6. Kullanıcıdan yalnızca Bölüm 1.4 ve Bölüm 13'teki ★ durumlarda girdi iste; diğer her şeyi kendin çöz.

Öncelik sırası: **Doğru ortam → doğru mimari → tasarıma sadık uygulama → gerçek işlevler → test → güvenli yayın.** Acele edip eksik uygulama üretme.