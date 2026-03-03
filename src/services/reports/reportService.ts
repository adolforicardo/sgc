/**
 * Report Service - Dashboard analytics and metrics
 */

import { createDelay } from '@/core/infrastructure/utils/delay';
import { mockApplications, mockJobs } from '@/mocks/mockDatabase';

export interface DashboardMetrics {
  totalApplications: number;
  approvalRate: number;
  activeJobs: number;
  averageEvaluationTime: number; // in days (simulated)
  applicationsByStatus: Record<string, number>;
  recentActivity: { label: string; count: number }[];
}

export async function getDashboardMetrics(
  organizationId?: string
): Promise<DashboardMetrics> {
  await createDelay(500);

  const jobs = organizationId
    ? mockJobs.filter((j) => j.organizationId === organizationId)
    : mockJobs;
  const jobIds = new Set(jobs.map((j) => j.id));
  const applications = mockApplications.filter((a) => jobIds.has(a.jobId));

  const approved = applications.filter((a) => a.status === 'approved').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;
  const evaluated = approved + rejected;
  const approvalRate = evaluated > 0 ? (approved / evaluated) * 100 : 0;

  const applicationsByStatus = applications.reduce(
    (acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const activeJobs = jobs.filter((j) => j.status === 'open').length;

  return {
    totalApplications: applications.length,
    approvalRate: Math.round(approvalRate * 10) / 10,
    activeJobs,
    averageEvaluationTime: 4.2, // simulated
    applicationsByStatus,
    recentActivity: [
      { label: 'Submetidas hoje', count: 3 },
      { label: 'Em triagem', count: 5 },
      { label: 'Em avaliação', count: 8 },
    ],
  };
}
