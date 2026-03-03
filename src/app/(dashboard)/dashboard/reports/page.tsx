'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import { getDashboardMetrics } from '@/services/reports/reportService';
import type { DashboardMetrics } from '@/services/reports/reportService';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { ROUTES } from '@/core/domain/constants';

const statusLabels: Record<string, string> = {
  submitted: 'Submetidas',
  screening: 'Em triagem',
  evaluating: 'Em avaliação',
  approved: 'Aprovadas',
  rejected: 'Rejeitadas',
};

export default function ReportsPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboardMetrics(user?.organizationId ?? undefined).then((data) => {
      setMetrics(data);
      setIsLoading(false);
    });
  }, [user?.organizationId]);

  return (
    <>
      <PageHeader
        title="Relatórios"
        subtitle="Indicadores e análise"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Relatórios' },
        ]}
      />

      {isLoading ? (
        <Card>
          <Skeleton height={300} className="w-full" />
        </Card>
      ) : metrics ? (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Distribuição por Estado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(metrics.applicationsByStatus).map(([status, count]) => (
                <div
                  key={status}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <p className="text-sm text-slate-600">
                    {statusLabels[status] ?? status}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Resumo Executivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500">Total Candidaturas</p>
                <p className="text-3xl font-bold text-slate-900">
                  {metrics.totalApplications}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Taxa de Aprovação</p>
                <p className="text-3xl font-bold text-slate-900">
                  {metrics.approvalRate}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Vagas Ativas</p>
                <p className="text-3xl font-bold text-slate-900">
                  {metrics.activeJobs}
                </p>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}
