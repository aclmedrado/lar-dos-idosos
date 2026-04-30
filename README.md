# 🏡 Associação Lar dos Idosos de Nazário — Sistema de Gestão

---

## 📌 1. VISÃO GERAL

Sistema web para gestão da **Associação Lar dos Idosos de Nazário**, desenvolvido com foco em:

- Simplicidade
- Evolução incremental
- Código limpo e sustentável
- Baixa complexidade operacional
- Boa experiência de uso

O projeto segue uma abordagem **Kaizen**, com entregas pequenas, revisadas e validadas antes de avançar para o próximo módulo.

---

## 🧩 2. MÓDULOS DO SISTEMA

### Implementados

- Dashboard
- Residentes
- Funcionários
- Prontuários médicos — backend

### Planejados

- Prontuários médicos — frontend
- Financeiro / Livro caixa
- Autenticação e controle de acesso
- Auditoria
- Relatórios

---

## 🧱 3. ARQUITETURA DO PROJETO

### Stack

- **Frontend:** Next.js 15 + TypeScript
- **Backend:** NestJS 11 + TypeScript
- **Banco de dados:** PostgreSQL 18
- **ORM:** Prisma
- **Infra local:** Docker Compose
- **Monorepo:** pnpm workspaces
- **Estilo:** CSS Modules
- **Gerenciamento visual:** componentes UI próprios simples

---

## 📁 4. ESTRUTURA GERAL

```txt
lar-dos-idosos/
├── apps/
│   ├── api/        # Backend NestJS + Prisma
│   └── web/        # Frontend Next.js
├── docker-compose.yml
├── .env
├── .env.example
├── pnpm-workspace.yaml
└── README.md
```

---

## ⚙️ 5. SETUP DO AMBIENTE

### Pré-requisitos

- Windows 11 + WSL
- Docker + Docker Compose
- Node.js 24
- pnpm
- VS Code com Remote WSL

---

### Instalar dependências

Na raiz do projeto:

```bash
pnpm install -r
```

---

### Criar arquivo de ambiente

```bash
cp .env.example .env
```

---

## 🐳 6. SUBINDO O PROJETO

Na raiz do projeto:

```bash
docker compose up --build
```

---

### URLs principais

- Frontend: http://localhost:3000
- Backend: http://localhost:3333
- Healthcheck: http://localhost:3333/health

---

## 🗄️ 7. BANCO DE DADOS

### Variável de conexão

No `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/lar_idosos_db?schema=public"
```

---

## 🔧 8. MIGRATIONS COM PRISMA

Como o projeto é um monorepo, os comandos do Prisma devem ser executados dentro do app da API.

### Executar migrations

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev
```

---

### Criar uma migration nomeada

Exemplo:

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev --name add_medical_record
```

---

### Gerar Prisma Client

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma generate
```

---

### Validar schema Prisma

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma validate
```

---

## ⚠️ 9. REGRA IMPORTANTE DO MONOREPO

O container roda na raiz:

```txt
/usr/src/app
```

O Prisma está em:

```txt
/usr/src/app/apps/api
```

Portanto, comandos relacionados à API/Prisma devem usar:

```bash
docker compose exec -w /usr/src/app/apps/api api ...
```

Ou usar `pnpm --filter` quando fizer sentido.

---

## 📡 10. BACKEND

### Healthcheck

```http
GET /health
```

---

## 🧱 11. PADRÃO DE ARQUITETURA DO BACKEND

### PrismaModule

O projeto utiliza um módulo dedicado para disponibilizar o Prisma.

```txt
apps/api/src/prisma.module.ts
apps/api/src/prisma.service.ts
```

O `PrismaModule`:

- fornece `PrismaService`;
- exporta `PrismaService`;
- é importado pelos módulos que precisam acessar o banco.

### Módulos que usam Prisma

- `ResidentsModule`
- `EmployeesModule`
- `MedicalRecordsModule`

### Regra

Não registrar `PrismaService` diretamente em cada módulo de domínio.

Correto:

```ts
imports: [PrismaModule]
```

Evitar:

