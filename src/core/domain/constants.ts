/**
 * Domain constants - Business rules and invariant values
 */

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  RECRUITER: 'RECRUITER',
  EVALUATOR: 'EVALUATOR',
  CANDIDATE: 'CANDIDATE',
} as const;

export const JOB_STATUSES = {
  DRAFT: 'draft',
  OPEN: 'open',
  CLOSED: 'closed',
  FINALIZED: 'finalized',
} as const;

export const APPLICATION_STATUSES = {
  SUBMITTED: 'submitted',
  SCREENING: 'screening',
  EVALUATING: 'evaluating',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  JOBS: '/dashboard/jobs',
  JOB_DETAIL: (id: string) => `/dashboard/jobs/${id}`,
  APPLICATIONS: '/dashboard/applications',
  APPLICATION_DETAIL: (id: string) => `/dashboard/applications/${id}`,
  USERS: '/dashboard/users',
  EVALUATIONS: '/dashboard/evaluations',
  REPORTS: '/dashboard/reports',
} as const;
