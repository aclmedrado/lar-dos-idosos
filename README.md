# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

---

## 📌 1. VISÃO GERAL

Sistema web para gestão de um lar de idosos, desenvolvido com foco em:

* Simplicidade
* Evolução incremental (kaizen)
* Código limpo e sustentável

---

### Módulos do sistema

* Dashboard
* Residentes ✅
* Funcionários ✅
* Prontuários (em breve)
* Financeiro (em breve)

---

## 🧱 2. ARQUITETURA DO PROJETO

### Stack

* Backend: NestJS + TypeScript
* Frontend: Next.js 15 (App Router)
* Banco de dados: PostgreSQL
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
└── README.md
```

---

## ⚙️ 3. SETUP DO AMBIENTE

### Pré-requisitos

* Windows 11 + WSL
* Docker + Docker Compose
* Node.js
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

## 🔧 6. MIGRATIONS

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev
```

---

## ⚠️ 7. REGRA DO MONOREPO

* Container roda em: `/usr/src/app`
* Prisma está em: `/usr/src/app/apps/api`

✔ Sempre usar:

```bash
docker compose exec -w /usr/src/app/apps/api api ...
```

---

## 📡 8. BACKEND

### Endpoint de saúde

```http
GET /health
```

---

## 🧩 9. API DE RESIDENTES

CRUD completo de residentes.

### Endpoints

```http
GET    /residents
GET    /residents/:id
POST   /residents
PATCH  /residents/:id
DELETE /residents/:id
```

---

### Regras

* `fullName` obrigatório
* `birthDate` obrigatório
* `documentId` opcional (único)
* Soft delete com `status = INACTIVE`

---

## 🧩 10. API DE FUNCIONÁRIOS

CRUD completo de funcionários.

### Endpoints

```http
GET    /employees
GET    /employees/:id
POST   /employees
PATCH  /employees/:id
DELETE /employees/:id
```

---

### Criar funcionário

```bash
curl -X POST http://localhost:3333/employees \
-H "Content-Type: application/json" \
-d '{"fullName": "João Silva", "role": "Cuidador"}'
```

---

### Regras

* `fullName` obrigatório
* `role` obrigatório
* `documentId` opcional (único)
* `email` opcional (validado)
* `phone` opcional
* Soft delete com `status = INACTIVE`

---

### Validações

* UUID inválido → 400
* não encontrado → 404
* documento duplicado → 409

---

## 💻 11. FRONTEND

### Página de residentes

```txt
http://localhost:3000/residentes
```

---

### Funcionalidades

* Listagem via API
* Cadastro
* Edição
* Inativação
* Feedback de erro/sucesso

---

## 🌐 12. VARIÁVEIS DE AMBIENTE (FRONTEND)

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

---

## 🧱 13. PADRÃO DE ARQUITETURA (IMPORTANTE)

### PrismaModule

O projeto utiliza um módulo dedicado para o Prisma:

* `PrismaModule` exporta `PrismaService`
* Importado nos módulos:

  * ResidentsModule
  * EmployeesModule

✔ Evita múltiplas conexões com o banco
✔ Evita dependências circulares
✔ Mantém arquitetura limpa

---

## 🎯 14. FILOSOFIA DE DESENVOLVIMENTO

* Kaizen (incremental)
* Escopo controlado por ticket
* Sem overengineering
* Evolução guiada por necessidade real

---

## 🚫 15. REGRAS DO PROJETO

* Não implementar fora do ticket
* Não adicionar libs sem aprovação
* Não alterar infraestrutura sem revisão
* Não quebrar funcionalidades existentes
* Backend e frontend desacoplados

---

## 📌 16. CONVENÇÕES

### Backend

* Controller → HTTP
* Service → lógica + Prisma
* DTO → validação

### Frontend

* Fetch centralizado em `lib/`
* CSS Modules
* Componentes simples e reutilizáveis

---

## 📍 17. STATUS DO PROJETO

* ✅ T-001 — Bootstrap
* ✅ T-002 — Layout base
* ✅ T-003 — Dashboard mockado
* ✅ T-004 — Prisma + migration
* ✅ T-005 — API residentes
* ✅ T-006 — CRUD residentes backend
* ✅ T-007 — Front residentes
* ✅ T-008 — Gestão completa residentes
* ✅ T-009 — Módulo de funcionários (backend)

---

## 🚀 18. PRÓXIMOS PASSOS

* T-010 — Frontend de Funcionários
* T-011 — Prontuários médicos
* T-012 — Financeiro (livro caixa)
* T-013 — Refinamento de UX

---

## 🧠 19. ORGANIZAÇÃO DO TIME

* Product Owner / Líder Técnico → você
* Desenvolvedor → Gemini
* Arquiteto / CTO → ChatGPT

---

## 📎 20. OBSERVAÇÃO FINAL

Antes de avançar para novos tickets, sempre validar:

* logs do backend
* comportamento da API
* testes via curl
* funcionamento do fluxo completo

---
