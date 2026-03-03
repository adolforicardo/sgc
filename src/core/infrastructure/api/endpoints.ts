/**
 * Central API endpoints configuration
 * When backend is implemented, update base URL and paths
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    ME: `${API_BASE}/auth/me`,
  },
  USERS: {
    BASE: `${API_BASE}/users`,
    BY_ID: (id: string) => `${API_BASE}/users/${id}`,
    BY_ORGANIZATION: (orgId: string) => `${API_BASE}/organizations/${orgId}/users`,
  },
  JOBS: {
    BASE: `${API_BASE}/jobs`,
    BY_ID: (id: string) => `${API_BASE}/jobs/${id}`,
    BY_ORGANIZATION: (orgId: string) => `${API_BASE}/organizations/${orgId}/jobs`,
    PUBLISH: (id: string) => `${API_BASE}/jobs/${id}/publish`,
    CLOSE: (id: string) => `${API_BASE}/jobs/${id}/close`,
  },
  APPLICATIONS: {
    BASE: `${API_BASE}/applications`,
    BY_ID: (id: string) => `${API_BASE}/applications/${id}`,
    BY_JOB: (jobId: string) => `${API_BASE}/jobs/${jobId}/applications`,
    SUBMIT: `${API_BASE}/applications/submit`,
    UPLOAD_DOCUMENT: (id: string) => `${API_BASE}/applications/${id}/documents`,
    TRANSITION: (id: string) => `${API_BASE}/applications/${id}/transition`,
  },
  EVALUATIONS: {
    BASE: `${API_BASE}/evaluations`,
    BY_APPLICATION: (appId: string) => `${API_BASE}/applications/${appId}/evaluations`,
    SUBMIT: (appId: string) => `${API_BASE}/applications/${appId}/evaluations`,
  },
  REPORTS: {
    DASHBOARD: `${API_BASE}/reports/dashboard`,
    APPLICATIONS: `${API_BASE}/reports/applications`,
    JOBS: `${API_BASE}/reports/jobs`,
  },
} as const;
