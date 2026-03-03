# SGC - Arquitetura do Sistema

## Visão Geral

O Sistema de Gestão de Candidaturas (SGC) segue uma arquitetura limpa adaptada ao frontend, com separação clara entre domínio, aplicação, infraestrutura e apresentação.

## Estrutura de Pastas

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Rotas públicas (login)
│   ├── (dashboard)/        # Rotas protegidas
│   └── layout.tsx
├── core/
│   ├── domain/             # Regras de negócio, constantes
│   └── infrastructure/      # API client, interceptors, utils
├── modules/                # Módulos por feature (extensível)
├── mocks/                   # Dados mock - NUNCA acessados por componentes
├── services/                # Camada de serviços (abstração de dados)
├── shared/
│   ├── components/         # UI reutilizável
│   └── context/           # Contextos React (Auth)
└── types/                  # Definições TypeScript globais
```

## Camadas

### 1. Domain (core/domain)
- Constantes de negócio
- Tipos de domínio (em /types)
- Regras invariantes

### 2. Infrastructure (core/infrastructure)
- **apiClient.ts**: Cliente HTTP centralizado, pronto para REST
- **endpoints.ts**: Configuração central de URLs
- **interceptors.ts**: Estrutura para JWT, retry, logging

### 3. Services (services/)
- Abstração de acesso a dados
- Componentes **nunca** importam de /mocks
- Quando o backend existir: trocar implementação mantendo interface

### 4. Presentation (app/, shared/)
- Componentes React
- Páginas Next.js
- Sem lógica de negócio complexa

## Fluxo de Dados

```
Componente → Service → Mock/API
                ↓
            types (contratos)
```

## Integração Futura com API

1. Configurar `NEXT_PUBLIC_API_URL` no ambiente
2. Implementar serviços reais que usam `apiClient`
3. Ativar interceptors para JWT em `interceptors.ts`
4. Remover ou desativar imports de mocks nos serviços

## Perfis e Permissões (RBAC)

| Perfil              | Dashboard | Vagas | Candidaturas | Avaliações | Utilizadores |
|---------------------|-----------|-------|--------------|------------|--------------|
| SUPER_ADMIN         | ✓         | ✓     | ✓            | ✓          | ✓            |
| ORGANIZATION_ADMIN  | ✓         | ✓     | ✓            | ✓          | ✓            |
| RECRUITER          | ✓         | ✓     | ✓            | ✓          | -            |
| EVALUATOR          | ✓         | -     | ✓            | ✓          | -            |
| CANDIDATE          | -         | -     | ✓ (próprias) | -          | -            |

## Credenciais Demo

- **Admin**: admin@sgc.pt / password123
- **Recrutador**: recruiter@acme.pt / password123
- **Avaliador**: avaliador@acme.pt / password123
- **Candidato**: candidato@email.pt / password123
