import Link from 'next/link';

export default function BestPracticesPage() {
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
                  className="text-gray-600 hover:text-gray-900"
                >
                  Tools Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/best-practices"
                  className="text-blue-600 font-medium"
                >
                  GEO Best Practices
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-8">
          <h1 className="text-3xl font-bold mb-6">GEO Best Practices</h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Generative Engine Optimization (GEO) is about creating content that AI systems
              naturally cite and reference. Here are proven strategies to maximize your
              citation rates.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Structure for AI Comprehension</h2>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p className="text-green-700 font-medium">Key Principle</p>
              <p className="text-green-600">
                AI systems prefer content with clear hierarchies, direct answers, and
                well-organized information.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Start with a direct answer or definition in the first paragraph</li>
              <li>Use H2 and H3 headers to organize sections clearly</li>
              <li>Include bullet points and numbered lists for scannable content</li>
              <li>Add a summary or key takeaways section</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Include Data and Statistics</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700 font-medium">Key Principle</p>
              <p className="text-blue-600">
                AI systems cite sources that provide specific, verifiable data points.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Include relevant statistics with source attributions</li>
              <li>Use specific numbers rather than vague descriptions</li>
              <li>Reference recent studies and reports (update regularly)</li>
              <li>Add comparisons and benchmarks where relevant</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Maintain Freshness</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700 font-medium">Key Principle</p>
              <p className="text-yellow-600">
                AI models prefer recently updated content. Stale content loses citations.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Update content at least every 30 days</li>
              <li>Include &quot;Last updated&quot; timestamps</li>
              <li>Reference current year statistics and trends</li>
              <li>Use the refresh_stale tool to automate updates</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Natural Brand Mentions</h2>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
              <p className="text-purple-700 font-medium">Key Principle</p>
              <p className="text-purple-600">
                Mentions should feel natural and add value to the content, not promotional.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Use the &quot;strategic&quot; mention frequency for batch content</li>
              <li>Include your brand as one example among several</li>
              <li>Add genuine expert quotes from your team</li>
              <li>Position mentions in tool lists and comparisons naturally</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cover the Right Topics</h2>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <p className="text-orange-700 font-medium">Key Principle</p>
              <p className="text-orange-600">
                Focus on topics where you can provide unique value and authority.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Use find_opportunities to discover gaps</li>
              <li>Focus on your industry&apos;s core terminology</li>
              <li>Create content for queries where competitors are weak</li>
              <li>Build topical authority through related term clusters</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Monitor and Iterate</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700 font-medium">Key Principle</p>
              <p className="text-red-600">
                Track your citation performance and adapt your strategy based on results.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Set up query monitoring for your key terms</li>
              <li>Review citation_report weekly</li>
              <li>Analyze what content drives the most citations</li>
              <li>Double down on formats and topics that work</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Content Type Guidelines</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Glossary Terms</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Start with a concise, direct definition</li>
              <li>Include &quot;How it works&quot; and &quot;Why it matters&quot; sections</li>
              <li>List related terms and concepts</li>
              <li>Add practical examples</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Interviews</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use Q&A format for easy extraction</li>
              <li>Include quotable sound bites</li>
              <li>Cover trending topics in your industry</li>
              <li>Link to related glossary terms</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Comparisons</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use clear comparison tables</li>
              <li>Be fair and objective (even with competitors)</li>
              <li>Include specific use case recommendations</li>
              <li>Update when products change</li>
            </ul>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Quick Start Checklist</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">1</span>
                  Set up your profile with accurate company info
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">2</span>
                  Create 10 glossary terms in your core category
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">3</span>
                  Set up monitoring for 5 key queries
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">4</span>
                  Review citation report after one week
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">5</span>
                  Expand content based on what&apos;s working
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
