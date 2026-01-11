'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AccountData {
  subscription: {
    status: string;
    plan: string;
    next_billing?: string;
  };
  apiKeys: Array<{
    id: string;
    key_prefix: string;
    name: string;
    created_at: string;
  }>;
}

export default function AccountPage() {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState<string | null>(null);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch('/api/account');
      if (response.ok) {
        const accountData = await response.json();
        setData(accountData);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    try {
      const response = await fetch('/api/keys', { method: 'POST' });
      const data = await response.json();
      setNewKey(data.key);
      fetchAccountData();
    } catch {
      // Handle error
    }
  };

  const openBillingPortal = async () => {
    try {
      const response = await fetch('/api/billing-portal', { method: 'POST' });
      const data = await response.json();
      window.location.href = data.url;
    } catch {
      // Handle error
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          GEO MCP
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/docs" className="text-gray-600 hover:text-gray-900">
            Docs
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Account</h1>

        {/* Subscription */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">
                {data?.subscription.plan || 'Standard'} Plan
              </p>
              <p className="text-gray-600">
                Status:{' '}
                <span
                  className={
                    data?.subscription.status === 'active'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }
                >
                  {data?.subscription.status || 'Unknown'}
                </span>
              </p>
              {data?.subscription.next_billing && (
                <p className="text-gray-600 text-sm">
                  Next billing: {new Date(data.subscription.next_billing).toLocaleDateString()}
                </p>
              )}
            </div>
            <button
              onClick={openBillingPortal}
              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Manage Billing
            </button>
          </div>
        </section>

        {/* API Keys */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={generateNewKey}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Generate New Key
            </button>
          </div>

          {newKey && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
              <p className="text-green-800 font-medium mb-2">
                New API key generated. Copy it now — it won&apos;t be shown again.
              </p>
              <code className="block bg-white p-3 rounded border text-sm break-all">
                {newKey}
              </code>
            </div>
          )}

          <div className="space-y-3">
            {data?.apiKeys.map((key) => (
              <div
                key={key.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{key.name || 'API Key'}</p>
                  <p className="text-gray-600 text-sm font-mono">{key.key_prefix}...</p>
                </div>
                <p className="text-gray-500 text-sm">
                  Created {new Date(key.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* MCP Installation */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">MCP Installation</h2>
          <p className="text-gray-600 mb-4">
            Add GEO MCP to your Claude Desktop configuration:
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {`{
  "mcpServers": {
    "geomcp": {
      "command": "npx",
      "args": ["-y", "@geomcp/mcp"],
      "env": {
        "GEOMCP_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}`}
          </pre>
          <Link
            href="/docs"
            className="text-primary-600 hover:underline mt-4 inline-block"
          >
            View full documentation →
          </Link>
        </section>
      </div>
    </main>
  );
}
