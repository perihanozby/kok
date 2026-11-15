# Kabul matrisi

Hiçbir kabul maddesi henüz tamamlanmadı. Donanım/ADB kontrolleri uygulama doğrulaması değildir.

| Kriter | Durum | Kanıt |
|---|---|---|
| 1. 52 tasarım öğesi (48 + 17-B/21-B/26-B + UI Kit karşılığı) uygulanmış. | Bekliyor | Yok |
| 2. Ekranlar Stitch tasarımına görsel olarak sadık (görsel QA arşivi). | Bekliyor | Yok |
| 3. Bütün butonlar/gezinti çalışıyor; ölü kontrol yok. | Bekliyor | Yok |
| 4. Kayıt, doğrulama, giriş, çıkış, parola sıfırlama çalışıyor. | Bekliyor | Yok |
| 5. Aile alanları, üyelikler, davet ve roller yönetilebiliyor. | Bekliyor | Yok |
| 6. Soy ağacı gerçek verilerle (çoklu evlilik, evlat edinme, vefat dahil) çalışıyor. | Bekliyor | Yok |
| 7. Hatıralar oluşturulup yönetilebiliyor; yorumlar çalışıyor. | Bekliyor | Yok |
| 8. Fotoğraflar güvenle yüklenip görüntülenebiliyor (EXIF temiz, küçük resim). | Bekliyor | Yok |
| 9. Ses kayıtları oluşturulup oynatılabiliyor (cihazda doğrulanmış). | Bekliyor | Yok |
| 10. Zaman çizelgesi çalışıyor. | Bekliyor | Yok |
| 11. Arama ve filtreleme (Türkçe karakter doğruluğu) çalışıyor. | Bekliyor | Yok |
| 12. Roller/izinler **backend'de** uygulanıyor (testle kanıtlı). | Bekliyor | Yok |
| 13. Hata, boş, yükleniyor, çevrimdışı durumları ele alınıyor. | Bekliyor | Yok |
| 14. Kullanıcı/aile verisi izolasyonu testle kanıtlı. | Bekliyor | Yok |
| 15. Fiziksel Android cihaz testleri tamamlanmış ve raporlanmış. | Bekliyor | Yok |
| 16. Kritik otomatik testler geçiyor. | Bekliyor | Yok |
| 17. İmzalı release APK/AAB üretilmiş ve cihazda çalıştırılmış. | Bekliyor | Yok |
| 18. Dokümantasyon güncel ve gerçeği yansıtıyor. | Bekliyor | Yok |
| 19. Bilinen eksikler `KNOWN_ISSUES.md`'de açıkça yazılı. | Bekliyor | Yok |
| 20. Kullanıcıya çalışan ve **doğrulanmış** bir uygulama teslim edilmiş. | Bekliyor | Yok |

| Tasarım kaynağı | Kodlandı | Otomatik test | Cihazda doğrulandı |
|---|---|---|---|
| 01_a_l_ekran_splash | Hayır | Hayır | Hayır |
| 02_onboarding_aile_hat_ralar | Hayır | Hayır | Hayır |
| 03_onboarding_sesli_hik_yeler | Hayır | Hayır | Hayır |
| 04_onboarding_zel_aile_alan | Hayır | Hayır | Hayır |
| 05_dil_se_imi | Hayır | Hayır | Hayır |
| 06_giri_yap | Hayır | Hayır | Hayır |
| 07_hesap_olu_tur | Hayır | Hayır | Hayır |
| 08_ifremi_unuttum | Hayır | Hayır | Hayır |
| 09_hesap_do_rulama | Hayır | Hayır | Hayır |
| 10_ki_isel_profil_olu_tur | Hayır | Hayır | Hayır |
| 11_aile_alan_olu_tur | Hayır | Hayır | Hayır |
| 12_aile_alan_na_davetle_kat_l | Hayır | Hayır | Hayır |
| 13_ana_sayfa_home_dashboard | Hayır | Hayır | Hayır |
| 14_aile_aktivite_ak | Hayır | Hayır | Hayır |
| 15_bildirimler | Hayır | Hayır | Hayır |
| 16_etkile_imli_aile_soy_a_ac | Hayır | Hayır | Hayır |
| 17_aile_bireyi_detay_profili | Hayır | Hayır | Hayır |
| 17_b_aile_bireyi_foto_raf_galerisi | Hayır | Hayır | Hayır |
| 18_yeni_aile_bireyi_ekleme | Hayır | Hayır | Hayır |
| 19_aile_bireyi_d_zenleme | Hayır | Hayır | Hayır |
| 20_hat_ralar_k_t_phanesi | Hayır | Hayır | Hayır |
| 21_b_yorum_ekleme_modal | Hayır | Hayır | Hayır |
| 21_hat_ra_detay | Hayır | Hayır | Hayır |
| 22_yeni_hat_ra_olu_tur | Hayır | Hayır | Hayır |
| 23_hat_ra_d_zenleme | Hayır | Hayır | Hayır |
| 24_sesli_hik_yeler_k_t_phanesi | Hayır | Hayır | Hayır |
| 25_ses_kay_t_st_dyosu_voice_recording_studio | Hayır | Hayır | Hayır |
| 26_b_gece_dinleme_modu_ses_oynat_c | Hayır | Hayır | Hayır |
| 26_ses_oynat_c | Hayır | Hayır | Hayır |
| 27_ses_kayd_detay | Hayır | Hayır | Hayır |
| 28_foto_raf_alb_mleri | Hayır | Hayır | Hayır |
| 29_alb_m_detay | Hayır | Hayır | Hayır |
| 30_foto_raf_detay | Hayır | Hayır | Hayır |
| 31_foto_raf_y_kleme | Hayır | Hayır | Hayır |
| 32_aile_zaman_izelgesi | Hayır | Hayır | Hayır |
| 33_yeni_zaman_izelgesi_olay | Hayır | Hayır | Hayır |
| 34_zaman_izelgesi_olay_detay | Hayır | Hayır | Hayır |
| 35_aile_yeleri_ve_davetler | Hayır | Hayır | Hayır |
| 36_aile_yesi_davet_etme | Hayır | Hayır | Hayır |
| 37_roller_ve_i_zinler | Hayır | Hayır | Hayır |
| 38_genel_arama | Hayır | Hayır | Hayır |
| 39_filtrelenmi_arama_sonu_lar | Hayır | Hayır | Hayır |
| 40_profilim | Hayır | Hayır | Hayır |
| 41_profil_d_zenleme | Hayır | Hayır | Hayır |
| 42_ayarlar | Hayır | Hayır | Hayır |
| 43_gizlilik_ve_g_venlik | Hayır | Hayır | Hayır |
| 44_aile_verilerini_d_a_aktarma | Hayır | Hayır | Hayır |
| 45_bo_durum | Hayır | Hayır | Hayır |
| 46_y_kleniyor | Hayır | Hayır | Hayır |
| 47_hata_durumu | Hayır | Hayır | Hayır |
| 48_evrimd_durum | Hayır | Hayır | Hayır |
| k_k_ui_kit_tasar_m_sistemi_dok_mantasyonu | Hayır | Hayır | Hayır |
