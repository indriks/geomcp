import { Resend } from 'resend';

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendWelcomeEmail(params: {
  email: string;
  companyName: string;
  apiKey: string;
}): Promise<boolean> {
  const client = getResend();
  if (!client) {
    console.warn('Resend not configured, skipping welcome email');
    return false;
  }

  try {
    await client.emails.send({
      from: 'GEO MCP <welcome@geomcp.ai>',
      to: params.email,
      subject: 'Welcome to GEO MCP - Your API Key Inside',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .api-key { background: #1f2937; color: #10b981; padding: 15px; border-radius: 4px; font-family: monospace; word-break: break-all; margin: 20px 0; }
    .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
    code { background: #e5e7eb; padding: 2px 6px; border-radius: 4px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Welcome to GEO MCP!</h1>
      <p style="margin: 10px 0 0 0;">Get cited by AI - starting today</p>
    </div>
    <div class="content">
      <p>Hi ${params.companyName} team,</p>

      <p>Thank you for subscribing to GEO MCP! You now have access to our complete suite of tools for optimizing your content for AI citations.</p>

      <h3>Your API Key</h3>
      <div class="api-key">${params.apiKey}</div>
      <p><strong>Important:</strong> This is the only time you'll see your full API key. Save it securely!</p>

      <h3>Quick Start</h3>
      <ol>
        <li>Add GEO MCP to your Claude Desktop config</li>
        <li>Ask Claude to "check my GEO MCP status"</li>
        <li>Set up your company profile</li>
        <li>Create your first glossary term</li>
      </ol>

      <h3>Configuration</h3>
      <p>Add this to your <code>~/.claude/claude_desktop_config.json</code>:</p>
      <pre style="background: #1f2937; color: #e5e7eb; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 13px;">{
  "mcpServers": {
    "geomcp": {
      "url": "https://mcp.geomcp.ai/sse",
      "headers": {
        "Authorization": "Bearer ${params.apiKey}"
      }
    }
  }
}</pre>

      <a href="https://geomcp.ai/docs/getting-started" class="button">Read the Documentation</a>

      <p style="margin-top: 30px;">Need help? Reply to this email or check our docs at geomcp.ai/docs</p>
    </div>
    <div class="footer">
      <p>GEO MCP - Get Cited by AI</p>
      <p>© 2024 GEO MCP. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}

export async function sendCitationAlertEmail(params: {
  email: string;
  companyName: string;
  alerts: Array<{
    type: 'gain' | 'loss';
    query: string;
    platform: string;
  }>;
}): Promise<boolean> {
  const client = getResend();
  if (!client) return false;

  const gains = params.alerts.filter(a => a.type === 'gain');
  const losses = params.alerts.filter(a => a.type === 'loss');

  try {
    await client.emails.send({
      from: 'GEO MCP <alerts@geomcp.ai>',
      to: params.email,
      subject: `Citation Alert: ${gains.length} gains, ${losses.length} losses`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .gain { color: #059669; }
    .loss { color: #dc2626; }
  </style>
</head>
<body>
  <h2>Citation Update for ${params.companyName}</h2>

  ${gains.length > 0 ? `
  <h3 class="gain">🎉 New Citations (${gains.length})</h3>
  <ul>
    ${gains.map(g => `<li><strong>${g.query}</strong> on ${g.platform}</li>`).join('')}
  </ul>
  ` : ''}

  ${losses.length > 0 ? `
  <h3 class="loss">⚠️ Lost Citations (${losses.length})</h3>
  <ul>
    ${losses.map(l => `<li><strong>${l.query}</strong> on ${l.platform}</li>`).join('')}
  </ul>
  ` : ''}

  <p><a href="https://geomcp.ai/account">View full report →</a></p>
</body>
</html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send citation alert email:', error);
    return false;
  }
}
