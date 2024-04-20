# Use a smaller base image like Alpine
FROM node:18-alpine as base
RUN apk add --no-cache g++ make python3
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# Build stage
FROM base as builder
COPY . .
RUN yarn install --frozen-lockfile && yarn build

# Production stage
FROM base as production
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
CMD ["yarn", "start"]

# Development stage
FROM base as dev
ENV NODE_ENV=development
COPY . .
CMD ["yarn", "dev"]
