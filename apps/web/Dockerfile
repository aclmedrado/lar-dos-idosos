FROM node:24-bookworm-slim
RUN corepack enable pnpm
WORKDIR /usr/src/app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --filter @lar/web...

COPY . .
WORKDIR /usr/src/app/apps/web

EXPOSE 3000
CMD ["pnpm", "run", "dev"]