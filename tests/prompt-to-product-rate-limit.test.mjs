import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeWaitlistAttempt } from '../src/app/api/prompt-to-product/waitlistRateLimit.ts';

test('allows five waitlist attempts inside the window and throttles the sixth', () => {
  const store = new Map();
  const now = 1_000_000;

  for (let index = 0; index < 5; index += 1) {
    assert.equal(consumeWaitlistAttempt(store, 'client', now + index).allowed, true);
  }

  const blocked = consumeWaitlistAttempt(store, 'client', now + 5);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds > 0);
});

test('expires old attempts and isolates clients', () => {
  const store = new Map();
  const windowMs = 1_000;

  for (let index = 0; index < 5; index += 1) {
    consumeWaitlistAttempt(store, 'client-a', index, 5, windowMs);
  }

  assert.equal(consumeWaitlistAttempt(store, 'client-b', 10, 5, windowMs).allowed, true);
  assert.equal(consumeWaitlistAttempt(store, 'client-a', windowMs + 10, 5, windowMs).allowed, true);
});
