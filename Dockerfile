FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl openssl-dev

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl

RUN npm install -g pm2

COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/public ./.next/standalone/public
COPY --from=builder /app/.next/static ./.next/standalone/.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./.next/standalone/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./.next/standalone/node_modules/@prisma

COPY --from=builder /app/package.json ./.next/standalone/package.json

WORKDIR /app/.next/standalone

EXPOSE 3000

CMD ["pm2-runtime", "server.js", "-i", "max"]