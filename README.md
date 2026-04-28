# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

---

## 📌 1. VISÃO GERAL

Sistema web para gestão de um lar de idosos, desenvolvido com foco em:

* Simplicidade
* Evolução incremental (kaizen)
* Código limpo e sustentável

### Módulos planejados

* Dashboard
* Residentes
* Funcionários
* Prontuários
* Financeiro (Livro Caixa)

---

## 🧱 2. ARQUITETURA DO PROJETO

### Stack

* Backend: NestJS + TypeScript
* Frontend: Next.js 15 (App Router)
* Banco de dados: PostgreSQL 18
* ORM: Prisma
* Infraestrutura: Docker Compose
* Monorepo: pnpm workspaces

---

### Estrutura do projeto

```bash
lar-dos-idosos/
├── apps/
│   ├── api/        # Backend (NestJS + Prisma)
│   └── web/        # Frontend (Next.js)
├── docker-compose.yml
├── .env
├── .env.example
├── pnpm-workspace.yaml
├── README.md
```

---

## ⚙️ 3. SETUP DO AMBIENTE

### Pré-requisitos

* Windows 11 + WSL
* Docker + Docker Compose
* Node.js 24
* pnpm

---

### Instalar dependências

```bash
pnpm install -r
```

---

### Criar arquivo de ambiente

```bash
cp .env.example .env
```

---

## 🐳 4. SUBINDO O PROJETO

```bash
docker compose up --build
```

---

### URLs

* Frontend: http://localhost:3000
* Backend: http://localhost:3333
* Healthcheck: http://localhost:3333/health

---

## 🗄️ 5. BANCO DE DADOS (PRISMA)

### Variável de conexão

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/lar_idosos_db?schema=public"
```

---

## 🔧 6. MIGRATIONS (IMPORTANTE)

### Executar migration no monorepo

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev --name init
```

---

### Gerar Prisma Client

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma generate
```

---

## ⚠️ 7. REGRA DO MONOREPO (CRÍTICA)

* O container roda em: `/usr/src/app`
* O Prisma está em: `/usr/src/app/apps/api`

✔ Portanto:

* Sempre usar `-w /usr/src/app/apps/api`
* OU usar `pnpm --filter`

---

## 📡 8. BACKEND (NESTJS)

### Endpoint de saúde

```http
GET /health
```

---

## 🧩 9. API DE RESIDENTES

CRUD completo de residentes disponível no backend.

### Endpoints

```http
GET    /residents
GET    /residents/:id
POST   /residents
PATCH  /residents/:id
DELETE /residents/:id
```

---

### Criar residente

```bash
curl -X POST http://localhost:3333/residents \
-H "Content-Type: application/json" \
-d '{"fullName": "Maria da Silva", "birthDate": "1940-05-10", "documentId": "12345678900"}'
```

---

### Atualizar residente

```bash
curl -X PATCH http://localhost:3333/residents/SEU_ID_AQUI \
-H "Content-Type: application/json" \
-d '{"fullName": "Maria Aparecida da Silva"}'
```

---

### Inativar residente (soft delete)

```bash
curl -X DELETE http://localhost:3333/residents/SEU_ID_AQUI
```

---

### Regras

* `fullName` obrigatório na criação
* `birthDate` obrigatório (ISO)
* `documentId` opcional
* UUID inválido → 400
* não encontrado → 404
* documento duplicado → 409
* DELETE não remove do banco → apenas `status = INACTIVE`

---

## 💻 10. FRONTEND — RESIDENTES

### Página

```txt
http://localhost:3000/residentes
```

---

### Funcionalidades implementadas

* Listagem de residentes via API
* Cadastro de residente
* Edição de residente
* Inativação (soft delete)
* Atualização automática da lista
* Feedback de erro e sucesso

---

### Fluxo de uso

1. Criar residente pelo formulário
2. Visualizar na lista
3. Editar clicando em “Editar”
4. Cancelar edição se necessário
5. Inativar clicando em “Inativar”

---

### Regras de UI

* Residentes inativos permanecem visíveis
* Linhas inativas possuem aparência reduzida
* Botão de inativar fica desabilitado após uso
* Formulário alterna entre modo criação e edição

---

## 🌐 11. VARIÁVEIS DE AMBIENTE (FRONTEND)

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

---

## 🎯 12. FILOSOFIA DE DESENVOLVIMENTO

* Kaizen (incremental)
* Escopo por ticket
* Sem overengineering
* Sem antecipação de complexidade

---

## 🚫 13. REGRAS DO PROJETO

* Não implementar fora do ticket
* Não adicionar libs sem aprovação
* Não alterar infraestrutura sem revisão
* Não quebrar funcionalidades existentes
* Backend e frontend desacoplados

---

## 📌 14. CONVENÇÕES

### Backend

* Controller → HTTP
* Service → lógica + Prisma
* DTO → validação

### Frontend

* Client Components para interação
* Fetch centralizado em `lib/`
* CSS Modules
* Componentes pequenos e reutilizáveis

---

## 📍 15. STATUS DO PROJETO

* ✅ T-001 — Bootstrap
* ✅ T-002 — Layout base
* ✅ T-003 — Dashboard mockado
* ✅ T-004 — Prisma + migration
* ✅ T-005 — API inicial de residentes
* ✅ T-006 — CRUD backend completo
* ✅ T-007 — Front consumindo API
* ✅ T-008 — Gestão completa no frontend

---

## 🚀 16. PRÓXIMOS PASSOS

Possíveis evoluções:

* T-009 — Refinamento de UX
* T-010 — Módulo de Funcionários
* T-011 — Prontuários médicos
* T-012 — Financeiro (livro caixa)

---

## 🧠 17. ORGANIZAÇÃO DO TIME

* Product Owner / Líder Técnico → você
* Desenvolvedor → Gemini
* Arquiteto / CTO → ChatGPT

---

## 📎 18. OBSERVAÇÃO FINAL

Sempre validar:

* logs reais
* testes via UI
* testes via curl
* comportamento completo do fluxo

Antes de avançar para o próximo ticket.
