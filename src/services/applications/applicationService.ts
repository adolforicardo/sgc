/**
 * Application Service - Candidature management
 */

import { createDelay } from '@/core/infrastructure/utils/delay';
import { mockApplications } from '@/mocks/mockDatabase';
import type {
  Application,
  ApplicationStatus,
  ApplicationDocument,
  PaginatedResponse,
} from '@/types';

export interface ApplicationFilters {
  jobId?: string;
  status?: ApplicationStatus;
  candidateId?: string;
  page?: number;
  pageSize?: number;
}

export async function getApplications(
  filters: ApplicationFilters = {}
): Promise<PaginatedResponse<Application>> {
  await createDelay(400);

  let filtered = [...mockApplications];

  if (filters.jobId) filtered = filtered.filter((a) => a.jobId === filters.jobId);
  if (filters.status) filtered = filtered.filter((a) => a.status === filters.status);
  if (filters.candidateId) filtered = filtered.filter((a) => a.candidateId === filters.candidateId);

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getApplicationById(id: string): Promise<Application | null> {
  await createDelay(300);
  return mockApplications.find((a) => a.id === id) ?? null;
}

export async function submitApplication(
  jobId: string,
  candidateId: string,
  documents: Omit<ApplicationDocument, 'id' | 'uploadedAt'>[]
): Promise<Application> {
  await createDelay(600);

  const appDocuments: ApplicationDocument[] = documents.map((d) => ({
    ...d,
    id: `doc-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    uploadedAt: new Date().toISOString(),
  }));

  const newApp: Application = {
    id: `app-${Date.now()}`,
    jobId,
    candidateId,
    status: 'submitted',
    documents: appDocuments,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      {
        id: `evt-${Date.now()}`,
        type: 'status_change',
        description: 'Candidatura submetida',
        userId: candidateId,
        createdAt: new Date().toISOString(),
      },
    ],
  };

  mockApplications.push(newApp);
  return newApp;
}

export async function transitionApplicationStatus(
  id: string,
  newStatus: ApplicationStatus,
  userId: string
): Promise<Application | null> {
  await createDelay(400);
  const app = mockApplications.find((a) => a.id === id);
  if (!app) return null;

  app.status = newStatus;
  app.updatedAt = new Date().toISOString();
  app.timeline.push({
    id: `evt-${Date.now()}`,
    type: 'status_change',
    description: `Estado alterado para: ${newStatus}`,
    userId,
    createdAt: new Date().toISOString(),
  });

  return app;
}
