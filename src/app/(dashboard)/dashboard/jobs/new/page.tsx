'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/context/AuthContext';
import { createJob } from '@/services/jobs/jobService';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { ROUTES } from '@/core/domain/constants';

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!user) {
      setError('Sessão inválida');
      return;
    }
    const orgId = user.organizationId ?? 'org-1';
    setIsSubmitting(true);
    try {
      const job = await createJob({
        organizationId: orgId,
        title,
        description,
        requirements: requirements.split('\n').filter(Boolean),
        status: 'draft',
        criteria: [
          { id: 'c1', name: 'Experiência', description: 'Experiência relevante', weight: 50, maxScore: 10 },
          { id: 'c2', name: 'Competências', description: 'Competências técnicas', weight: 50, maxScore: 10 },
        ],
        deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        publishedAt: null,
        createdBy: user.id,
      });
      router.push(ROUTES.JOB_DETAIL(job.id));
    } catch {
      setError('Erro ao criar vaga');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Nova Vaga"
        subtitle="Criar nova oportunidade"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Vagas', href: ROUTES.JOBS },
          { label: 'Nova' },
        ]}
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Desenvolvedor Full Stack"
            required
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a vaga..."
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-slate-400 focus:border-transparent"
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
              placeholder="5+ anos experiência&#10;React/Node.js&#10;Inglês fluente"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
          </div>
          <Input
            label="Prazo"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
          )}
          <div className="flex gap-3">
            <Button type="submit" isLoading={isSubmitting}>
              Criar Vaga
            </Button>
            <Link href={ROUTES.JOBS}>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
}
