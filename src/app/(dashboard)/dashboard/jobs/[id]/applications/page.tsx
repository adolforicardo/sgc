'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById } from '@/services/jobs/jobService';
import { getApplications } from '@/services/applications/applicationService';
import { getUserById } from '@/services/users/userService';
import type { Application, Job } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { DataTable, Pagination } from '@/shared/components/ui/DataTable';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { ROUTES } from '@/core/domain/constants';

export default function JobApplicationsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [candidateNames, setCandidateNames] = useState<Record<string, string>>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getJobById(jobId).then((jobData) => {
      setJob(jobData ?? null);
    });
  }, [jobId]);

  useEffect(() => {
    if (!jobId) return;
    getApplications({ jobId, page, pageSize }).then(async (res) => {
      setApplications(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      const names: Record<string, string> = {};
      await Promise.all(
        res.data.map(async (app) => {
          const user = await getUserById(app.candidateId);
          if (user) names[app.candidateId] = user.name;
        })
      );
      setCandidateNames(names);
      setIsLoading(false);
    });
  }, [jobId, page, pageSize]);

  const columns = [
    {
      key: 'candidateId',
      header: 'Candidato',
      render: (app: Application) => candidateNames[app.candidateId] ?? app.candidateId,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (app: Application) => <StatusBadge status={app.status} />,
    },
    {
      key: 'documents',
      header: 'Documentos',
      render: (app: Application) => (
        <span className="text-slate-600">{app.documents.length} ficheiros</span>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Submetida',
      render: (app: Application) => (
        <span className="text-slate-600">
          {new Date(app.submittedAt).toLocaleString('pt-PT')}
        </span>
      ),
    },
  ];

  if (!job && !isLoading) {
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
        title={job ? `Candidaturas: ${job.title}` : 'Carregando...'}
        subtitle={job ? `${total} candidatura(s) recebida(s)` : ''}
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Vagas', href: ROUTES.JOBS },
          { label: job?.title ?? 'Vaga', href: job ? ROUTES.JOB_DETAIL(jobId) : undefined },
          { label: 'Candidaturas' },
        ]}
        actions={
          job && (
            <Link href={ROUTES.JOB_DETAIL(jobId)}>
              <Button variant="outline">Ver Vaga</Button>
            </Link>
          )
        }
      />

      <Card padding="none">
        <DataTable
          data={applications}
          columns={columns}
          keyExtractor={(a) => a.id}
          isLoading={isLoading}
          emptyMessage="Nenhuma candidatura para esta vaga"
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
      </Card>
    </>
  );
}
