/**
 * Job Service - Vacancy management
 * Isolated data access - components use this, never mocks directly
 */

import { createDelay } from '@/core/infrastructure/utils/delay';
import { mockJobs } from '@/mocks/mockDatabase';
import type { Job, JobStatus, PaginatedResponse } from '@/types';

export interface JobFilters {
  status?: JobStatus;
  organizationId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getJobs(filters: JobFilters = {}): Promise<PaginatedResponse<Job>> {
  await createDelay(400);

  let filtered = [...mockJobs];

  if (filters.status) {
    filtered = filtered.filter((j) => j.status === filters.status);
  }
  if (filters.organizationId) {
    filtered = filtered.filter((j) => j.organizationId === filters.organizationId);
  }
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(search) ||
        j.description.toLowerCase().includes(search)
    );
  }

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

export async function getJobById(id: string): Promise<Job | null> {
  await createDelay(300);
  return mockJobs.find((j) => j.id === id) ?? null;
}

export async function createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  await createDelay(500);
  const newJob: Job = {
    ...job,
    id: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockJobs.push(newJob);
  return newJob;
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  await createDelay(400);
  const index = mockJobs.findIndex((j) => j.id === id);
  if (index === -1) return null;
  mockJobs[index] = {
    ...mockJobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return mockJobs[index];
}

export async function updateJobStatus(id: string, status: JobStatus): Promise<Job | null> {
  return updateJob(id, { status });
}
