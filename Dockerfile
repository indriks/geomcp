FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/mcp-server/package.json ./apps/mcp-server/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/shared ./packages/shared
COPY apps/mcp-server ./apps/mcp-server

# Build shared package first
RUN pnpm --filter @geomcp/shared build

# Build MCP server
RUN pnpm --filter mcp-server build

WORKDIR /app/apps/mcp-server

EXPOSE 3001

CMD ["node", "dist/index.js"]
