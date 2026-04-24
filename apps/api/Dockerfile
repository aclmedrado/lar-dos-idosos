FROM node:24-alpine
RUN corepack enable pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
EXPOSE 3333
CMD ["pnpm", "run", "start:dev"]