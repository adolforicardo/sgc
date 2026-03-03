/**
 * User Service - User management
 */

import { createDelay } from '@/core/infrastructure/utils/delay';
import { mockUsers } from '@/mocks/mockDatabase';
import type { User, UserRole, PaginatedResponse } from '@/types';

export interface UserFilters {
  organizationId?: string;
  role?: UserRole;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getUsers(filters: UserFilters = {}): Promise<PaginatedResponse<User>> {
  await createDelay(400);

  let filtered = [...mockUsers];

  if (filters.organizationId) {
    filtered = filtered.filter((u) => u.organizationId === filters.organizationId);
  }
  if (filters.role) {
    filtered = filtered.filter((u) => u.role === filters.role);
  }
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
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

export async function getUserById(id: string): Promise<User | null> {
  await createDelay(300);
  return mockUsers.find((u) => u.id === id) ?? null;
}
