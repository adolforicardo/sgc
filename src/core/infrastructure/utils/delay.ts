/**
 * Simulated network delay for mock services
 * Mimics real API latency for realistic UX testing
 */

const DEFAULT_DELAY_MS = 300;
const RANDOM_FACTOR = 0.5;

export function createDelay(baseMs: number = DEFAULT_DELAY_MS): Promise<void> {
  const jitter = baseMs * RANDOM_FACTOR * (Math.random() - 0.5);
  const delay = Math.max(100, baseMs + jitter);
  return new Promise((resolve) => setTimeout(resolve, delay));
}
