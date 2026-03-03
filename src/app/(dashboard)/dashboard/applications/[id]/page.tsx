'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getApplicationById } from '@/services/applications/applicationService';
import { getJobById } from '@/services/jobs/jobService';
import { getUserById } from '@/services/users/userService';
import type { Application } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { ROUTES } from '@/core/domain/constants';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [application, setApplication] = useState<Application | null>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [candidateName, setCandidateName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApplicationById(id).then(async (app) => {
      setApplication(app);
      if (app) {
        const [job, candidate] = await Promise.all([
          getJobById(app.jobId),
          getUserById(app.candidateId),
        ]);
        setJobTitle(job?.title ?? '');
        setCandidateName(candidate?.name ?? '');
      }
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
            { label: 'Candidaturas', href: ROUTES.APPLICATIONS },
            { label: 'Detalhe' },
          ]}
        />
        <Card>
          <Skeleton height={200} className="w-full" />
        </Card>
      </>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Candidatura não encontrada</p>
        <Button className="mt-4" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={`Candidatura - ${candidateName}`}
        subtitle={jobTitle}
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Candidaturas', href: ROUTES.APPLICATIONS },
          { label: application.id },
        ]}
        actions={
          <Link href={ROUTES.JOB_DETAIL(application.jobId)}>
            <Button variant="outline">Ver Vaga</Button>
          </Link>
        }
      />

      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <StatusBadge status={application.status} />
            <span className="text-slate-500">
              Submetida em {new Date(application.submittedAt).toLocaleString('pt-PT')}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-4">Documentos</h3>
          <ul className="space-y-2">
            {application.documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <span>{doc.name}</span>
                <span className="text-sm text-slate-500">
                  {new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Linha do Tempo</h3>
          <div className="space-y-4">
            {application.timeline
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
              .map((event) => (
                <div key={event.id} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(event.createdAt).toLocaleString('pt-PT')}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </>
  );
}
