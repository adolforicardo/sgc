'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getJobs } from '@/services/jobs/jobService';
import type { Job, JobStatus } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { DataTable, Pagination } from '@/shared/components/ui/DataTable';
import { Button } from '@/shared/components/ui/Button';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Input } from '@/shared/components/ui/Input';
import { ROUTES } from '@/core/domain/constants';

const STATUS_FILTERS: { value: JobStatus | ''; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'open', label: 'Abertas' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'closed', label: 'Encerradas' },
  { value: 'finalized', label: 'Finalizadas' },
];

const columns = [
  { key: 'title', header: 'Título' },
  {
    key: 'status',
    header: 'Estado',
    render: (job: Job) => <StatusBadge status={job.status} />,
  },
  {
    key: 'deadline',
    header: 'Prazo',
    render: (job: Job) => new Date(job.deadline).toLocaleDateString('pt-PT'),
  },
  {
    key: 'createdAt',
    header: 'Criada em',
    render: (job: Job) => new Date(job.createdAt).toLocaleDateString('pt-PT'),
  },
];

function JobsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [statusFilter, setStatusFilter] = useState<JobStatus | ''>(
    (searchParams.get('status') as JobStatus) ?? ''
  );

  useEffect(() => {
    getJobs({
      page,
      pageSize,
      search: search || undefined,
      status: statusFilter || undefined,
    }).then((res) => {
      setJobs(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    });
  }, [page, pageSize, search, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Vagas"
        subtitle="Gerir vagas e oportunidades de recrutamento"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Vagas' },
        ]}
        actions={
          <Link href="/dashboard/jobs/new">
            <Button
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Nova Vaga
            </Button>
          </Link>
        }
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por título ou descrição..."
            className="flex-1 h-10 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <Button type="submit" variant="secondary">Pesquisar</Button>
        </form>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as JobStatus | '');
            setPage(1);
          }}
          className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500/20"
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.value || 'all'} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <DataTable
          data={jobs}
          columns={columns}
          keyExtractor={(j) => j.id}
          isLoading={isLoading}
          emptyMessage="Nenhuma vaga encontrada. Crie a primeira vaga ou ajuste os filtros."
          onRowClick={(job) => router.push(ROUTES.JOB_DETAIL(job.id))}
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

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="h-24 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-96 bg-slate-100 rounded-xl animate-pulse" />
      </div>
    }>
      <JobsPageContent />
    </Suspense>
  );
}
