'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  canEvaluate,
  canManageJobs,
  canManageUsers,
} from '@/services/auth/authService';
import { useAuth } from '@/shared/context/AuthContext';
import { ROUTES } from '@/core/domain/constants';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  visible: boolean;
}

const IconDashboard = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconJobs = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconApplications = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconEvaluations = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconReports = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems: NavItem[] = [
    { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: <IconDashboard />, visible: true },
    { href: ROUTES.JOBS, label: 'Vagas', icon: <IconJobs />, visible: canManageJobs(user) },
    { href: ROUTES.APPLICATIONS, label: 'Candidaturas', icon: <IconApplications />, visible: true },
    { href: ROUTES.EVALUATIONS, label: 'Avaliações', icon: <IconEvaluations />, visible: canEvaluate(user) },
    { href: ROUTES.USERS, label: 'Utilizadores', icon: <IconUsers />, visible: canManageUsers(user) },
    { href: ROUTES.REPORTS, label: 'Relatórios', icon: <IconReports />, visible: true },
  ].filter((item) => item.visible);

  return (
    <aside className="w-64 min-h-screen bg-[#0d1117] text-white flex flex-col border-r border-slate-800/50">
      <div className="p-5 border-b border-slate-800/80">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
            S
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight block">SGC</span>
            <span className="text-[10px] text-slate-500 font-normal">Gestão de Candidaturas</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                ${isActive
                  ? 'bg-slate-800/80 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
              `}
            >
              <span className={isActive ? 'text-indigo-400' : ''}>{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {user && (
        <div className="p-3 border-t border-slate-800/80">
          <div className="px-3 py-2 rounded-lg bg-slate-800/30">
            <p className="text-sm font-medium truncate text-slate-200">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => logout().then(() => { window.location.href = '/login'; })}
            className="w-full mt-2 text-left px-3 py-2 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Terminar sessão
          </button>
        </div>
      )}
    </aside>
  );
}
