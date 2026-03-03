'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById, updateJob } from '@/services/jobs/jobService';
import type { Job, JobStatus } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { ROUTES } from '@/core/domain/constants';

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'draft', label: 'Rascunho' },
  { value: 'open', label: 'Aberta' },
  { value: 'closed', label: 'Encerrada' },
  { value: 'finalized', label: 'Finalizada' },
];

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [status, setStatus] = useState<JobStatus>('draft');
  const [deadline, setDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJobById(id).then((data) => {
      if (data) {
        setJob(data);
        setTitle(data.title);
        setDescription(data.description);
        setRequirements(data.requirements.join('\n'));
        setStatus(data.status);
        setDeadline(data.deadline.slice(0, 10));
      }
      setIsLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const updated = await updateJob(id, {
        title,
        description,
        requirements: requirements.split('\n').filter(Boolean),
        status,
        deadline: deadline ? new Date(deadline).toISOString() : job?.deadline,
      });
      if (updated) {
        router.push(ROUTES.JOB_DETAIL(id));
      } else {
        setError('Erro ao atualizar vaga');
      }
    } catch {
      setError('Erro ao atualizar vaga');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <PageHeader title="Carregando..." breadcrumbs={[]} />
        <Card><Skeleton height={400} className="w-full" /></Card>
      </>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 text-lg">Vaga não encontrada</p>
        <Link href={ROUTES.JOBS} className="mt-4 inline-block">
          <Button>Voltar às Vagas</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={`Editar: ${job.title}`}
        subtitle="Altere os detalhes da vaga"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Vagas', href: ROUTES.JOBS },
          { label: job.title, href: ROUTES.JOB_DETAIL(id) },
          { label: 'Editar' },
        ]}
      />

      <div className="max-w-3xl space-y-6">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
              <StatusBadge status={job.status} />
              <span className="text-sm text-slate-500">
                Última atualização: {new Date(job.updatedAt).toLocaleString('pt-PT')}
              </span>
            </div>

            <Input
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Requisitos (um por linha)
              </label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <Input
              label="Prazo"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            {error && (
              <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
                {error}
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button type="submit" isLoading={isSubmitting}>
                Guardar Alterações
              </Button>
              <Link href={ROUTES.JOB_DETAIL(id)}>
                <Button type="button" variant="outline">Cancelar</Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