```ts
providers: [PrismaService]
```

---

## 🧩 12. API DE RESIDENTES

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

### Atualizar residente

```bash
curl -X PATCH http://localhost:3333/residents/SEU_ID_AQUI \
-H "Content-Type: application/json" \
-d '{"fullName": "Maria Aparecida da Silva"}'
```

---

### Inativar residente

```bash
curl -X DELETE http://localhost:3333/residents/SEU_ID_AQUI
```

---

### Regras

- `fullName` obrigatório na criação
- `birthDate` obrigatório na criação
- `documentId` opcional e único
- `status` padrão: `ACTIVE`
- remoção é lógica, alterando `status` para `INACTIVE`
- UUID inválido retorna `400`
- registro inexistente retorna `404`
- `documentId` duplicado retorna `409`

---

## 🧩 13. API DE FUNCIONÁRIOS

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
-d '{"fullName": "João Silva", "role": "Cuidador", "email": "joao@exemplo.com"}'
```

---

### Listar funcionários

```bash
curl http://localhost:3333/employees
```

---

### Atualizar funcionário

```bash
curl -X PATCH http://localhost:3333/employees/SEU_ID_AQUI \
-H "Content-Type: application/json" \
-d '{"role": "Enfermeiro"}'
```

---

### Inativar funcionário

```bash
curl -X DELETE http://localhost:3333/employees/SEU_ID_AQUI
```

---

### Regras

- `fullName` obrigatório na criação
- `role` obrigatório na criação
- `documentId` opcional e único
- `phone` opcional
- `email` opcional e validado
- `status` padrão: `ACTIVE`
- remoção é lógica, alterando `status` para `INACTIVE`
- UUID inválido retorna `400`
- registro inexistente retorna `404`
- `documentId` duplicado retorna `409`

---

## 🧩 14. API DE PRONTUÁRIOS MÉDICOS

Backend do módulo de prontuários médicos.

Cada residente pode possuir **apenas um prontuário médico**.

### Endpoints

```http
GET   /medical-records
GET   /medical-records/:id
GET   /medical-records/resident/:residentId
POST  /medical-records
PATCH /medical-records/:id
```

Não existe endpoint `DELETE` neste módulo.

---

### Criar prontuário

```bash
curl -X POST http://localhost:3333/medical-records \
-H "Content-Type: application/json" \
-d '{
  "residentId": "UUID_DO_RESIDENTE",
  "allergies": "Dipirona",
  "chronicDiseases": "Hipertensão",
  "disabilities": "Mobilidade reduzida",
  "usesContinuousMedication": true,
  "currentMedications": "Losartana 50mg",
  "medicalHistory": "Histórico médico resumido.",
  "notes": "Acompanhamento mensal."
}'
```

---

### Listar prontuários

```bash
curl http://localhost:3333/medical-records
```

A resposta inclui dados básicos do residente vinculado:

```json
{
  "resident": {
    "id": "uuid",
    "fullName": "Nome do residente",
    "status": "ACTIVE"
  }
}
```

---

### Buscar prontuário por ID

```bash
curl http://localhost:3333/medical-records/UUID_DO_PRONTUARIO
```

---

### Buscar prontuário por residente

```bash
curl http://localhost:3333/medical-records/resident/UUID_DO_RESIDENTE
```

---

### Atualizar prontuário

```bash
curl -X PATCH http://localhost:3333/medical-records/UUID_DO_PRONTUARIO \
-H "Content-Type: application/json" \
-d '{
  "notes": "Observação atualizada.",
  "usesContinuousMedication": false
}'
```

---

### Regras

- `residentId` é obrigatório na criação
- `residentId` precisa ser UUID válido
- residente precisa existir
- cada residente pode ter apenas um prontuário
- segundo prontuário para o mesmo residente retorna `409`
- prontuário inexistente retorna `404`
- residente inexistente retorna `404`
- residente existente sem prontuário retorna `404`
- UUID inválido retorna `400`
- `usesContinuousMedication` deve ser booleano
- `residentId` não pode ser alterado via `PATCH`
- não há exclusão de prontuário no MVP

---

### Migration

```bash
docker compose exec -w /usr/src/app/apps/api api pnpm prisma migrate dev --name add_medical_record
```

---

## 💻 15. FRONTEND

### Página de Dashboard

```txt
http://localhost:3000/dashboard
```

Contém indicadores mockados e visão geral inicial do sistema.

---

### Página de Residentes

```txt
http://localhost:3000/residentes
```

Funcionalidades:

- listagem via API;
- cadastro;
- edição;
- cancelamento de edição;
- inativação;
- feedback visual de sucesso/erro;
- badge de status;
- estado vazio;
- estado de carregamento.

---

### Página de Funcionários

```txt
http://localhost:3000/funcionarios
```

Funcionalidades:

- listagem via API;
- cadastro;
- edição;
- cancelamento de edição;
- inativação;
- feedback visual de sucesso/erro;
- badge de status;
- estado vazio;
- estado de carregamento.

---

### Página de Prontuários

Ainda não implementada.

O backend de prontuários foi concluído no T-012. O frontend será tratado em ticket próprio.

---

## 🌐 16. VARIÁVEIS DE AMBIENTE DO FRONTEND

No `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

