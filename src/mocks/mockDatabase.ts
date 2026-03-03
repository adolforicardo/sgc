/**
 * Mock Database - In-memory data store simulating backend persistence
 * Components NEVER access this directly - only through services
 */

import type {
  User,
  Organization,
  Job,
  Application,
  Evaluation,
  ApplicationTimelineEvent,
} from '@/types';

// ============ ORGANIZATIONS ============
export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Acme Corporation',
    slug: 'acme-corp',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'org-2',
    name: 'Tech Innovations Ltd',
    slug: 'tech-innovations',
    isActive: true,
    createdAt: '2024-02-20T10:00:00Z',
  },
];

// ============ USERS ============
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@sgc.pt',
    name: 'Administrador Sistema',
    role: 'SUPER_ADMIN',
    organizationId: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'recruiter@acme.pt',
    name: 'Maria Recrutadora',
    role: 'RECRUITER',
    organizationId: 'org-1',
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'avaliador@acme.pt',
    name: 'João Avaliador',
    role: 'EVALUATOR',
    organizationId: 'org-1',
    isActive: true,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: 'user-4',
    email: 'candidato@email.pt',
    name: 'Pedro Candidato',
    role: 'CANDIDATE',
    organizationId: null,
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user-5',
    email: 'org-admin@acme.pt',
    name: 'Ana Administradora',
    role: 'ORGANIZATION_ADMIN',
    organizationId: 'org-1',
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'user-6',
    email: 'sofia.silva@email.pt',
    name: 'Sofia Silva',
    role: 'CANDIDATE',
    organizationId: null,
    isActive: true,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'user-7',
    email: 'ricardo.ferreira@email.pt',
    name: 'Ricardo Ferreira',
    role: 'CANDIDATE',
    organizationId: null,
    isActive: true,
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
];

// ============ JOBS ============
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    organizationId: 'org-1',
    title: 'Desenvolvedor Full Stack Senior',
    description: 'Procuramos um desenvolvedor experiente para liderar projetos web.',
    requirements: ['5+ anos experiência', 'React/Node.js', 'Inglês fluente'],
    status: 'open',
    criteria: [
      { id: 'crit-1', name: 'Experiência Técnica', description: 'Conhecimento em stack moderno', weight: 40, maxScore: 10 },
      { id: 'crit-2', name: 'Comunicação', description: 'Capacidade de trabalho em equipa', weight: 30, maxScore: 10 },
      { id: 'crit-3', name: 'Liderança', description: 'Experiência em gestão de projetos', weight: 30, maxScore: 10 },
    ],
    deadline: '2026-04-30T23:59:59Z',
    publishedAt: '2026-03-01T09:00:00Z',
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
    createdBy: 'user-2',
  },
  {
    id: 'job-2',
    organizationId: 'org-1',
    title: 'Analista de Dados',
    description: 'Análise de dados e criação de relatórios para decisão estratégica.',
    requirements: ['SQL avançado', 'Python', 'Power BI'],
    status: 'open',
    criteria: [
      { id: 'crit-4', name: 'Análise de Dados', description: 'Capacidade analítica', weight: 50, maxScore: 10 },
      { id: 'crit-5', name: 'Ferramentas', description: 'Domínio de BI tools', weight: 50, maxScore: 10 },
    ],
    deadline: '2026-05-15T23:59:59Z',
    publishedAt: '2026-03-01T09:00:00Z',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
    createdBy: 'user-2',
  },
  {
    id: 'job-3',
    organizationId: 'org-1',
    title: 'Gestor de Projetos',
    description: 'Coordenação de projetos de TI com metodologias ágeis.',
    requirements: ['PMP ou equivalente', 'Scrum', '3+ anos gestão'],
    status: 'draft',
    criteria: [
      { id: 'crit-6', name: 'Gestão', description: 'Experiência em gestão', weight: 50, maxScore: 10 },
      { id: 'crit-7', name: 'Metodologias', description: 'Conhecimento ágil', weight: 50, maxScore: 10 },
    ],
    deadline: '2026-06-01T23:59:59Z',
    publishedAt: null,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z',
    createdBy: 'user-2',
  },
];

