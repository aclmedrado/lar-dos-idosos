# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

## 📌 Visão Geral

Este projeto é um sistema web para gestão de um lar de idosos, desenvolvido com foco em simplicidade, evolução incremental (kaizen) e boas práticas modernas.

O sistema irá contemplar módulos como:

* Dashboard
* Residentes
* Funcionários
* Prontuários
* Financeiro (Livro Caixa)

---

## 🧱 Arquitetura

* **Monorepo (pnpm workspaces)**
* **Backend**: NestJS (Node.js 24 + TypeScript)
* **Frontend**: Next.js 15 (App Router)
* **Banco de dados**: PostgreSQL 18
* **ORM**: Prisma
* **Infra local**: Docker Compose

Estrutura:

```
lar-dos-idosos/
├── apps/
│   ├── api/        # Backend (NestJS + Prisma)
│   └── web/        # Frontend (Next.js)
├── docker-compose.yml
├── .env
├── .env.example
├── pnpm-workspace.yaml
```

---

## ⚙️ Ambiente de Desenvolvimento

Requisitos:

* Windows 11 + WSL
* Docker + Docker Compose
* Node.js 24 (via corepack)
* pnpm

---

## 🚀 Setup Inicial

### 1. Instalar dependências (host)

```bash
pnpm install -r
```

### 2. Criar arquivo de ambiente

```bash
cp .env.example .env
```

---

## 🐳 Subindo o ambiente

```bash
docker compose up --build
```

Serviços:

* Frontend: http://localhost:3000
* Backend: http://localhost:3333
* Healthcheck: http://localhost:3333/health

---

## 🗄️ Banco de Dados (Prisma)

### 🔑 Variável de conexão

Definida em `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/lar_idosos_db?schema=public"
```

---

## 📦 Executando Migrations (IMPORTANTE)

Como o projeto é um monorepo, os comandos do Prisma devem ser executados **dentro do app da API**.

### Criar e aplicar migration:

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev --name init
```

### Gerar client manualmente (se necessário):

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma generate
```

---

## 🧠 Padrão de Execução no Monorepo

⚠️ Regra importante:

* O container roda na raiz: `/usr/src/app`
* O Prisma está em: `/usr/src/app/apps/api`

➡️ Portanto:

* Sempre usar `-w /usr/src/app/apps/api`
* OU usar `pnpm --filter`

---

## 📡 Backend (NestJS)

### Endpoint de saúde

```
GET /health
```

---

## 🧩 Módulos do Backend

Atualmente implementado:

* Residents (T-005 em andamento)

---

## 🎯 Filosofia de Desenvolvimento

Este projeto segue:

* **Kaizen** (evolução incremental)
* **Escopo controlado por ticket**
* **Sem antecipação de complexidade**
* **Sem overengineering**

---

## 🚫 Regras Importantes

* Não implementar funcionalidades fora do ticket atual
* Não adicionar bibliotecas sem aprovação
* Não antecipar domínio complexo
* Não misturar frontend com backend
* Não quebrar tickets anteriores

---

## 📌 Convenções

### Backend

* Controller → entrada HTTP
* Service → regra simples + Prisma
* DTO → validação com class-validator

### Banco

* UUID como ID
* Enums para status
* createdAt / updatedAt padrão

---

## 📍 Status Atual do Projeto

* ✅ T-001: Bootstrap
* ✅ T-002: Layout base
* ✅ T-003: Dashboard mockado
* ✅ T-004: Prisma + migration
* 🔄 T-005: API de Residentes (em andamento)

---

## 🧭 Próximos Passos

* CRUD completo de residentes
* Funcionários
* Prontuários
* Financeiro

---

## 🧑‍💻 Observação Final

Este projeto é conduzido por:

* Líder Técnico (PO)
* Desenvolvedor (Gemini)
* Arquiteto (ChatGPT)

Toda implementação deve seguir rigorosamente os tickets definidos.

---