O frontend usa essa variável para consumir a API NestJS.

---

## 🎨 17. PADRÃO DE UI DO FRONTEND

Após o T-011, o projeto passou a ter componentes e CSS compartilhados para evitar duplicação e manter consistência visual.

---

### Estrutura oficial de UI

```txt
apps/web/components/ui/
├── badge/
│   ├── index.tsx
│   └── badge.module.css
├── feedback/
│   ├── index.tsx
│   └── feedback.module.css
├── form/
│   └── form.module.css
└── table/
    └── table.module.css
```

---

## 🟢 18. COMPONENTE FEEDBACK

Usado para mensagens visuais de sucesso, erro ou informação.

### Uso

```tsx
import { Feedback } from '@/components/ui/feedback';

<Feedback type="success" message="Registro salvo com sucesso!" />
<Feedback type="error" message="Erro ao salvar registro." />
<Feedback type="info" message="Carregando informações..." />
```

### Regra

Não usar `alert()` para mensagens de sucesso ou erro.

---

## 🏷️ 19. COMPONENTE BADGE

Usado para exibir status visual.

### Uso

```tsx
import { Badge } from '@/components/ui/badge';

<Badge status={resident.status} />
<Badge status={employee.status} />
```

### Status tratados

```txt
ACTIVE   -> Ativo
INACTIVE -> Inativo
```

---

## 🧾 20. PADRÃO DE FORMULÁRIOS

O CSS comum de formulários fica em:

```txt
apps/web/components/ui/form/form.module.css
```

### Uso obrigatório

```tsx
import styles from '@/components/ui/form/form.module.css';
```

### Regra

Não criar CSS local de formulário se o formulário seguir o padrão comum.

Evitar recriar arquivos como:

```txt
algum-modulo-form.module.css
```

Só criar CSS específico de formulário se houver diferença real daquele módulo.

---

## 📊 21. PADRÃO DE TABELAS E LISTAS

O CSS comum de tabelas fica em:

```txt
apps/web/components/ui/table/table.module.css
```

### Uso

```tsx
import tableStyles from '@/components/ui/table/table.module.css';
import styles from './nome-do-modulo-list.module.css';
```

### Regra

Usar `tableStyles` para estilos comuns:

- `tableContainer`
- `feedbackMsg`
- `table`
- `th`
- `td`
- `actions`
- `actionBtnEdit`
- `actionBtnDelete`

Usar o CSS local do módulo apenas para diferenças reais:

- `emptyState`
- `activeRow`
- `inactiveRow`
- `subtext`
- ajustes específicos do módulo

---

### Exemplo de uso

```tsx
<td className={`${tableStyles.td} ${styles.td}`}>
  <strong>{item.fullName}</strong>
</td>
```

---

## 🧹 22. ARQUIVOS REMOVIDOS NO T-011

Estes arquivos foram removidos porque o CSS de formulário foi centralizado:

