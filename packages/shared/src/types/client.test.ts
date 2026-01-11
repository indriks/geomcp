import { describe, it, expect } from 'vitest';

import { ClientProfile, ExpertQuote } from './client';

describe('Client Types', () => {
  it('should validate ClientProfile type', () => {
    const profile: ClientProfile = {
      id: 'client-123',
      company_name: 'Test Corp',
      industry: 'saas',
      competitors: ['Competitor A', 'Competitor B'],
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };

    expect(profile.id).toBe('client-123');
    expect(profile.company_name).toBe('Test Corp');
    expect(profile.competitors).toHaveLength(2);
  });

  it('should validate ExpertQuote type', () => {
    const quote: ExpertQuote = {
      id: 'quote-123',
      client_id: 'client-123',
      person: 'Jane Smith',
      role: 'CTO',
      quote: 'This is a great product',
      approved: true,
      created_at: '2026-01-01T00:00:00Z',
    };

    expect(quote.approved).toBe(true);
    expect(quote.person).toBe('Jane Smith');
  });
});
