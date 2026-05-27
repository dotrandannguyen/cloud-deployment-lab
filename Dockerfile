# Stage 1: Builder
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Production Runtime
FROM node:24-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

# Nếu bạn dùng Prisma, hãy bỏ comment dòng dưới này:
# COPY prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/index.js"]