# AGENTS.md — Instruções para Codex CLI

Este arquivo define regras obrigatórias para o uso do Codex CLI neste projeto.

Projeto: Associação Lar dos Idosos de Nazário — Sistema de Gestão.

---

## 1. Papel do Codex

O Codex atua como executor local pontual.

Ele pode ajudar em:

- ajustes pequenos e localizados;
- refatorações simples;
- correções de TypeScript;
- remoção de duplicação;
- ajustes de CSS;
- smoke tests com `curl`;
- análise de diffs;
- preparação de commit quando explicitamente solicitado.

O Codex não é o arquiteto do projeto.

Decisões arquiteturais ficam com o Arquiteto/CTO.

---

## 2. Stack do projeto

- Monorepo com pnpm workspaces
- Frontend: Next.js + TypeScript
- Backend: NestJS + TypeScript
- ORM: Prisma
- Banco: PostgreSQL
- Infra local: Docker Compose
- Estilo: CSS Modules

---

## 3. Estrutura principal

```txt
lar-dos-idosos/
├── apps/
│   ├── api/
│   └── web/
├── docker-compose.yml
├── pnpm-workspace.yaml
├── README.md
└── AGENTS.md