# Android test raporu

15 Kasım 2026: Redmi Note 9S, Android 11/API 30, arm64-v8a.

Doğrulananlar: ADB algılama ve yetki (`device`), mikrofon özelliği, ekran boyutu/yoğunluğu, depolama, ardışık üç USB get-state kontrolü.

Doğrulanmayanlar: APK derleme/kurulum/açılış, Metro, API reverse bağlantısı, kullanıcı akışları, ses kalitesi, çevrimdışı davranış, erişilebilirlik, görsel sadakat, release. ADB bağlantısı uygulama testi sayılmadı.

Yerel debug derleme denemesi (Expo 58 / RN 0.88.1 / AGP 9.2.1 / Gradle 9.4.1 / JDK17): 32 Gradle eklenti görevi çalıştırıldı; 8 dk 30 sn sonunda `:expo:compileDebugJavaWithJavac` bağımlılık çözümlemesi eksik Build-Tools 36.0.0 nedeniyle başarısız oldu. Otomatik SDK kurulumu kapalıydı. APK kurulumu veya uygulama açılışı yapılmadı. Bu derleme başarısızdır; kullanıcı onayından sonra paket kurulup yeniden denenecek.
