import { IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';

interface Session {
  id: string;
  transport: StreamableHTTPTransport;
  createdAt: Date;
  lastActivity: Date;
}

// Session store (use Redis in production for multi-instance)
const sessions = new Map<string, Session>();

// Clean up old sessions periodically
setInterval(() => {
  const now = Date.now();
  const timeout = 30 * 60 * 1000; // 30 minutes
  for (const [id, session] of sessions) {
    if (now - session.lastActivity.getTime() > timeout) {
      session.transport.close();
      sessions.delete(id);
    }
  }
}, 60 * 1000);

export class StreamableHTTPTransport implements Transport {
  private sessionId: string;
  private sseResponse: ServerResponse | null = null;
  private eventId = 0;
  private closed = false;
  private messageQueue: JSONRPCMessage[] = [];

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(sessionId?: string) {
    this.sessionId = sessionId || randomUUID();
  }

  getSessionId(): string {
    return this.sessionId;
  }

  async start(): Promise<void> {
    // Transport is ready
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (this.closed) {
      throw new Error('Transport is closed');
    }

    // If we have an active SSE connection, send via SSE
    if (this.sseResponse && !this.sseResponse.writableEnded) {
      const id = ++this.eventId;
      const data = JSON.stringify(message);
      this.sseResponse.write(`id: ${id}\n`);
      this.sseResponse.write(`event: message\n`);
      this.sseResponse.write(`data: ${data}\n\n`);
    } else {
      // Queue message for next request
      this.messageQueue.push(message);
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;

    if (this.sseResponse && !this.sseResponse.writableEnded) {
      this.sseResponse.end();
    }

    sessions.delete(this.sessionId);
    this.onclose?.();
  }

  // Handle incoming POST request with JSON-RPC message
  async handlePost(req: IncomingMessage, res: ServerResponse, body: JSONRPCMessage): Promise<void> {
    // Update session activity
    const session = sessions.get(this.sessionId);
    if (session) {
      session.lastActivity = new Date();
    }

    // Process the incoming message
    if (this.onmessage) {
      this.onmessage(body);
    }

    // Check if this is a request that needs a response
    if ('id' in body && body.id !== undefined) {
      // Wait for response from message queue (with timeout)
      const response = await this.waitForResponse(body.id, 30000);

      if (response) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Mcp-Session-Id': this.sessionId,
        });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(504, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Response timeout' }));
      }
    } else {
      // Notification - no response needed
      res.writeHead(202, { 'Mcp-Session-Id': this.sessionId });
      res.end();
    }
  }

  // Handle GET request for SSE stream
  handleSSE(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Mcp-Session-Id': this.sessionId,
    });

    this.sseResponse = res;

    // Send any queued messages
    for (const message of this.messageQueue) {
      const id = ++this.eventId;
      res.write(`id: ${id}\n`);
      res.write(`event: message\n`);
      res.write(`data: ${JSON.stringify(message)}\n\n`);
    }
    this.messageQueue = [];

    // Handle client disconnect
    req.on('close', () => {
      this.sseResponse = null;
    });
  }

  // Handle DELETE request to close session
  handleDelete(res: ServerResponse): void {
    this.close();
    res.writeHead(204);
    res.end();
  }

  private waitForResponse(requestId: string | number, timeout: number): Promise<JSONRPCMessage | null> {
    return new Promise((resolve) => {
      const startTime = Date.now();

      const checkQueue = () => {
        const index = this.messageQueue.findIndex(
          (msg) => 'id' in msg && msg.id === requestId
        );

        if (index !== -1) {
          const response = this.messageQueue.splice(index, 1)[0];
          resolve(response);
          return;
        }

        if (Date.now() - startTime > timeout) {
          resolve(null);
          return;
        }

        setTimeout(checkQueue, 10);
      };

      checkQueue();
    });
  }
}

// Helper to get or create session
export function getOrCreateSession(sessionId?: string): StreamableHTTPTransport {
  if (sessionId && sessions.has(sessionId)) {
    return sessions.get(sessionId)!.transport;
  }

  const transport = new StreamableHTTPTransport(sessionId);
  const session: Session = {
    id: transport.getSessionId(),
    transport,
    createdAt: new Date(),
    lastActivity: new Date(),
  };
  sessions.set(session.id, session);

  return transport;
}

export function getSession(sessionId: string): StreamableHTTPTransport | undefined {
  return sessions.get(sessionId)?.transport;
}

export function deleteSession(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (session) {
    session.transport.close();
    sessions.delete(sessionId);
    return true;
  }
  return false;
}
