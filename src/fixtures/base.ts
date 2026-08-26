import { test as base, expect } from '@playwright/test';

export type TestFixtures = {
  // Add custom fixtures here as needed
};

/**
 * Base test fixture for all Playwright tests.
 * Import this instead of '@playwright/test' directly.
 * 
 * Usage in test files:
 *   import { test, expect } from './src/fixtures/base.ts';
 */
export const test = base.extend<TestFixtures>({
  // Custom setup/teardown can be added here
});

export { expect };
