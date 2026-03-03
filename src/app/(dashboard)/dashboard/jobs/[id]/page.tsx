'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById } from '@/services/jobs/jobService';
import type { Job } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { ROUTES } from '@/core/domain/constants';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getJobById(id).then((data) => {
      setJob(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Carregando..."
          breadcrumbs={[
            { label: 'Dashboard', href: ROUTES.DASHBOARD },
            { label: 'Vagas', href: ROUTES.JOBS },
            { label: 'Detalhe' },
          ]}
        />
        <Card>
          <Skeleton height={200} className="w-full" />
        </Card>
      </>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Vaga não encontrada</p>
        <Button className="mt-4" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={job.title}
        subtitle={`Criada em ${new Date(job.createdAt).toLocaleDateString('pt-PT')}`}
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Vagas', href: ROUTES.JOBS },
          { label: job.title },
        ]}
        actions={
          <div className="flex gap-2">
            <Link href={`/dashboard/jobs/${id}/applications`}>
              <Button variant="outline" leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }>
                Ver Candidaturas
              </Button>
            </Link>
            <Link href={`/dashboard/jobs/${id}/edit`}>
              <Button leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }>
                Editar
              </Button>
            </Link>
          </div>
        }
      />

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="!p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</p>
            <StatusBadge status={job.status} />
          </Card>
          <Card className="!p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Prazo</p>
            <p className="font-semibold text-slate-900 mt-1">{new Date(job.deadline).toLocaleDateString('pt-PT')}</p>
          </Card>
          <Card className="!p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Publicada</p>
            <p className="font-semibold text-slate-900 mt-1">
              {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString('pt-PT') : '—'}
            </p>
          </Card>
          <Card className="!p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Critérios</p>
            <p className="font-semibold text-slate-900 mt-1">{job.criteria.length}</p>
          </Card>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Descrição</h3>
          <p className="text-slate-600 leading-relaxed">{job.description}</p>
          <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Requisitos</h3>
          <ul className="space-y-2">
            {job.requirements.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {r}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-4">Critérios de Avaliação</h3>
          <div className="space-y-3">
            {job.criteria.map((c) => (
              <div key={c.id} className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-medium text-slate-900">{c.name}</span>
                  <p className="text-sm text-slate-500">{c.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-600">Peso: <strong>{c.weight}%</strong></span>
                  <p className="text-sm text-slate-500">Máx: {c.maxScore} pts</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
