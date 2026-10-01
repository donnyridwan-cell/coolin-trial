import React from 'react';
import {
  Unplug,
  CheckCircle,
  RefreshCw,
  Plus,
  BarChart3,
  Search,
  Gauge,
  Bug,
  Eye,
  TrendingUp,
  Link2,
  Megaphone,
  Target,
} from 'lucide-react';
import { CONNECTIONS } from '../data/mockData';

export const ConnectionsPage: React.FC = () => {
  const activeConnections = CONNECTIONS.filter((c) => c.status === 'connected');
  const otherConnections = CONNECTIONS.filter((c) => c.status !== 'connected');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Search':
        return <Search className="w-4 h-4" />;
      case 'Gauge':
        return <Gauge className="w-4 h-4" />;
      case 'Bug':
        return <Bug className="w-4 h-4" />;
      case 'Eye':
        return <Eye className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      case 'Link2':
        return <Link2 className="w-4 h-4" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4" />;
      case 'Target':
        return <Target className="w-4 h-4" />;
      default:
        return <Unplug className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-[#0f172a] tracking-tight">Active Integrations & APIs</h2>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
              5/5 Active Connections
            </span>
          </div>
          <p className="text-xs text-[#64748b] mt-1 max-w-xl leading-relaxed">
            Live telemetry data feeds powering the automated audit scores, task generation, and client performance views.
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] text-[#0f172a] text-xs font-semibold border border-[#e2e8f0] transition-colors shadow-xs">
          <RefreshCw className="w-3.5 h-3.5 text-[#64748b]" />
          Sync All Data Now
        </button>
      </div>

      {/* 5 Connected Services */}
      <div>
        <h3 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3 flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5" />
          Active Connected Data Sources (5)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeConnections.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" />
                    Connected
                  </span>
                </div>

                <div className="text-sm font-bold text-[#0f172a]">{item.name}</div>
                <div className="text-xs text-[#64748b] mt-0.5">{item.service}</div>

                <div className="mt-3.5 p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#475569] font-mono">
                  {item.account}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b]">
                <span>Last sync: {item.lastSynced}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available / Pending Integrations */}
      <div className="pt-2">
        <h3 className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3 flex items-center gap-2">
          <Plus className="w-3.5 h-3.5 text-[#0f172a]" />
          Available & Pending Integrations ({otherConnections.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherConnections.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] flex flex-col justify-between shadow-[0px_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]">
                    {item.status === 'pending' ? 'Pending Setup' : 'Not Connected'}
                  </span>
                </div>

                <div className="text-sm font-bold text-[#0f172a]">{item.name}</div>
                <div className="text-xs text-[#64748b] mt-0.5">{item.service}</div>
                <div className="text-xs text-[#94a3b8] mt-2 leading-relaxed">{item.details}</div>
              </div>

              <button className="mt-4 w-full py-2 rounded-[8px] bg-white hover:bg-[#f8fafc] text-[#0f172a] text-xs font-semibold border border-[#e2e8f0] transition-colors shadow-2xs">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
