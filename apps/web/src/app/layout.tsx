import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { PostHogProvider } from '@/lib/posthog';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GEO MCP - Generative Engine Optimization',
  description: 'MCP-Native Generative Engine Optimization Platform. Get cited by AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
