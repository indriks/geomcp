FROM node:20-alpine

# Build version: 0.1.1
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8

# Copy all files
COPY . .

# Install dependencies
RUN pnpm install

# Build shared package first, then mcp-server
RUN pnpm --filter @geomcp/shared build && pnpm --filter mcp-server build

# Expose port
EXPOSE 3001

# Run the server
CMD ["node", "apps/mcp-server/dist/index.js"]
