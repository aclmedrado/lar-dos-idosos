# Associação Lar dos Idosos de Nazário - Sistema de Gestão

Monorepo contendo a aplicação web (Next.js) e API (NestJS) para a gestão do lar de idosos.

## Pré-requisitos
- Docker
- Docker Compose
- Windows 11 com WSL2 (Recomendado)

## Como rodar o ambiente de desenvolvimento

1. Clone o repositório.
2. Copie o arquivo de ambiente:
   `cp .env.example .env`
3. Suba os containers via Docker Compose:
   `docker compose up --build`

## Acessos Locais
- **Frontend (Web):** http://localhost:3000
- **Backend Healthcheck:** http://localhost:3333/health
- **Banco de Dados (PostgreSQL):** localhost:5432

## Ambiente de Desenvolvimento Obrigatório
Este projeto foi configurado para **Windows 11 + WSL + VSCode**. Siga os passos estritamente nesta ordem para garantir que a resolução de dependências no TypeScript funcione.

1. **Abra o WSL e navegue até a pasta do projeto.**
   *(Não abra via caminho C:\... Use o filesystem do Linux, ex: `~/projetos/lar-dos-idosos`)*
2. Abra o VSCode diretamente pelo WSL com o comando:
   ```bash
   code .