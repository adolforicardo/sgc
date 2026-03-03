/**
 * Auth Service - Authentication and session management
 * Uses mock data; swap implementation when backend exists
 */

import { createDelay } from '@/core/infrastructure/utils/delay';
import {
  mockUsers,
  MOCK_AUTH_CREDENTIALS,
} from '@/mocks/mockDatabase';
import type { AuthSession, LoginCredentials, User } from '@/types';

const SESSION_STORAGE_KEY = 'sgc_session';

export async function login(credentials: LoginCredentials): Promise<AuthSession | null> {
  await createDelay(500);

  const user = mockUsers.find((u) => u.email === credentials.email);
  if (!user || !user.isActive) return null;

  const validPassword = MOCK_AUTH_CREDENTIALS[credentials.email];
  if (validPassword !== credentials.password) return null;

  const session: AuthSession = {
    user,
    token: `mock-jwt-${user.id}-${Date.now()}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  return session;
}

export async function logout(): Promise<void> {
  await createDelay(200);
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthSession;
  } catch {
    return null;
  }
}

export function getCurrentUser(): User | null {
  const session = getSession();
  return session?.user ?? null;
}

export function hasRole(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

export function canAccessDashboard(user: User | null): boolean {
  return hasRole(user, ['SUPER_ADMIN', 'ORGANIZATION_ADMIN', 'RECRUITER', 'EVALUATOR']);
}

export function canManageJobs(user: User | null): boolean {
  return hasRole(user, ['SUPER_ADMIN', 'ORGANIZATION_ADMIN', 'RECRUITER']);
}

export function canEvaluate(user: User | null): boolean {
  return hasRole(user, ['SUPER_ADMIN', 'ORGANIZATION_ADMIN', 'RECRUITER', 'EVALUATOR']);
}

export function canManageUsers(user: User | null): boolean {
  return hasRole(user, ['SUPER_ADMIN', 'ORGANIZATION_ADMIN']);
}
