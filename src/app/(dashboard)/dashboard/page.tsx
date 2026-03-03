'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  href,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  href?: string;
}) {
  const content = (
    <Card className="flex items-start gap-4 hover:border-slate-300 transition-colors group">
      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-slate-50 text-indigo-600 group-hover:from-indigo-100 group-hover:to-slate-100 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        {trend && (
          <p className={`text-xs mt-1 font-medium ${trend.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs mês anterior
          </p>
        )}
      </div>
      {href && (
        <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

const IconApplications = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconClock = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function DashboardPage() {
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
        title="Dashboard"
        subtitle={`Bem-vindo, ${user?.name ?? 'Utilizador'}`}
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="flex items-start gap-4">
              <Skeleton variant="rounded" className="w-12 h-12" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" height={14} width="60%" />
                <Skeleton variant="text" height={28} width="40%" />
              </div>
            </Card>
          ))}
        </div>
      ) : metrics ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <MetricCard
              title="Total de Candidaturas"
              value={metrics.totalApplications}
              icon={<IconApplications />}
              trend={{ value: 12, positive: true }}
              href={ROUTES.APPLICATIONS}
            />
            <MetricCard
              title="Taxa de Aprovação"
              value={`${metrics.approvalRate}%`}
              subtitle="Candidaturas avaliadas"
              icon={<IconCheck />}
              trend={{ value: 3, positive: true }}
            />
            <MetricCard
              title="Vagas Ativas"
              value={metrics.activeJobs}
              icon={<IconBriefcase />}
              href={ROUTES.JOBS}
            />
            <MetricCard
              title="Tempo Médio Avaliação"
              value={`${metrics.averageEvaluationTime} dias`}
              subtitle="Últimos 30 dias"
              icon={<IconClock />}
              trend={{ value: 8, positive: false }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-slate-900">Candidaturas por Estado</h3>
                <Link href={ROUTES.APPLICATIONS} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Ver todas →
                </Link>
              </div>
              <div className="space-y-4">
                {Object.entries(metrics.applicationsByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-600">{statusLabels[status] ?? status}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${Math.min(100, (count / Math.max(metrics.totalApplications, 1)) * 100)}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-900 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-slate-900">Atividade Recente</h3>
                <Link href={ROUTES.REPORTS} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Relatórios →
                </Link>
              </div>
              <div className="space-y-4">
                {metrics.recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                    <span className="text-slate-700 font-medium">{item.label}</span>
                    <span className="font-bold text-indigo-600">{item.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      ) : null}
    </>
  );
}