// ============ APPLICATIONS ============
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    candidateId: 'user-4',
    status: 'evaluating',
    documents: [
      { id: 'doc-1', name: 'CV_Pedro.pdf', type: 'application/pdf', url: '/mock/cv.pdf', uploadedAt: '2026-03-02T10:00:00Z' },
      { id: 'doc-2', name: 'Carta_Motivacao.pdf', type: 'application/pdf', url: '/mock/motivation.pdf', uploadedAt: '2026-03-02T10:05:00Z' },
    ],
    submittedAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-03T14:00:00Z',
    timeline: [
      { id: 'evt-1', type: 'status_change', description: 'Candidatura submetida', userId: 'user-4', createdAt: '2026-03-02T10:00:00Z' },
      { id: 'evt-2', type: 'status_change', description: 'Em triagem', userId: 'user-2', createdAt: '2026-03-02T14:00:00Z' },
      { id: 'evt-3', type: 'status_change', description: 'Em avaliação', userId: 'user-2', createdAt: '2026-03-03T09:00:00Z' },
    ],
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    candidateId: 'user-4',
    status: 'submitted',
    documents: [
      { id: 'doc-3', name: 'CV.pdf', type: 'application/pdf', url: '/mock/cv2.pdf', uploadedAt: '2026-03-03T09:00:00Z' },
    ],
    submittedAt: '2026-03-03T09:00:00Z',
    updatedAt: '2026-03-03T09:00:00Z',
    timeline: [
      { id: 'evt-4', type: 'status_change', description: 'Candidatura submetida', userId: 'user-4', createdAt: '2026-03-03T09:00:00Z' },
    ],
  },
  {
    id: 'app-3',
    jobId: 'job-1',
    candidateId: 'user-6',
    status: 'screening',
    documents: [
      { id: 'doc-4', name: 'CV_Sofia.pdf', type: 'application/pdf', url: '/mock/cv3.pdf', uploadedAt: '2026-03-04T11:00:00Z' },
      { id: 'doc-5', name: 'Portfolio.pdf', type: 'application/pdf', url: '/mock/portfolio.pdf', uploadedAt: '2026-03-04T11:05:00Z' },
    ],
    submittedAt: '2026-03-04T11:00:00Z',
    updatedAt: '2026-03-04T14:00:00Z',
    timeline: [
      { id: 'evt-5', type: 'status_change', description: 'Candidatura submetida', userId: 'user-6', createdAt: '2026-03-04T11:00:00Z' },
      { id: 'evt-6', type: 'status_change', description: 'Em triagem', userId: 'user-2', createdAt: '2026-03-04T14:00:00Z' },
    ],
  },
  {
    id: 'app-4',
    jobId: 'job-2',
    candidateId: 'user-7',
    status: 'submitted',
    documents: [
      { id: 'doc-6', name: 'CV_Ricardo.pdf', type: 'application/pdf', url: '/mock/cv4.pdf', uploadedAt: '2026-03-05T09:30:00Z' },
    ],
    submittedAt: '2026-03-05T09:30:00Z',
    updatedAt: '2026-03-05T09:30:00Z',
    timeline: [
      { id: 'evt-7', type: 'status_change', description: 'Candidatura submetida', userId: 'user-7', createdAt: '2026-03-05T09:30:00Z' },
    ],
  },
];

// ============ EVALUATIONS ============
export const mockEvaluations: Evaluation[] = [
  {
    id: 'eval-1',
    applicationId: 'app-1',
    evaluatorId: 'user-3',
    criterionScores: [
      { criterionId: 'crit-1', score: 8, feedback: 'Boa experiência em React' },
      { criterionId: 'crit-2', score: 9, feedback: 'Excelente comunicação' },
      { criterionId: 'crit-3', score: 7, feedback: 'Alguma experiência em liderança' },
    ],
    comments: 'Candidato sólido, recomendo avançar para fase final.',
    submittedAt: '2026-03-03T14:00:00Z',
  },
];

// Mock password for demo (admin@sgc.pt / password123)
export const MOCK_AUTH_CREDENTIALS: Record<string, string> = {
  'admin@sgc.pt': 'password123',
  'recruiter@acme.pt': 'password123',
  'avaliador@acme.pt': 'password123',
  'candidato@email.pt': 'password123',
  'org-admin@acme.pt': 'password123',
};
