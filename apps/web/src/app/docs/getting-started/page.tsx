import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            GEO MCP
          </Link>
          <div className="space-x-6">
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
              Docs
            </Link>
            <Link href="/account" className="text-gray-600 hover:text-gray-900">
              Account
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <nav className="sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/getting-started"
                  className="text-blue-600 font-medium"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/tools"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Tools Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/best-practices"
                  className="text-gray-600 hover:text-gray-900"
                >
                  GEO Best Practices
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-8">
          <h1 className="text-3xl font-bold mb-6">Getting Started with GEO MCP</h1>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Prerequisites</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js 20.x or higher</li>
              <li>Claude Desktop application installed</li>
              <li>A GEO MCP subscription (sign up at /connect)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Step 1: Get Your API Key</h2>
            <p className="text-gray-700 mb-4">
              After subscribing, you&apos;ll receive an API key. You can also generate new
              keys from your Account page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Step 2: Configure Claude Desktop</h2>
            <p className="text-gray-700 mb-4">
              Add GEO MCP to your Claude Desktop configuration file:
            </p>

            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-4">
              <pre className="text-sm overflow-x-auto">
{`// ~/.claude/claude_desktop_config.json
{
  "mcpServers": {
    "geomcp": {
      "url": "https://mcp.geomcp.ai/sse",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Step 3: Verify Connection</h2>
            <p className="text-gray-700 mb-4">
              Restart Claude Desktop and ask Claude to check your GEO status:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">
                &quot;Check my GEO MCP status&quot;
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              Claude will use the <code className="bg-gray-100 px-1 rounded">geomcp_status</code>{' '}
              tool to show your subscription status and content statistics.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Step 4: Set Up Your Profile</h2>
            <p className="text-gray-700 mb-4">
              Configure your company profile so GEO MCP can create personalized content:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">
                &quot;Set up my GEO profile for [Your Company], a [description] in the [industry] space.
                Our main competitors are [Competitor 1] and [Competitor 2].&quot;
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Step 5: Create Your First Content</h2>
            <p className="text-gray-700 mb-4">
              Start creating GEO-optimized content:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">
                &quot;Create a glossary term for &apos;API Gateway&apos; in the devtools category,
                mentioning my company as an example.&quot;
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Next Steps</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <Link href="/docs/tools" className="text-blue-600 hover:underline">
                  Explore all available tools
                </Link>
              </li>
              <li>
                <Link href="/docs/best-practices" className="text-blue-600 hover:underline">
                  Learn GEO best practices
                </Link>
              </li>
              <li>Set up citation monitoring for your key queries</li>
              <li>Create a batch of glossary terms in your industry</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
