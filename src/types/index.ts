/**
 * SGC - Sistema de Gestão de Candidaturas
 * Central type definitions - Domain entities and shared types
 */

// ============ USER & AUTH ============

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ORGANIZATION_ADMIN'
  | 'RECRUITER'
  | 'EVALUATOR'
  | 'CANDIDATE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string | null;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ============ ORGANIZATION (Multi-tenant) ============

export interface Organization {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

// ============ JOB (Vaga) ============

export type JobStatus = 'draft' | 'open' | 'closed' | 'finalized';

export interface EvaluationCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  maxScore: number;
}

export interface Job {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  requirements: string[];
  status: JobStatus;
  criteria: EvaluationCriterion[];
  deadline: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============ APPLICATION (Candidatura) ============

export type ApplicationStatus =
  | 'submitted'
  | 'screening'
  | 'evaluating'
  | 'approved'
  | 'rejected';

export interface ApplicationDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  documents: ApplicationDocument[];
  submittedAt: string;
  updatedAt: string;
  timeline: ApplicationTimelineEvent[];
}

export interface ApplicationTimelineEvent {
  id: string;
  type: 'status_change' | 'evaluation' | 'comment' | 'document';
  description: string;
  userId?: string;
  createdAt: string;
}

// ============ EVALUATION ============

export interface Evaluation {
  id: string;
  applicationId: string;
  evaluatorId: string;
  criterionScores: CriterionScore[];
  comments: string;
  submittedAt: string;
}

export interface CriterionScore {
  criterionId: string;
  score: number;
  feedback?: string;
}

// ============ API & PAGINATION ============

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
