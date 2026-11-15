# Güvenlik modeli

Durum: tam uygulama güvenlik modeli henüz uygulanmadı. Backend/kimlik doğrulama/veri izolasyonu yok; bu dosya üretim güvencesi değildir.

İlk Android yapılandırmasında yedekleme kapalı, main manifest cleartext kapalı; debug varyantında ağ güvenlik yapılandırması cleartext'i yalnızca localhost/127.0.0.1/::1 için açar. Config plugin ile tekrar üretilebilir. Bunlar kaynak düzeyinde doğrulandı; derlenmiş APK manifesti ve cihaz henüz doğrulanmadı.

Uygulamada E2EE yoktur; 256-bit/E2EE iddiası eklenmedi. TLS ve sunucuda depolama/erişim güvenliği backend fazlarında uygulanıp test edilecek. Mevcut başlangıç ekranı gerçek kullanıcı verisi işlemez.

Yerel geliştirmede disk şifrelemesi/BitLocker değerlendirmesi kullanıcıya aittir; sistem yapılandırması değiştirilmedi. KVKK aydınlatma ve rıza metinleri ileride şablon/sürümleme ile hazırlanacak ve **hukuki inceleme gerektirecek**.

Son bağımlılık raporu: docs/npm-audit.json. Sekiz düşük düzey bulgu açık; orta/yüksek/kritik yok. scripts/scan-secrets.mjs bilinen credential/private-key imzalarını değerleri loglamadan tarar; tam güvenlik incelemesinin yerine geçmez.
