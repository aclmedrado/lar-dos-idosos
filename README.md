# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

---

## 📌 1. VISÃO GERAL

Sistema web para gestão de um lar de idosos, com foco em:

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

👉 Sempre lembrar:

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

Módulo de gestão de residentes implementado com operações básicas de CRUD no backend.

### Endpoints disponíveis

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

### Listar residentes

```bash
curl http://localhost:3333/residents
```

---

### Buscar residente por ID

```bash
curl http://localhost:3333/residents/SEU_ID_AQUI
```

---

### Atualizar residente

```bash
curl -X PATCH http://localhost:3333/residents/SEU_ID_AQUI \
-H "Content-Type: application/json" \
-d '{"fullName": "Maria Aparecida da Silva"}'
```

---

### Remover residente logicamente

```bash
curl -X DELETE http://localhost:3333/residents/SEU_ID_AQUI
```

A remoção não apaga o registro do banco. Ela altera o status do residente para:

```json
{
  "status": "INACTIVE"
}
```

---

### Validações

* `fullName` → obrigatório na criação
* `birthDate` → obrigatório na criação (formato ISO)
* `documentId` → opcional
* `status` → opcional na atualização
* Campos extras → rejeitados automaticamente
* UUID inválido → retorna `400 Bad Request`
* Residente inexistente → retorna `404 Not Found`
* `documentId` duplicado → retorna `409 Conflict`

---

## 🎯 10. FILOSOFIA DE DESENVOLVIMENTO

* Kaizen (evolução incremental)
* Escopo controlado por ticket
* Sem antecipação de complexidade
* Sem overengineering

---

## 🚫 11. REGRAS DO PROJETO

* Não implementar fora do ticket atual
* Não adicionar bibliotecas sem aprovação
* Não alterar infraestrutura sem revisão
* Não quebrar tickets anteriores
* Não misturar frontend com backend

---

## 📌 12. CONVENÇÕES

### Backend

* Controller → entrada HTTP
* Service → lógica + Prisma
* DTO → validação com class-validator

---

### Banco

* UUID como ID
* Enums para status
* createdAt / updatedAt padrão

---

## 📍 13. STATUS DO PROJETO

* ✅ T-001 — Bootstrap
* ✅ T-002 — Layout base
* ✅ T-003 — Dashboard mockado
* ✅ T-004 — Prisma + migration
* ✅ T-005 — API inicial de residentes
* ✅ T-006 — CRUD completo de residentes

---

## 🚀 14. PRÓXIMO PASSO

👉 T-007 — Integração do frontend com API de residentes

* consumir endpoints no Next.js
* listar residentes na interface
* criar fluxo básico de cadastro

---

## 🧠 15. ORGANIZAÇÃO DO TIME

* Líder Técnico / PO → você
* Desenvolvedor → Gemini
* Arquiteto → ChatGPT

---

## 📎 16. OBSERVAÇÃO FINAL

Sempre validar alterações com:

* logs reais
* curl
* docker funcionando

Antes de avançar para o próximo ticket.
