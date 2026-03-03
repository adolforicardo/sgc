'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/context/AuthContext';
import { ROUTES } from '@/core/domain/constants';

export function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${ROUTES.JOBS}?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 h-12 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
      <div className="h-full px-4 flex items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar vagas, candidaturas..."
              className="w-full h-8 pl-8 pr-3 rounded-md bg-slate-100/80 border border-slate-200 text-slate-900 placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.DASHBOARD}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Dashboard"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                {user ? getInitials(user.name) : '?'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-1.5 w-48 rounded-lg bg-white border border-slate-200 shadow-xl py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href={ROUTES.DASHBOARD}
                    className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={ROUTES.REPORTS}
                    className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Relatórios
                  </Link>
                  <hr className="my-2 border-slate-100" />
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout().then(() => { window.location.href = '/login'; });
                    }}
                    className="block w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                  >
                    Terminar sessão
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
