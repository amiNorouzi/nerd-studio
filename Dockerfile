# Stage 1: Build the application
FROM node:18-alpine as build

# Install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production image
FROM node:18-alpine as production

# Install only production dependencies
WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# Copy built files and production dependencies
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Set environment variables
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
