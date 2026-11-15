# Bilinen eksikler

- Hazırlık aşaması: uygulama özellikleri, backend, veritabanı migration'ları ve otomatik uygulama testleri henüz geliştirilmedi.
- APK henüz üretilmedi; hiçbir uygulama akışı cihazda doğrulanmadı.
- Tam HTML+PNG görsel analizi yapılmadı. `SCREEN_INVENTORY.md` yalnızca doğrulanmış dosya dizini ve ham HTML başlıkları içeriyor.
- Windows uzun yolları kapalı; mevcut çalışma kökü kısa öneri yolundan uzun. Native build etkisi henüz bilinmiyor.
- RAM sınırlı, telefon depolaması %99 dolu; derleme ve medya testlerinde ölçüm gerektiriyor.
- PostgreSQL uygulama kimliği/test DB bağlantısı henüz kurulmadı. Mevcut kullanıcı veritabanlarına dokunulmadı.
- Son gerçek `npm ci --ignore-scripts --include=dev` kurulumu başarılı; ardından npm audit **8 düşük, 0 orta/yüksek/kritik** raporladı. Sekiz bulgu deepmerge ve ona bağımlı araç zincirine ait. deepmerge için registry'de yamalı latest henüz yok; audit'in Jest25'e gerileme önerisi Expo58 ile uyumlu olmadığından uygulanmadı. Rapor docs/npm-audit.json. Tarama açık bulgu nedeniyle exit1 döndürür; sıfır açık diye raporlanmadı.
- İlk native derlemenin eksik Build-Tools36.0.0 sorunu kullanıcı onayıyla kurulum yapılarak giderildi. Yeniden APK derleme sonucu Faz1 kapsamında bekleniyor; başka SDK paketi kurulmadı.
- Expo'nun resmi şablon/eklenti kaynaklarında AGP9 legacy DSL ve ESLint9 destek-sonu uyarıları bulunuyor. İlk APK kanıtı alınmadan sürüm yükseltmesiyle örtülmedi.
