# SGC — Sistema de Gestão de Candidaturas

## Documentação para Apresentação Não Técnica

---

## 1. O que é o SGC?

O **SGC (Sistema de Gestão de Candidaturas)** é uma plataforma digital pensada para empresas, instituições públicas e privadas gerirem todo o ciclo de recrutamento e seleção de candidatos.

Permite publicar vagas, receber candidaturas, avaliar candidatos e acompanhar todo o processo num único lugar, de forma organizada e transparente.

---

## 2. Para quem é?

| Público-alvo | Utilização |
|--------------|------------|
| **Empresas privadas** | Recrutamento de colaboradores |
| **Instituições públicas** | Concursos e processos seletivos |
| **Universidades e escolas** | Bolsas, estágios e programas |
| **Associações e ONGs** | Voluntariado e programas institucionais |

O sistema está preparado para funcionar com várias organizações ao mesmo tempo (multi-organização), permitindo que cada entidade tenha o seu espaço e dados separados.

---

## 3. Principais funcionalidades

### 3.1 Gestão de vagas

- Criar novas vagas com título, descrição e requisitos
- Definir prazos de candidatura
- Definir critérios de avaliação e respetivos pesos
- Controlar o estado da vaga: rascunho, aberta, encerrada ou finalizada

### 3.2 Candidaturas

- Candidatos submetem candidaturas às vagas
- Upload de documentos (CV, carta de motivação, etc.)
- Acompanhamento do estado: submetida, em triagem, em avaliação, aprovada ou rejeitada
- Linha do tempo com o histórico de cada candidatura

### 3.3 Avaliação

- Avaliação por critérios com pontuação
- Comentários internos dos avaliadores
- Possibilidade de vários avaliadores por candidatura
- Consolidação dos resultados

### 3.4 Dashboard e relatórios

- Indicadores em tempo real:
  - Total de candidaturas
  - Taxa de aprovação
  - Vagas ativas
  - Tempo médio de avaliação
- Distribuição das candidaturas por estado
- Atividade recente

### 3.5 Gestão de utilizadores

- Diferentes perfis com permissões distintas
- Gestão de utilizadores por organização

---

## 4. Perfis de utilizador

| Perfil | Descrição | O que pode fazer |
|--------|-----------|------------------|
| **Super Admin** | Administrador do sistema | Acesso total a todas as funcionalidades e organizações |
| **Admin da Organização** | Responsável por uma organização | Gerir utilizadores, vagas e candidaturas da sua organização |
| **Recrutador** | Responsável pelo recrutamento | Criar e editar vagas, gerir candidaturas e triagem |
| **Avaliador** | Avalia candidatos | Ver candidaturas e submeter avaliações |
| **Candidato** | Pessoa que se candidata | Submeter candidaturas e acompanhar o seu estado |

Cada utilizador vê apenas o que o seu perfil permite, garantindo segurança e organização.

---

## 5. Áreas do sistema

### 5.1 Página de login

- Acesso seguro com email e palavra-passe
- Recuperação de palavra-passe
- Credenciais de demonstração para testar cada perfil com um clique

### 5.2 Dashboard

- Visão geral dos indicadores principais
- Gráficos e métricas
- Atalhos para as áreas mais usadas

### 5.3 Vagas

- Lista de todas as vagas
- Pesquisa e filtros por estado
- Criar, editar e ver detalhes de cada vaga
- Ver candidaturas recebidas por vaga

### 5.4 Candidaturas

- Lista de todas as candidaturas
- Filtro por estado
- Detalhe de cada candidatura com documentos e linha do tempo

### 5.5 Avaliações

- Candidaturas em fase de avaliação
- Acesso rápido para avaliar e submeter pontuações

### 5.6 Utilizadores

- Lista de utilizadores da organização
- Informação de perfil e estado (ativo/inativo)

### 5.7 Relatórios

- Distribuição por estado
- Resumo executivo
- Indicadores para decisão

---

## 6. Benefícios

| Benefício | Descrição |
|-----------|------------|
| **Organização** | Toda a informação num único sistema |
| **Transparência** | Histórico e linha do tempo de cada candidatura |
| **Eficiência** | Menos tempo em tarefas manuais e repetitivas |
| **Rastreabilidade** | Registo de quem fez o quê e quando |
| **Escalabilidade** | Preparado para crescer com a organização |
| **Segurança** | Perfis e permissões adequados a cada função |

---

## 7. Experiência do utilizador

- Interface clara e profissional
- Navegação lateral com acesso rápido às áreas principais
- Pesquisa global no topo do ecrã
- Breadcrumbs para saber onde se está
- Estados de carregamento e feedback visual
- Tratamento de erros e mensagens claras

---

## 8. Credenciais de demonstração

Para testar o sistema, pode usar os seguintes perfis (palavra-passe: **password123**):

| Perfil | Email |
|--------|-------|
| Super Admin | admin@sgc.pt |
| Admin da Organização | org-admin@acme.pt |
| Recrutador | recruiter@acme.pt |
| Avaliador | avaliador@acme.pt |
| Candidato | candidato@email.pt |

Na página de login, pode clicar num perfil para preencher os campos automaticamente ou em "Entrar" para aceder diretamente.

---

## 9. Estado atual e próximos passos

### O que já está disponível

- Interface completa e funcional
- Todas as áreas principais implementadas
- Dados de demonstração para teste
- Fluxos de trabalho simulados

### Próximas fases (quando houver backend)

- Ligação a base de dados real
- Autenticação segura (JWT)
- Upload real de documentos
- Notificações por email
- Auditoria e logs completos

---

## 10. Resumo para apresentação

**O SGC é uma solução enterprise para gestão de candidaturas**, que permite:

1. **Publicar vagas** com critérios e prazos definidos  
2. **Receber candidaturas** com documentos anexados  
3. **Triar e avaliar** candidatos de forma estruturada  
4. **Acompanhar** todo o processo em dashboards e relatórios  
5. **Garantir** segurança e rastreabilidade através de perfis e permissões  

O sistema está preparado para ser usado por empresas e instituições de diferentes dimensões e setores, com uma interface moderna e intuitiva.

---

*Documento preparado para apresentação não técnica — SGC v1.0*
