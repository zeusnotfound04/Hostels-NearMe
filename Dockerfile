# Use multi-stage builds for efficiency

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for Prisma
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install production dependencies only
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3000

CMD ["/app/docker-entrypoint.sh"]
