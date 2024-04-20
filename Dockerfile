# Use official Node.js LTS image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN yarn run build

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the Next.js application

CMD ["node", "server.js"]
