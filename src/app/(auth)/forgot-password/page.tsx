'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafbfc] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao login
          </Link>

          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Verifique o seu email</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Se existir uma conta associada a <strong>{email}</strong>, receberá instruções para redefinir a palavra-passe.
              </p>
              <p className="text-slate-500 mt-4 text-xs">
                Em ambiente de demonstração, esta funcionalidade está simulada.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-slate-900">Recuperar palavra-passe</h1>
              <p className="text-slate-500 mt-1 text-sm">Introduza o seu email para receber instruções de recuperação</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Input
                  label="Endereço de email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@empresa.mz"
                  required
                />
                <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                  Enviar instruções
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
