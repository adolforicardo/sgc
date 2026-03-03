'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getApplications } from '@/services/applications/applicationService';
import { getJobById } from '@/services/jobs/jobService';
import type { Application, ApplicationStatus } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { DataTable, Pagination } from '@/shared/components/ui/DataTable';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { ROUTES } from '@/core/domain/constants';

const STATUS_OPTIONS: { value: ApplicationStatus | ''; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'submitted', label: 'Submetidas' },
  { value: 'screening', label: 'Em triagem' },
  { value: 'evaluating', label: 'Em avaliação' },
  { value: 'approved', label: 'Aprovadas' },
  { value: 'rejected', label: 'Rejeitadas' },
];

const baseColumns = [
  {
    key: 'status',
    header: 'Estado',
    render: (app: Application) => <StatusBadge status={app.status} />,
  },
  {
    key: 'submittedAt',
    header: 'Submetida em',
    render: (app: Application) => new Date(app.submittedAt).toLocaleDateString('pt-PT'),
  },
  {
    key: 'documents',
    header: 'Documentos',
    render: (app: Application) => app.documents.length,
  },
];

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobTitles, setJobTitles] = useState<Record<string, string>>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | ''>('');

  useEffect(() => {
    getApplications({ page, pageSize, status: statusFilter || undefined }).then(async (res) => {
      setApplications(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      const titles: Record<string, string> = {};
      await Promise.all(
        res.data.map(async (app) => {
          const job = await getJobById(app.jobId);
          if (job) titles[app.jobId] = job.title;
        })
      );
      setJobTitles(titles);
      setIsLoading(false);
    });
  }, [page, pageSize, statusFilter]);

  const columnsWithJobTitle = [
    {
      key: 'jobId',
      header: 'Vaga',
      render: (app: Application) => jobTitles[app.jobId] ?? app.jobId,
    },
    ...baseColumns,
  ];

  return (
    <>
      <PageHeader
        title="Candidaturas"
        subtitle="Gerir e acompanhar candidaturas"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Candidaturas' },
        ]}
      />

      <div className="mb-6 flex justify-end">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as ApplicationStatus | '');
            setPage(1);
          }}
          className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500/20"
        >
          {STATUS_OPTIONS.map((f) => (
            <option key={f.value || 'all'} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <DataTable
        data={applications}
        columns={columnsWithJobTitle}
        keyExtractor={(a) => a.id}
        isLoading={isLoading}
        emptyMessage="Nenhuma candidatura encontrada"
        onRowClick={(app) => router.push(ROUTES.APPLICATION_DETAIL(app.id))}
      />
      {!isLoading && total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}
      </div>
    </>
  );
}
