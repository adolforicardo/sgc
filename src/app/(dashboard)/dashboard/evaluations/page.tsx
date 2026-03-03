'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApplications } from '@/services/applications/applicationService';
import { getEvaluationsByApplication } from '@/services/evaluations/evaluationService';
import type { Application } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { DataTable } from '@/shared/components/ui/DataTable';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { ROUTES } from '@/core/domain/constants';

export default function EvaluationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [evalCounts, setEvalCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApplications({ status: 'evaluating' }).then(async (res) => {
      setApplications(res.data);
      const counts: Record<string, number> = {};
      await Promise.all(
        res.data.map(async (app) => {
          const evals = await getEvaluationsByApplication(app.id);
          counts[app.id] = evals.length;
        })
      );
      setEvalCounts(counts);
      setIsLoading(false);
    });
  }, []);

  const columns = [
    { key: 'id', header: 'ID', render: (a: Application) => a.id.slice(0, 8) + '...' },
    {
      key: 'status',
      header: 'Estado',
      render: (a: Application) => <StatusBadge status={a.status} />,
    },
    {
      key: 'id',
      header: 'Avaliações',
      render: (a: Application) => `${evalCounts[a.id] ?? 0} submetidas`,
    },
    {
      key: 'submittedAt',
      header: 'Submetida',
      render: (a: Application) => new Date(a.submittedAt).toLocaleDateString('pt-PT'),
    },
  ];

  return (
    <>
      <PageHeader
        title="Avaliações"
        subtitle="Candidaturas em fase de avaliação"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Avaliações' },
        ]}
      />

      <DataTable
        data={applications}
        columns={columns}
        keyExtractor={(a) => a.id}
        isLoading={isLoading}
        emptyMessage="Nenhuma candidatura em avaliação"
        onRowClick={(app) => router.push(ROUTES.APPLICATION_DETAIL(app.id))}
      />
    </>
  );
}
