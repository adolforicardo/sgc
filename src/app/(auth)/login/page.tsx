'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/shared/context/AuthContext';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const success = await login({ email, password });

    if (success) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setError('Credenciais inválidas. Verifique o email e a palavra-passe.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SGC</h1>
          <p className="text-slate-300 mt-1">Sistema de Gestão de Candidaturas</p>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Gestão de Vagas</h3>
              <p className="text-sm text-slate-400 mt-0.5">Publique e gere oportunidades de forma centralizada</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Candidaturas Inteligentes</h3>
              <p className="text-sm text-slate-400 mt-0.5">Triagem, avaliação e workflow automatizado</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Relatórios Analíticos</h3>
              <p className="text-sm text-slate-400 mt-0.5">Dashboards e métricas em tempo real</p>
            </div>
          </div>
        </div>
        <p className="text-slate-500 text-sm">
          © 2026 SGC. Solução enterprise para recrutamento.
        </p>
      </div>

      {/* Right panel - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#fafbfc]">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">SGC</h1>
            <p className="text-slate-600 mt-1">Sistema de Gestão de Candidaturas</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
            <h2 className="text-xl font-semibold text-slate-900">Entrar na sua conta</h2>
            <p className="text-slate-500 mt-1 text-sm">Introduza as suas credenciais para aceder ao sistema</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <Input
                label="Endereço de email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@empresa.pt"
                required
                autoComplete="email"
              />
              <Input
                label="Palavra-passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />

              {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  Manter sessão
                </label>
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Esqueceu a palavra-passe?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting || isLoading}
                className="!bg-indigo-600 hover:!bg-indigo-700 !text-white"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-600 mb-3">Credenciais de demonstração</p>
              <p className="text-xs text-slate-500 mb-3">Clique no perfil para preencher os campos, ou em &quot;Entrar&quot; para aceder diretamente:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { email: 'admin@sgc.pt', password: 'password123', label: 'Super Admin', role: 'SUPER_ADMIN' },
                  { email: 'org-admin@acme.pt', password: 'password123', label: 'Admin Org.', role: 'ORGANIZATION_ADMIN' },
                  { email: 'recruiter@acme.pt', password: 'password123', label: 'Recrutador', role: 'RECRUITER' },
                  { email: 'avaliador@acme.pt', password: 'password123', label: 'Avaliador', role: 'EVALUATOR' },
                  { email: 'candidato@email.pt', password: 'password123', label: 'Candidato', role: 'CANDIDATE' },
                ].map((demo) => (
                  <div
                    key={demo.email}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-indigo-50/80 hover:border-indigo-200 transition-colors group"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setEmail(demo.email);
                        setPassword(demo.password);
                        setError(null);
                      }}
                      className="flex items-center gap-2 min-w-0 flex-1 text-left"
                    >
                      <span className="w-8 h-8 rounded-md bg-slate-200 group-hover:bg-indigo-200 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:text-indigo-700 flex-shrink-0">
                        {demo.role.slice(0, 2)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-700 truncate">{demo.label}</p>
                        <p className="text-xs text-slate-500 truncate">{demo.email}</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setEmail(demo.email);
                        setPassword(demo.password);
                        setError(null);
                        setIsSubmitting(true);
                        const success = await login({ email: demo.email, password: demo.password });
                        if (success) {
                          router.push('/dashboard');
                          router.refresh();
                        } else {
                          setError('Credenciais inválidas.');
                        }
                        setIsSubmitting(false);
                      }}
                      disabled={isSubmitting}
                      className="px-2 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors flex-shrink-0 disabled:opacity-50"
                    >
                      Entrar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
