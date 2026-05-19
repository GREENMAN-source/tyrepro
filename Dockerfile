FROM node:20-alpine
WORKDIR /app

# Copy root config and package files
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/

# Install dependencies for the whole workspace
RUN npm ci

# Copy the API source code
COPY apps/api apps/api

# Generate Prisma and Build TypeScript
RUN npm run build -w apps/api

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start the Express server
CMD ["npm", "run", "start", "-w", "apps/api"]
