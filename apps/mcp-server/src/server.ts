import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { AuthContext } from '@geomcp/shared';
import { registerCoreTools, handleCoreTool } from './tools/core';
import { registerContentTools, handleContentTool } from './tools/content';
import { registerResearchTools, handleResearchTool } from './tools/research';
import { registerCitationTools, handleCitationTool } from './tools/citations';
import { registerGitHubTools, handleGitHubTool } from './tools/github';

export function createMCPServer(authContext: AuthContext): Server {
  const server = new Server(
    {
      name: 'geomcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Collect all tools
  const coreTools = registerCoreTools();
  const contentTools = registerContentTools();
  const researchTools = registerResearchTools();
  const citationTools = registerCitationTools();
  const githubTools = registerGitHubTools();

  const allTools = [
    ...coreTools,
    ...contentTools,
    ...researchTools,
    ...citationTools,
    ...githubTools,
  ];

  // Handle list tools request
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: allTools,
    };
  });

  // Handle call tool request
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      // Route to appropriate tool handler
      if (name.startsWith('geomcp_')) {
        return await handleCoreTool(name, args || {}, authContext);
      }
      if (name.startsWith('create_') || name === 'optimize_content' || name === 'suggest_content') {
        return await handleContentTool(name, args || {}, authContext);
      }
      if (name.startsWith('research_') || name.startsWith('find_') || name.startsWith('analyze_')) {
        return await handleResearchTool(name, args || {}, authContext);
      }
      if (name.startsWith('check_') || name.startsWith('citation_') || name.startsWith('monitor_')) {
        return await handleCitationTool(name, args || {}, authContext);
      }
      if (name.startsWith('list_') || name.startsWith('refresh_') || name.startsWith('content_')) {
        return await handleGitHubTool(name, args || {}, authContext);
      }

      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        content: [
          {
            type: 'text',
            text: `Error executing ${name}: ${message}`,
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}
