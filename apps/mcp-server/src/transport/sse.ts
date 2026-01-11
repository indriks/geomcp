import { IncomingMessage, ServerResponse } from 'http';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';

export class SSEServerTransport implements Transport {
  private messageId = 0;
  private buffer = '';
  private closed = false;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(
    private req: IncomingMessage,
    private res: ServerResponse
  ) {
    this.setupRequestHandling();
  }

  private setupRequestHandling(): void {
    // Handle incoming messages from the request body (for POST data via query params or headers)
    this.req.on('data', (chunk: Buffer) => {
      this.buffer += chunk.toString();
      this.processBuffer();
    });

    this.req.on('end', () => {
      this.processBuffer();
    });

    this.req.on('error', (error: Error) => {
      this.onerror?.(error);
    });

    this.req.on('close', () => {
      this.close();
    });
  }

  private processBuffer(): void {
    // Process any complete JSON messages in the buffer
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.trim()) {
        try {
          const message = JSON.parse(line) as JSONRPCMessage;
          this.onmessage?.(message);
        } catch {
          // Ignore invalid JSON
        }
      }
    }
  }

  async start(): Promise<void> {
    // SSE connection is already established
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (this.closed) {
      throw new Error('Transport is closed');
    }

    const id = ++this.messageId;
    const data = JSON.stringify(message);

    this.res.write(`id: ${id}\n`);
    this.res.write(`data: ${data}\n\n`);
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.onclose?.();

    if (!this.res.writableEnded) {
      this.res.end();
    }
  }
}

// Client transport for sending messages to SSE endpoint
export class SSEClientTransport implements Transport {
  private eventSource: EventSource | null = null;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(
    private url: string,
    private apiKey: string
  ) {}

  async start(): Promise<void> {
    // Note: EventSource doesn't support custom headers in browsers
    // For Node.js, we'd use a different approach
    this.eventSource = new EventSource(this.url);

    this.eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as JSONRPCMessage;
        this.onmessage?.(message);
      } catch {
        // Ignore invalid JSON
      }
    };

    this.eventSource.onerror = () => {
      this.onerror?.(new Error('SSE connection error'));
    };
  }

  async send(message: JSONRPCMessage): Promise<void> {
    // For client-to-server messages, we need to POST to the server
    const response = await fetch(this.url.replace('/sse', '/message'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
  }

  async close(): Promise<void> {
    this.eventSource?.close();
    this.onclose?.();
  }
}
