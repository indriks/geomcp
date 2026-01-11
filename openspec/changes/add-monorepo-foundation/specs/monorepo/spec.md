# Capability: Monorepo Structure

## ADDED Requirements

### Requirement: Workspace Configuration

The project SHALL use pnpm workspaces to manage multiple packages in a monorepo structure.

#### Scenario: Fresh clone setup
- **WHEN** a developer clones the repository and runs `pnpm install`
- **THEN** all workspace dependencies are installed correctly
- **AND** local package references are linked

#### Scenario: Adding new workspace package
- **WHEN** a new package is added to `packages/` or `apps/`
- **THEN** it is automatically recognized by the workspace
- **AND** can depend on other workspace packages using `workspace:*` protocol

### Requirement: TypeScript Compilation

The project SHALL compile TypeScript with strict mode enabled across all packages.

#### Scenario: Successful build
- **WHEN** `pnpm build` is executed
- **THEN** all packages compile without errors
- **AND** declaration files (.d.ts) are generated
- **AND** output is placed in each package's `dist/` directory

#### Scenario: Type error detection
- **WHEN** code contains type errors
- **THEN** `pnpm build` fails with descriptive error messages
- **AND** errors indicate the file and line number

### Requirement: Code Quality Enforcement

The project SHALL enforce consistent code style through ESLint and Prettier.

#### Scenario: Lint check
- **WHEN** `pnpm lint` is executed
- **THEN** all packages are checked for code quality issues
- **AND** TypeScript-specific rules are applied

#### Scenario: Format check
- **WHEN** `pnpm format:check` is executed
- **THEN** files not matching Prettier configuration are reported

### Requirement: Hosted MCP Server

The MCP server SHALL be hosted on GEO MCP infrastructure, accessible via SSE transport.

#### Scenario: SSE connection
- **WHEN** a client connects to https://mcp.geomcp.ai/sse with valid API key
- **THEN** the server establishes SSE connection
- **AND** responds to MCP protocol messages

#### Scenario: API key authentication
- **WHEN** a client connects without valid Authorization header
- **THEN** the server rejects the connection with 401 Unauthorized

#### Scenario: Tool registration
- **WHEN** the MCP server initializes
- **THEN** all registered tools are available for invocation
- **AND** tool schemas are provided in the tools/list response

### Requirement: Shared Types Package

The `@geomcp/shared` package SHALL export TypeScript types used across multiple packages.

#### Scenario: Type import
- **WHEN** another package imports from `@geomcp/shared`
- **THEN** TypeScript types are available
- **AND** no runtime code is included (types only)

#### Scenario: Type consistency
- **WHEN** the same data structure is used in MCP and backend
- **THEN** both SHALL use types from `@geomcp/shared`
- **AND** changes to types trigger compilation errors in dependent packages
