import Link from 'next/link';

export default function ToolsReferencePage() {
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
                  className="text-gray-600 hover:text-gray-900"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/tools"
                  className="text-blue-600 font-medium"
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
          <h1 className="text-3xl font-bold mb-6">Tools Reference</h1>

          {/* Core Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Core Tools</h2>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">geomcp_status</h3>
              <p className="text-gray-600 mb-4">
                Check your subscription status, content statistics, and citation summary.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong> None
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">geomcp_setup</h3>
              <p className="text-gray-600 mb-4">
                Configure your company profile, industry, competitors, and expert quotes.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong>
                <ul className="list-disc pl-4 mt-2">
                  <li>company_name (required): Your company name</li>
                  <li>website: Your company website</li>
                  <li>industry (required): saas, devtools, security, fintech, ai-ml</li>
                  <li>product_description: Brief product description</li>
                  <li>competitors: List of competitor names</li>
                  <li>expert_quotes: Array of quotable statements</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">geomcp_profile</h3>
              <p className="text-gray-600 mb-4">
                View or update your company profile settings.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong> Any subset of setup parameters
              </div>
            </div>
          </section>

          {/* Content Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Content Tools</h2>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">create_glossary_term</h3>
              <p className="text-gray-600 mb-4">
                Create a single GEO-optimized glossary term with optional client mention.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong>
                <ul className="list-disc pl-4 mt-2">
                  <li>term (required): The term to define</li>
                  <li>category (required): saas, devtools, security, fintech, ai-ml</li>
                  <li>include_client_mention: Whether to include your company</li>
                  <li>mention_type: quote, tool_list, or example</li>
                  <li>publish: Whether to publish to GitHub</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">create_glossary_batch</h3>
              <p className="text-gray-600 mb-4">
                Create multiple glossary terms at once with strategic mention placement.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong>
                <ul className="list-disc pl-4 mt-2">
                  <li>terms (required): Array of terms to create</li>
                  <li>category (required): Target category</li>
                  <li>mention_frequency: all, half, or strategic</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">create_interview</h3>
              <p className="text-gray-600 mb-4">
                Generate structured interview content with an industry expert.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong>
                <ul className="list-disc pl-4 mt-2">
                  <li>interviewee_name (required): Name of the interviewee</li>
                  <li>company (required): Their company</li>
                  <li>role (required): Their role</li>
                  <li>topics (required): Discussion topics</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">create_comparison</h3>
              <p className="text-gray-600 mb-4">
                Create a comparison page featuring multiple tools or solutions.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <strong>Parameters:</strong>
                <ul className="list-disc pl-4 mt-2">
                  <li>title (required): Comparison title</li>
                  <li>items (required): 2-6 items to compare</li>
                  <li>criteria: Comparison criteria</li>
                  <li>include_client: Include your company</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">optimize_content</h3>
              <p className="text-gray-600 mb-4">
                Optimize existing content for better GEO performance.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">suggest_content</h3>
              <p className="text-gray-600 mb-4">
                Get AI-powered content recommendations based on your profile.
              </p>
            </div>
          </section>

          {/* Research Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Research Tools</h2>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">research_term</h3>
              <p className="text-gray-600 mb-4">
                Research a term before creating content to understand the landscape.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">find_opportunities</h3>
              <p className="text-gray-600 mb-4">
                Discover high-value content opportunities in your industry.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">analyze_competitor</h3>
              <p className="text-gray-600 mb-4">
                Analyze a competitor&apos;s GEO strategy and find weaknesses.
              </p>
            </div>
          </section>

          {/* Citation Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Citation Tools</h2>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">check_citations</h3>
              <p className="text-gray-600 mb-4">
                Check if you&apos;re being cited for specific queries across AI platforms.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">citation_report</h3>
              <p className="text-gray-600 mb-4">
                Get a comprehensive report of your citation performance.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">citation_alerts</h3>
              <p className="text-gray-600 mb-4">
                View recent citation gains and losses.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">monitor_query</h3>
              <p className="text-gray-600 mb-4">
                Add a query to your monitoring list for daily tracking.
              </p>
            </div>
          </section>

          {/* GitHub Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">GitHub Tools</h2>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">list_content</h3>
              <p className="text-gray-600 mb-4">
                List all your published content with performance metrics.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">refresh_stale</h3>
              <p className="text-gray-600 mb-4">
                Refresh content that&apos;s more than 30 days old.
              </p>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-4">
              <h3 className="text-lg font-semibold mb-2">content_health</h3>
              <p className="text-gray-600 mb-4">
                Get a health summary of your content portfolio.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
