'use client';

import React from 'react';

const statusStyles: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700',
  open: 'bg-emerald-100 text-emerald-800',
  closed: 'bg-amber-100 text-amber-800',
  finalized: 'bg-slate-200 text-slate-700',
  submitted: 'bg-blue-100 text-blue-800',
  screening: 'bg-amber-100 text-amber-800',
  evaluating: 'bg-purple-100 text-purple-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-200 text-slate-600',
};

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  open: 'Aberta',
  closed: 'Encerrada',
  finalized: 'Finalizada',
  submitted: 'Submetida',
  screening: 'Em triagem',
  evaluating: 'Em avaliação',
  approved: 'Aprovada',
  rejected: 'Rejeitada',
  active: 'Ativo',
  inactive: 'Inativo',
};

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || 'bg-slate-100 text-slate-700';
  const label = statusLabels[status] || status;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}
