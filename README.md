# AIZone Marketing — Client Intelligence Platform Dashboard

Dashboard interaktif multi-halaman yang memecah laporan audit klien 1 halaman menjadi 16 menu terstruktur sesuai sketsa perencanaan.

## 🚀 Cara Menjalankan Proyek

1. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Akses di browser melalui URL lokal yang muncul (default: `http://localhost:5173`).

2. **Build untuk produksi**:
   ```bash
   npm run build
   ```

3. **Preview build produksi**:
   ```bash
   npm run preview
   ```

---

## 📂 Struktur Menu (16 Halaman)

1. **OVERVIEW**: Ringkasan eksekutif AI site audit, skor crawl 73/100, 4 kartu KPI utama (Open Tasks, Confirmed, High Priority, Active Connections), serta perbandingan lintas kanal (GA4, GSC, PageSpeed, Screaming Frog).
2. **WEBSITE**: Data GA4 Top Pages (67 URL, sesi, user, rasio engagement), Core Web Vitals Mobile (67) vs Desktop (85), dan tabel Tracked Pages mingguan.
3. **SEARCH MGKT**: Google Search Console (Kueri pencarian organik), Screaming Frog Site Audit (skor crawl, 9 jenis isu teknis, riwayat crawl mingguan, detail 24+ URL), serta area dropzone CSV Keywords (SEMrush) & Backlinks (Ahrefs).
4. **PAID MEDIA**: *Placeholder elegan* untuk kampanye iklan Google Ads & Meta Ads, lengkap dengan kartu task terkait iklan dari audit.
5. **SOCIAL MEDIA**: *Placeholder elegan* untuk analitik akun sosial media organik.
6. **EMAIL MGKT**: *Placeholder elegan* untuk integrasi platform email newsletter (Klaviyo, Mailchimp, dsb.).
7. **CRO**: *Placeholder elegan* untuk eksperimen konversi & heatmaps (terhubung ke Microsoft Clarity).
8. **STRATEGIES**: *Placeholder elegan* untuk roadmap strategi pemasaran kuartalan dan target KPI.
9. **REPORTS**: *Placeholder elegan* untuk arsip unduhan laporan bulanan PDF klien.
10. **BRAND BRIEF**: *Placeholder elegan* untuk panduan brand identity, persona, dan tone of voice.
11. **ACTIONABLE ITEMS**: Antarmuka fokus untuk task berstatus *Generated* dari hasil audit AI dan task *Awaiting Approval*.
12. **TASK DB**: Database sentral 17 task lengkap dengan filter Lane (Content vs Technical), Status, pencarian, pembuatan task baru, dan ekspor CSV.
13. **CONNECTIONS**: Tampilan 5 integrasi aktif (GA4, GSC, PSI, Screaming Frog, Microsoft Clarity) dan slot platform tambahan.
14. **NOTIFICATIONS**: Feed log audit otomatis sistem, lonjakan traffic, dan peringatan teknis.
15. **IMAGES / GRAPHICS**: *Placeholder elegan* untuk repositori aset kreatif grafis klien.
16. **VIDEOS**: *Placeholder elegan* untuk repositori video materi promosi dan reels.

---

## 🛠️ Teknologi yang Digunakan
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
