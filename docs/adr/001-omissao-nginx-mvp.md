# ADR 0001: Omissão do NGINX no Bootstrap do MVP

**Status:** Aceito
**Data:** 2026-04-22

## Contexto
Para o ticket T-001, foi decidido não incluir um proxy reverso (NGINX).

## Decisão
Manteremos o acesso direto aos containers de Web (3000) e API (3333) via Docker Compose no ambiente de desenvolvimento local para reduzir a complexidade inicial e focar na fundação do monorepo.

## Consequências
No futuro, para ambientes de homologação e produção, será necessário criar um ticket específico para adicionar um Edge Gateway (NGINX) visando segurança, TLS e roteamento.