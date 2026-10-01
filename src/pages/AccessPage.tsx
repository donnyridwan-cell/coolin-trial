import React, { useState } from 'react';
import { Info, X, UserPlus, Users } from 'lucide-react';

type Role = 'Editor' | 'Viewer' | 'Owner';

interface ScopedPerson {
  name: string;
  role: Role;
}

const INITIAL_SCOPED: ScopedPerson[] = [
  { name: 'Tommy', role: 'Editor' },
  { name: 'Admin LMS', role: 'Editor' },
  { name: 'Kiet', role: 'Editor' },
  { name: 'Colin Melia', role: 'Editor' },
  { name: 'Trang', role: 'Editor' },
  { name: 'Finn', role: 'Editor' },
];

// Everyone who could be scoped (dropdown lists those not yet scoped).
const ALL_PEOPLE = [
  'Tommy',
  'Admin LMS',
  'Kiet',
  'Colin Melia',
  'Trang',
  'Finn',
  'Minh',
  'Sarah Lee',
  'David Chen',
  'Linh Nguyen',
];

const ROLES: Role[] = ['Editor', 'Viewer', 'Owner'];

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const AccessPage: React.FC = () => {
  const [scoped, setScoped] = useState<ScopedPerson[]>(INITIAL_SCOPED);
  const [person, setPerson] = useState('');
  const [role, setRole] = useState<Role>('Editor');

  const available = ALL_PEOPLE.filter((p) => !scoped.some((s) => s.name === p));

  const addPerson = () => {
    if (!person) return;
    setScoped((prev) => [...prev, { name: person, role }]);
    setPerson('');
    setRole('Editor');
  };

  const removePerson = (name: string) => {
    setScoped((prev) => prev.filter((s) => s.name !== name));
  };

  const changeRole = (name: string, newRole: Role) => {
    setScoped((prev) => prev.map((s) => (s.name === name ? { ...s, role: newRole } : s)));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">Who can see this client</h1>
        <p className="text-sm text-[#64748b] mt-1 leading-relaxed">
          Scoping for people who are not staff. It decides their Technical board, their client list,
          and every task query behind them.
        </p>
      </div>

      {/* Staff info callout */}
      <div className="flex items-start gap-2.5 p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
        <Info className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
        <p className="text-xs text-[#475569] leading-relaxed">
          <span className="font-semibold text-[#0f172a]">0 staff members see this client already</span>{' '}
          and are not listed below — staff see every client, and nothing here changes that. The list is
          only the people who see it <em>because</em> of this table.
        </p>
      </div>

      {/* Scoped list */}
      <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#e2e8f0] bg-[#f8fafc]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#94a3b8]" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#64748b]">
              Scoped to this client
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#475569] border border-[#e2e8f0]">
            {scoped.length} {scoped.length === 1 ? 'person' : 'people'}
          </span>
        </div>

        {scoped.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-[#94a3b8]">Nobody is scoped here yet.</div>
        ) : (
          <div className="divide-y divide-[#f1f5f9]">
            {scoped.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {initials(p.name)}
                  </div>
                  <span className="text-sm font-medium text-[#0f172a] truncate">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={p.role}
                    onChange={(e) => changeRole(p.name, e.target.value as Role)}
                    className="h-8 pl-2.5 pr-7 rounded-[8px] border border-[#e2e8f0] bg-white text-xs font-medium text-[#475569] outline-none focus:border-[#94a3b8] cursor-pointer"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removePerson(p.name)}
                    className="p-1.5 rounded-[6px] text-[#94a3b8] hover:text-[#dc2626] hover:bg-[#fef2f2] transition-colors"
                    title={`Remove ${p.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Give access */}
      <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] p-5">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#64748b] mb-3">
          Give someone access
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="flex-1 h-9 pl-3 pr-8 rounded-[8px] border border-[#e2e8f0] bg-white text-sm text-[#0f172a] outline-none focus:border-[#94a3b8] cursor-pointer disabled:opacity-50"
            disabled={available.length === 0}
          >
            <option value="">{available.length ? 'Choose a person…' : 'Everyone is already scoped'}</option>
            {available.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="h-9 pl-3 pr-8 rounded-[8px] border border-[#e2e8f0] bg-white text-sm text-[#475569] outline-none focus:border-[#94a3b8] cursor-pointer"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            onClick={addPerson}
            disabled={!person}
            className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm font-semibold transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <UserPlus className="w-4 h-4" />
            Add
          </button>
        </div>

        <p className="text-xs text-[#94a3b8] mt-3 leading-relaxed">
          Access is all-or-nothing today: the permission is stored but nothing in the app reads it yet,
          so viewer and owner behave the same.
        </p>
      </div>
    </div>
  );
};
