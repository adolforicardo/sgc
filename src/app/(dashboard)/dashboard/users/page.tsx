'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/services/users/userService';
import type { User } from '@/types';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { DataTable, Pagination } from '@/shared/components/ui/DataTable';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { ROUTES } from '@/core/domain/constants';

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ORGANIZATION_ADMIN: 'Admin Organização',
  RECRUITER: 'Recrutador',
  EVALUATOR: 'Avaliador',
  CANDIDATE: 'Candidato',
};

const columns = [
  { key: 'name', header: 'Nome' },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Perfil',
    render: (user: User) => roleLabels[user.role] ?? user.role,
  },
  {
    key: 'isActive',
    header: 'Estado',
    render: (user: User) => (
      <StatusBadge status={user.isActive ? 'active' : 'inactive'} />
    ),
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers({ page, pageSize }).then((res) => {
      setUsers(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    });
  }, [page, pageSize]);

  return (
    <>
      <PageHeader
        title="Utilizadores"
        subtitle="Gerir utilizadores e permissões"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Utilizadores' },
        ]}
      />

      <DataTable
        data={users}
        columns={columns}
        keyExtractor={(u) => u.id}
        isLoading={isLoading}
        emptyMessage="Nenhum utilizador encontrado"
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
    </>
  );
}
