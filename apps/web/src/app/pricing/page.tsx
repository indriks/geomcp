import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          GEO MCP
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/docs" className="text-gray-600 hover:text-gray-900">
            Docs
          </Link>
          <Link
            href="/connect"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-4">Simple Pricing</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          One plan. Everything included.
        </p>

        <div className="bg-white border-2 border-primary-600 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">GEO MCP Standard</h2>
              <p className="text-gray-600 mt-1">Everything you need to dominate AI citations</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">€1,500</div>
              <div className="text-gray-600">/month</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-3">Content Creation</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Unlimited glossary terms
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Up to 4 interviews/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Comparison page inclusion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Research report mentions
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Content Management</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Auto 30-day refresh
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Cross-referencing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Expert quote integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Competitor monitoring
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Citation Tracking</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Daily platform checks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Real-time alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Competitor tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Monthly reports
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">MCP Access</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Full MCP installation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> All tools included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Claude Desktop support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Priority support
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/connect"
            className="block w-full bg-primary-600 text-white text-center px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700"
          >
            Get Started
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What platforms do you track?</h3>
              <p className="text-gray-600">
                We track citations on ChatGPT, Claude, Perplexity, and Gemini.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Where is content published?</h3>
              <p className="text-gray-600">
                All content is published to our @geomcp GitHub organization repositories.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, with 30-day notice. Content remains published after cancellation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
