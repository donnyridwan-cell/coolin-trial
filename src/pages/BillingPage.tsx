import React from 'react';
import { CreditCard, ExternalLink, RefreshCw, AlertTriangle, Calendar, Building2 } from 'lucide-react';

const SUBSCRIPTION = {
  plan: 'SEO',
  type: 'Recurring',
  subServices: ['SEO', 'GEO / AI Search', 'Off-Page SEO & Authority', 'On-Page SEO', 'Technical SEO'],
  subNote: '4 sub-services are included in SEO — not billed separately.',
  price: '$499.00',
  cadence: 'monthly',
  provider: 'Stripe',
  status: 'Incomplete Expired',
  started: 'Sep 7, 2026',
};

export const BillingPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">Billing</h1>
        <p className="text-sm text-[#64748b] mt-1 leading-relaxed">
          What this client is subscribed to. Payments and invoice history live in{' '}
          <span className="font-semibold text-[#0f172a]">Admin · Billing</span> — the money moves at
          Stripe, and a row appears here only once Stripe confirms it.
        </p>
      </div>

      {/* Subscription card */}
      <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#64748b]">
            Active subscription
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]">
            <AlertTriangle className="w-3 h-3" />
            {SUBSCRIPTION.status}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            {/* Plan + sub-services */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">{SUBSCRIPTION.plan}</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                  {SUBSCRIPTION.type}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {SUBSCRIPTION.subServices.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-[6px] bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#94a3b8] mt-2.5">{SUBSCRIPTION.subNote}</p>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <div className="text-3xl font-bold text-[#0f172a] tracking-tight leading-none">
                {SUBSCRIPTION.price}
              </div>
              <div className="text-xs text-[#64748b] mt-1">/ {SUBSCRIPTION.cadence}</div>
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#f1f5f9]">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1">
                <Building2 className="w-3 h-3" /> Provider
              </div>
              <div className="text-sm font-medium text-[#0f172a]">{SUBSCRIPTION.provider}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1">
                <AlertTriangle className="w-3 h-3" /> Status
              </div>
              <div className="text-sm font-medium text-[#dc2626]">{SUBSCRIPTION.status}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] mb-1">
                <Calendar className="w-3 h-3" /> Started
              </div>
              <div className="text-sm font-medium text-[#0f172a]">{SUBSCRIPTION.started}</div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-[#64748b]">Managed in Stripe · syncs automatically</span>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white hover:bg-white border border-[#e2e8f0] text-xs font-medium text-[#475569] hover:text-[#0f172a] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.02)]">
              <RefreshCw className="w-3.5 h-3.5 text-[#94a3b8]" />
              Refresh from Stripe
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors shadow-xs">
              Open in Admin · Billing
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment & invoices note */}
      <div className="flex items-start gap-2.5 p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
        <CreditCard className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
        <p className="text-xs text-[#475569] leading-relaxed">
          Payments and invoice history are not shown on this page. They live in{' '}
          <span className="font-semibold text-[#0f172a]">Admin · Billing</span>, and a row appears here
          only once Stripe confirms the charge.
        </p>
      </div>
    </div>
  );
};