```txt
apps/web/components/residents/residents-form/residents-form.module.css
apps/web/components/employees/employees-form/employees-form.module.css
```

Não recriar esses arquivos sem necessidade real.

---

## 🧭 23. REGRAS DE QUALIDADE

### Backend

- não usar `any`;
- usar DTOs com `class-validator`;
- usar `ParseUUIDPipe` em parâmetros `id`;
- manter service simples;
- tratar `404`, `400` e `409` quando aplicável;
- não criar abstrações antes da necessidade;
- entregar arquivos críticos completos, especialmente `schema.prisma`.

### Frontend

- não usar `alert()`;
- usar `Feedback` para mensagens;
- usar `Badge` para status;
- centralizar chamadas HTTP em `lib/`;
- usar CSS compartilhado quando houver padrão comum;
- evitar duplicação de CSS;
- manter componentes pequenos e legíveis.

---

## 🚫 24. REGRAS DO PROJETO

- Não implementar fora do ticket atual.
- Não adicionar bibliotecas sem aprovação.
- Não alterar infraestrutura sem revisão.
- Não quebrar funcionalidades existentes.
- Não duplicar CSS compartilhável.
- Não substituir README parcialmente sem orientação.
- Não commitar arquivos locais de ferramenta, como `.codex/`.
- Não executar migrations sem revisão prévia quando houver alteração de schema.

---

## 🤖 25. USO DO CODEX CLI

O Codex CLI pode ser usado para tarefas pequenas e localizadas, como:

- refatoração de CSS;
- ajustes pontuais de tipagem;
- remoção de duplicação;
- correções simples em um conjunto limitado de arquivos;
- smoke tests via `curl`.

### Regra

Codex não deve ser usado para decisões arquiteturais, migrations, Docker ou novos módulos completos sem revisão do Arquiteto.

### Observação sobre testes contra localhost

Para o Codex acessar a API local em `localhost`, pode ser necessário habilitar rede:

```bash
codex exec -c sandbox_workspace_write.network_access=true "..."
```

Sem essa flag, o Codex pode falhar com erro de conexão mesmo que a API esteja rodando.

---

## 📍 26. STATUS DO PROJETO

- ✅ T-001 — Bootstrap
- ✅ T-002 — Layout base
- ✅ T-003 — Dashboard mockado
- ✅ T-004 — Prisma + migration
- ✅ T-005 — API inicial de residentes
- ✅ T-006 — CRUD residentes backend
- ✅ T-007 — Frontend residentes consumindo API
- ✅ T-008 — Gestão completa de residentes no frontend
- ✅ T-009 — Funcionários backend
- ✅ T-010 — Funcionários frontend
- ✅ T-011 — Refinamento global de UX
- ✅ T-012 — Prontuários médicos backend

---

## 🚀 27. PRÓXIMOS PASSOS

Possíveis próximos tickets:

- T-013 — Prontuários médicos frontend
- T-014 — Financeiro / livro caixa backend
- T-015 — Financeiro / livro caixa frontend
- T-016 — Dashboard com dados reais
- T-017 — Autenticação
- T-018 — Controle de acesso
- T-019 — Auditoria
- T-020 — Testes automatizados

Recomendação atual:

```txt
T-013 — Prontuários médicos frontend
```

---

## 🧠 28. ORGANIZAÇÃO DO TIME

- Product Owner / Líder Técnico: usuário
- Desenvolvedor: Gemini
- Arquiteto / CTO: ChatGPT
- Executor local pontual: Codex CLI

---

## 📎 29. CHECKLIST ANTES DE AVANÇAR TICKET

Antes de considerar um ticket concluído:

- backend sobe sem erro;
- frontend sobe sem erro;
- logs não mostram exceções;
- fluxo principal foi testado na UI;
- endpoints críticos foram testados com curl quando aplicável;
- `prisma validate` foi executado quando houve alteração no schema;
- migration foi aplicada quando necessária;
- `git status --short` foi revisado;
- arquivos novos foram identificados;
- arquivos locais indevidos foram ignorados;
- README foi atualizado quando necessário.

---