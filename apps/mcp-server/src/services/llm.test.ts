import { describe, it, expect } from 'vitest';

import { calculateGeoScore } from './llm';

describe('LLM Service', () => {
  describe('calculateGeoScore', () => {
    it('should return 0 for empty content', () => {
      expect(calculateGeoScore('')).toBe(0);
    });

    it('should score H1 heading', () => {
      const content = '# Title\n\nContent here';
      expect(calculateGeoScore(content)).toBeGreaterThan(0);
    });

    it('should score H2 headings', () => {
      const content = '# Title\n\n## Section 1\n\nContent\n\n## Section 2\n\nMore content';
      expect(calculateGeoScore(content)).toBeGreaterThanOrEqual(20);
    });

    it('should score bullet points', () => {
      const content = '# Title\n\n- Point 1\n- Point 2\n- Point 3';
      expect(calculateGeoScore(content)).toBeGreaterThan(10);
    });

    it('should score statistics', () => {
      const content = '# Title\n\nGrowth of 527% in 2025. Users increased by 40%.';
      expect(calculateGeoScore(content)).toBeGreaterThan(0);
    });

    it('should score expert quotes', () => {
      const content = '# Title\n\n> "This is a great product" — Jane Smith, CEO';
      expect(calculateGeoScore(content)).toBeGreaterThanOrEqual(10);
    });

    it('should score last updated date', () => {
      const content = '# Title\n\nContent here\n\nLast updated: January 2026';
      expect(calculateGeoScore(content)).toBeGreaterThan(0);
    });

    it('should score well-structured content highly', () => {
      const content = `# API Gateway

## Definition

An API gateway is a server that acts as a single entry point for microservices.

## Key Characteristics

- Routes requests to backend services
- Handles authentication
- Provides rate limiting

## Statistics

- 67% of enterprises use API gateways
- Average latency improvement of 40%

## Expert Insight

> "API gateways are essential for modern architectures" — John Doe, CTO

## Related Terms

- [Microservices](./microservices.md)
- [Load Balancer](./load-balancer.md)

Last updated: January 2026`;

      const score = calculateGeoScore(content);
      expect(score).toBeGreaterThanOrEqual(70);
    });
  });
});
