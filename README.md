# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

---

## 📌 1. VISÃO GERAL

Sistema web para gestão de um lar de idosos, com foco em:

* Simplicidade
* Evolução incremental (kaizen)
* Código limpo e sustentável

### Módulos planejados:

* Dashboard
* Residentes
* Funcionários
* Prontuários
* Financeiro (Livro Caixa)

---

## 🧱 2. ARQUITETURA DO PROJETO

### Stack

* **Backend:** NestJS + TypeScript
* **Frontend:** Next.js 15 (App Router)
* **Banco:** PostgreSQL 18
* **ORM:** Prisma
* **Infra:** Docker Compose
* **Monorepo:** pnpm workspaces

---

### Estrutura do projeto

```bash id="y9k3tm"
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

```bash id="z8pnq5"
pnpm install -r
```

---

### Criar arquivo de ambiente

```bash id="v6d2kp"
cp .env.example .env
```

---

## 🐳 4. SUBINDO O PROJETO

```bash id="c8yq2s"
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

```env id="z4fwc1"
DATABASE_URL="postgresql://postgres:postgres@db:5432/lar_idosos_db?schema=public"
```

---

## 🔧 6. MIGRATIONS (IMPORTANTE)

### Executar migration no monorepo

```bash id="xqg7m1"
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev --name init
```

---

### Gerar Prisma Client

```bash id="t3z4la"
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

```http id="lmv8c2"
GET /health
```

---

## 🧩 9. API DE RESIDENTES (T-005)

### Endpoints disponíveis

```http id="n9f2qb"
GET    /residents
GET    /residents/:id
POST   /residents
```

---

### Criar residente

```bash id="k7xpq1"
curl -X POST http://localhost:3333/residents \
-H "Content-Type: application/json" \
-d '{"fullName": "Maria da Silva", "birthDate": "1940-05-10", "documentId": "12345678900"}'
```

---

### Listar residentes

```bash id="f3p8zn"
curl http://localhost:3333/residents
```

---

### Buscar por ID

```bash id="v1t9xa"
curl http://localhost:3333/residents/SEU_ID_AQUI
```

---

### Resposta esperada

```json id="j4c2mu"
{
  "id": "uuid",
  "fullName": "Maria da Silva",
  "birthDate": "1940-05-10T00:00:00.000Z",
  "status": "ACTIVE"
}
```

---

### Validações

* `fullName` → obrigatório
* `birthDate` → obrigatório (formato ISO)
* `documentId` → opcional
* Campos extras → rejeitados automaticamente

---

## 🎯 10. FILOSOFIA DE DESENVOLVIMENTO

* Kaizen (evolução incremental)
* Escopo controlado por ticket
* Sem antecipação de complexidade
* Sem overengineering

---

## 🚫 11. REGRAS DO PROJETO

* Não implementar fora do ticket
* Não adicionar libs sem aprovação
* Não alterar infraestrutura sem revisão
* Não quebrar tickets anteriores
* Não misturar frontend e backend

---

## 📌 12. CONVENÇÕES

### Backend

* Controller → HTTP
* Service → lógica + Prisma
* DTO → validação

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
* ✅ T-005 — API de residentes

---

## 🚀 14. PRÓXIMO PASSO

👉 T-006 — CRUD completo de residentes

* PUT /residents/:id
* DELETE /residents/:id
* validações adicionais
* melhorias de erro

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
