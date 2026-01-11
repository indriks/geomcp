import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-primary-600">GEO MCP</div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
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

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Get Cited by AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          GEO MCP is the MCP-native platform for Generative Engine Optimization.
          Create content that ChatGPT, Claude, and Perplexity actually cite.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/connect"
            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700"
          >
            Start for €1,500/month
          </Link>
          <Link
            href="/docs"
            className="border border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50"
          >
            Read the Docs
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">527%</div>
              <div className="text-gray-600 mt-2">AI search growth</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">71%</div>
              <div className="text-gray-600 mt-2">Use AI for research</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">2-7</div>
              <div className="text-gray-600 mt-2">Domains per AI response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">3.2x</div>
              <div className="text-gray-600 mt-2">Fresh content citations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">MCPs Replace Apps</h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-4">
          <p>
            The AI assistant is becoming the universal interface. Users don&apos;t need
            dashboards, content studios, or complex UIs—they need capabilities
            accessible through natural conversation.
          </p>
          <p className="font-semibold text-gray-900">
            GEO MCP is not a SaaS with an MCP backend. GEO MCP IS the MCP. The AI
            chat IS the interface.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
              <p className="text-gray-600">
                Create GEO-optimized glossary terms, interviews, and comparisons
                through natural conversation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Citation Tracking</h3>
              <p className="text-gray-600">
                Monitor when ChatGPT, Claude, and Perplexity cite your brand across
                key queries.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">GitHub Publishing</h3>
              <p className="text-gray-600">
                Content published to high-authority @geomcp repositories for maximum
                AI visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Cited?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join the first wave of companies optimizing for AI citations.
        </p>
        <Link
          href="/connect"
          className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-gray-600">© 2026 GEO MCP</div>
          <div className="flex gap-6">
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
              Docs
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
