# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

---

## 📌 1. VISÃO GERAL

Sistema web para gestão de um lar de idosos, com foco em:

* Simplicidade
* Evolução incremental (Kaizen)
* Código limpo e sustentável

---

## 🧩 Módulos do sistema

* Dashboard
* Residentes ✅
* Funcionários ✅
* Prontuários (em breve)
* Financeiro (em breve)

---

## 🧱 2. ARQUITETURA DO PROJETO

### Stack

* Backend: NestJS + TypeScript
* Frontend: Next.js (App Router)
* Banco: PostgreSQL
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

### Configurar ambiente

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

* Frontend → http://localhost:3000
* Backend → http://localhost:3333
* Healthcheck → http://localhost:3333/health

---

## 🗄️ 5. BANCO DE DADOS

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

Sempre usar:

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

* Nome obrigatório
* Data de nascimento obrigatória
* Documento opcional (único)
* Soft delete (`status = INACTIVE`)

---

## 🧩 10. API DE FUNCIONÁRIOS

### Endpoints

```http
GET    /employees
GET    /employees/:id
POST   /employees
PATCH  /employees/:id
DELETE /employees/:id
```

---

### Regras

* Nome obrigatório
* Cargo obrigatório
* Documento opcional (único)
* Email validado
* Soft delete (`status = INACTIVE`)

---

## 💻 11. FRONTEND

---

### 🔹 Página de Residentes

```txt
http://localhost:3000/residentes
```

#### Funcionalidades

* Listagem
* Cadastro
* Edição
* Inativação
* Feedback visual

---

### 🔹 Página de Funcionários

```txt
http://localhost:3000/funcionarios
```

#### Funcionalidades

* Listagem
* Cadastro
* Edição
* Inativação
* Feedback visual

---

## 🌐 12. VARIÁVEIS DE AMBIENTE (FRONTEND)

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

---

## 🧱 13. PADRÃO DE ARQUITETURA

### PrismaModule

* Centraliza o PrismaService
* Importado pelos módulos:

  * ResidentsModule
  * EmployeesModule

✔ Evita múltiplas conexões
✔ Evita dependência circular
✔ Mantém arquitetura limpa

---

## 🎯 14. FILOSOFIA

* Kaizen
* Evolução incremental
* Sem overengineering
* Escopo controlado por ticket

---

## 🚫 15. REGRAS DO PROJETO

* Não adicionar libs sem aprovação
* Não alterar infraestrutura sem revisão
* Não quebrar funcionalidades existentes
* Backend e frontend desacoplados

---

## 📌 16. CONVENÇÕES

### Backend

* Controller → HTTP
* Service → regras de negócio
* DTO → validação

### Frontend

* Fetch centralizado em `/lib`
* CSS Modules
* Componentes reutilizáveis

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
* ✅ T-009 — Funcionários backend
* ✅ T-010 — Funcionários frontend

---

## 🚀 18. PRÓXIMOS PASSOS

* T-011 — Refinamento de UX
* T-012 — Prontuários médicos
* T-013 — Financeiro (livro caixa)

---

## 🧠 19. TIME

* Product Owner → você
* Desenvolvedor → Gemini
* Arquiteto / CTO → ChatGPT

---

## 📎 20. OBSERVAÇÃO FINAL

Sempre validar:

* API via curl
* Fluxo completo na UI
* Logs do backend

Antes de avançar para o próximo ticket.
