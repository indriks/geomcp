import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the database client
vi.mock('../../db/client', () => ({
  getClientById: vi.fn(),
  getSubscription: vi.fn(),
  getExpertQuotes: vi.fn(),
  getContentMentions: vi.fn(),
  getCitations: vi.fn(),
}));

import { handleCoreTool, registerCoreTools } from './index';
import * as db from '../../db/client';

describe('Core Tools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerCoreTools', () => {
    it('should register all core tools', () => {
      const tools = registerCoreTools();
      expect(tools).toHaveLength(3);
      expect(tools.map((t) => t.name)).toEqual([
        'geomcp_status',
        'geomcp_setup',
        'geomcp_profile',
      ]);
    });
  });

  describe('geomcp_status', () => {
    it('should return status with subscription and profile info', async () => {
      const mockClient = {
        id: 'client-123',
        company_name: 'Test Corp',
        industry: 'saas',
        competitors: ['Competitor A'],
      };

      const mockSubscription = {
        status: 'active',
        plan: 'standard',
        current_period_end: '2026-02-01',
      };

      vi.mocked(db.getClientById).mockResolvedValue(mockClient);
      vi.mocked(db.getSubscription).mockResolvedValue(mockSubscription);
      vi.mocked(db.getExpertQuotes).mockResolvedValue([]);
      vi.mocked(db.getContentMentions).mockResolvedValue([]);
      vi.mocked(db.getCitations).mockResolvedValue([]);

      const result = await handleCoreTool(
        'geomcp_status',
        {},
        { client_id: 'client-123', api_key_id: 'key-123' }
      );

      expect(result.isError).toBeUndefined();
      expect(result.content).toHaveLength(1);

      const data = JSON.parse(result.content[0].text);
      expect(data.subscription.status).toBe('active');
      expect(data.client_profile.company).toBe('Test Corp');
    });
  });
});
