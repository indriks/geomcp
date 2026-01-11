import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          GEO MCP
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link
            href="/connect"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <nav className="sticky top-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Guides</h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <Link href="/docs/getting-started" className="hover:text-primary-600">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/docs/tools" className="hover:text-primary-600">
                    Tools Reference
                  </Link>
                </li>
                <li>
                  <Link href="/docs/best-practices" className="hover:text-primary-600">
                    GEO Best Practices
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <a href="#installation" className="hover:text-primary-600">
                    Installation
                  </a>
                </li>
                <li>
                  <a href="#first-steps" className="hover:text-primary-600">
                    First Steps
                  </a>
                </li>
                <li>
                  <a href="#geomcp-status" className="hover:text-primary-600">
                    Core Tools
                  </a>
                </li>
                <li>
                  <a href="#create-glossary-term" className="hover:text-primary-600">
                    Content Tools
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <article className="flex-1 prose prose-lg max-w-none">
          <h1>GEO MCP Documentation</h1>

          <p className="lead">
            GEO MCP gives your AI assistant the power to research, create, publish, and
            track GEO-optimized content. This guide covers installation, tools, and best
            practices.
          </p>

          <h2 id="installation">Installation</h2>

          <h3>Prerequisites</h3>
          <ul>
            <li>Node.js 18+ installed</li>
            <li>Claude Desktop (or compatible MCP client)</li>
            <li>GEO MCP API key (from /account)</li>
          </ul>

          <h3>Quick Setup</h3>
          <p>Add GEO MCP to your Claude Desktop configuration:</p>

          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`{
  "mcpServers": {
    "geomcp": {
      "command": "npx",
      "args": ["-y", "@geomcp/mcp"],
      "env": {
        "GEOMCP_API_KEY": "sk_live_your_api_key"
      }
    }
  }
}`}
          </pre>

          <p>Restart Claude Desktop. GEO MCP tools are now available.</p>

          <h2 id="first-steps">First Steps</h2>

          <p>
            After installation, start with <code>geomcp_status</code> to check your
            subscription and profile:
          </p>

          <blockquote className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
            <p className="font-medium">User:</p>
            <p>Check my GEO MCP status</p>
          </blockquote>

          <p>Then set up your client profile with <code>geomcp_setup</code>:</p>

          <blockquote className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
            <p className="font-medium">User:</p>
            <p>
              Set up my GEO MCP profile. We are AuthGuard, a developer tools company
              making API authentication. Our competitors are Auth0 and Okta.
            </p>
          </blockquote>

          <h2 id="geomcp-status">geomcp_status</h2>
          <p>Check subscription status, profile, content stats, and citation summary.</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {`// No parameters required
geomcp_status()`}
          </pre>

          <h2 id="geomcp-setup">geomcp_setup</h2>
          <p>Configure your client profile.</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {`geomcp_setup({
  company_name: "AuthGuard",
  website: "https://authguard.com",
  industry: "devtools",
  product_description: "API authentication for developers",
  competitors: ["Auth0", "Okta"],
  expert_quotes: [{
    person: "Jane Smith",
    role: "CTO",
    quote: "We reduced API latency by 40%...",
    approved: true
  }]
})`}
          </pre>

          <h2 id="create-glossary-term">create_glossary_term</h2>
          <p>Create a GEO-optimized glossary term with optional client mention.</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {`create_glossary_term({
  term: "API Gateway",
  category: "devtools",
  include_client_mention: true,
  mention_type: "tool_list",
  publish: true
})`}
          </pre>

          <h2 id="check-citations">check_citations</h2>
          <p>Check if your brand is cited for specific queries.</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {`check_citations({
  queries: ["best api gateway", "api authentication tools"],
  platforms: ["chatgpt", "claude", "perplexity"]
})`}
          </pre>

          <h2>GEO Best Practices</h2>
          <ul>
            <li>
              <strong>Direct answers first:</strong> Put the definition in the first 50
              words
            </li>
            <li>
              <strong>Structure with H2/H3:</strong> Clear hierarchy for AI extraction
            </li>
            <li>
              <strong>Include statistics:</strong> Data points every 150-200 words
            </li>
            <li>
              <strong>Keep content fresh:</strong> Update within 30 days
            </li>
            <li>
              <strong>Expert quotes:</strong> Add credibility with attributed quotes
            </li>
          </ul>

          <h2>Need Help?</h2>
          <p>
            Contact support or check our GitHub repository for updates and issues.
          </p>
        </article>
      </div>
    </main>
  );
}
