FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run vite build

FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production

COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["bunx", "serve", "-s", "dist", "-l", "80"]
