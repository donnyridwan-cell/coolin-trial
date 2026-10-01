import React from 'react';
import { X, CheckCircle2, Clock, Sparkles, ArrowRight, LayoutGrid } from 'lucide-react';
import { MenuId } from '../../types';

interface MappingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMenu: (id: MenuId) => void;
}

export const MappingModal: React.FC<MappingModalProps> = ({
  isOpen,
  onClose,
  onSelectMenu,
}) => {
  if (!isOpen) return null;

  const mappingRules: {
    menu: string;
    id: MenuId;
    status: 'populated' | 'placeholder';
    sources: string;
    description: string;
  }[] = [
    {
      menu: 'OVERVIEW',
      id: 'overview',
      status: 'populated',
      sources: 'PDF Hal 1 (AI Site Audit & Metric Summary)',
      description:
        'Ringkasan eksekutif AI site audit, skor crawl 73/100, 4 kartu metrik utama (12 Open Tasks, 5 Confirmed, 3 High Priority, 5/5 Active Connections), serta cuplikan cepat performa GA4, GSC, PageSpeed, dan Crawl.',
    },
    {
      menu: 'WEBSITE',
      id: 'website',
      status: 'populated',
      sources: 'PDF Hal 1, 2 (GA4 Top Pages & PageSpeed Core Web Vitals)',
      description:
        'Tabel GA4 Top Pages (67 URL, sesi, user, rasio engagement), metrik Core Web Vitals Mobile vs Desktop (LCP, CLS, TBT, FCP), dan tabel 6 Tracked Pages mingguan.',
    },
    {
      menu: 'SEARCH MGKT',
      id: 'search-marketing',
      status: 'populated',
      sources: 'PDF Hal 2, 3, 4, 5 (GSC Queries, Screaming Frog Audit, Crawl URLs, SEMrush, Ahrefs)',
      description:
        'Search marketing menyeluruh: GSC Search Queries (klik, impresi, posisi), Screaming Frog Site Audit (skor crawl, 9 jenis issue, riwayat crawl), detail 24+ URL crawl, serta area import CSV Keywords (SEMrush) & Backlinks (Ahrefs).',
    },
    {
      menu: 'PAID MEDIA',
      id: 'paid-media',
      status: 'placeholder',
      sources: 'Tidak ada data metrik di PDF (Hanya ada task ads di Hal 6)',
      description:
        'Dibuat halaman kosong/placeholder elegan dengan integrasi Google Ads & Meta Ads, serta menghubungkan 3 task terkait ads dari Hal 6 (AIZ_Set up ads accounts, decide Google or Meta, set up Google Ads).',
    },
    {
      menu: 'SOCIAL MEDIA',
      id: 'social-media',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) dengan opsi menghubungkan profil Instagram, LinkedIn, TikTok, & YouTube untuk pelacakan konten organik.',
    },
    {
      menu: 'EMAIL MGKT',
      id: 'email-marketing',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) untuk integrasi newsletter / email marketing (Klaviyo, Mailchimp, Brevo).',
    },
    {
      menu: 'CRO',
      id: 'cro',
      status: 'placeholder',
      sources: 'Terkait Microsoft Clarity di PDF Hal 1',
      description:
        'Halaman kosong untuk Conversion Rate Optimization & eksperimen A/B testing (Microsoft Clarity sudah terhubung di background untuk heatmaps).',
    },
    {
      menu: 'STRATEGIES',
      id: 'strategies',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) untuk roadmap strategi digital marketing, target triwulan, dan SEO pillars.',
    },
    {
      menu: 'REPORTS',
      id: 'reports',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) untuk unduhan laporan bulanan klien, arsip PDF, dan jadwal laporan mingguan otomatis.',
    },
    {
      menu: 'BRAND BRIEF',
      id: 'brand-brief',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) untuk panduan merek, target persona, value proposition, dan guideline tone of voice.',
    },
    {
      menu: 'ACTIONABLE ITEMS',
      id: 'actionable-items',
      status: 'populated',
      sources: 'PDF Hal 6 (Task berstatus Generated & Awaiting Approval)',
      description:
        'Tampilan fokus khusus untuk tindakan mendesak: 5 task generated dari audit AI yang menunggu disposisi, 1 task awaiting approval, dan task berprioritas tinggi.',
    },
    {
      menu: 'TASK DB',
      id: 'task-db',
      status: 'populated',
      sources: 'PDF Hal 6 (ALL TASKS 13 of 17 baris + Task Audit Crawl)',
      description:
        'Database tugas lengkap dengan filter Lane (Content vs Technical), Status (Generated, Assigned, Awaiting, Completed), pencarian, tombol tambah task, dan ekspor CSV.',
    },
    {
      menu: 'CONNECTIONS',
      id: 'connections',
      status: 'populated',
      sources: 'PDF Hal 1 (ACTIVE CONNECTIONS 5/5: GA4, GSC, PSI, SF, Clarity)',
      description:
        'Pusat integrasi yang menampilkan status koneksi 5 layanan aktif yang disebutkan di dokumen: GA4, Search Console, PageSpeed, Screaming Frog, dan Clarity, ditambah opsi integrasi SEMrush & Ads.',
    },
    {
      menu: 'NOTIFICATIONS',
      id: 'notifications',
      status: 'populated',
      sources: 'Otomatis dari hasil audit (Crawl alert, Traffic surge, Pending approval)',
      description:
        'Pusat notifikasi log audit sistem, peringatan mobile LCP lambat, dan pengingat approval task.',
    },
    {
      menu: 'IMAGES / GRAPHICS',
      id: 'images-graphics',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) untuk repositori aset kreatif grafis, banner iklan, dan materi visual klien.',
    },
    {
      menu: 'VIDEOS',
      id: 'videos',
      status: 'placeholder',
      sources: 'Tidak ada data di PDF',
      description:
        'Halaman kosong (placeholder) untuk repositori video reels, promosi, dan aset video marketing.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0px_20px_50px_rgba(15,23,42,0.15)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a]">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0f172a] flex items-center gap-2">
                Pemetaan Menu & Konten PDF
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                  16 Menu Catatan Tangan
                </span>
              </h2>
              <p className="text-xs text-[#64748b]">
                Analisis pembagian isi PDF 1 halaman ke menu multi-halaman
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[8px] text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#475569] leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#0f172a] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0f172a]">Prinsip Pemetaan:</strong> Semua data riil dari 6 halaman PDF telah diekstrak dan didistribusikan ke menu yang relevan. Menu yang belum memiliki data di PDF (seperti Paid Media, Social Media, Email, Brand Brief, dsb.) disiapkan sebagai <span className="text-[#0f172a] font-semibold underline">Clean Placeholder / Empty State</span> agar struktur menu siap digunakan begitu data tersedia.
            </div>
          </div>

          <div className="border border-[#e2e8f0] rounded-[10px] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Menu Tangan</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Sumber di PDF</th>
                  <th className="py-2.5 px-3">Rincian Konten</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
                {mappingRules.map((rule) => (
                  <tr
                    key={rule.id}
                    className="hover:bg-[#f8fafc] transition-colors group cursor-pointer"
                    onClick={() => {
                      onSelectMenu(rule.id);
                      onClose();
                    }}
                  >
                    <td className="py-3 px-3 font-semibold text-[#0f172a]">
                      {rule.menu}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {rule.status === 'populated' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                          <CheckCircle2 className="w-3 h-3 text-[#0f172a]" /> Berisi Konten
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]">
                          <Clock className="w-3 h-3" /> Placeholder
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#64748b]">
                      {rule.sources}
                    </td>
                    <td className="py-3 px-3 text-[#475569] leading-normal max-w-xs">
                      {rule.description}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectMenu(rule.id);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-white hover:bg-[#0f172a] hover:text-white text-[#0f172a] border border-[#e2e8f0] transition-all text-[11px] font-medium"
                      >
                        Buka <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[#e2e8f0] bg-white flex items-center justify-between text-xs text-[#64748b]">
          <span>Total: 16 Halaman Menu Terstruktur</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white font-medium text-xs transition-colors shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
