import { worker } from '@/shared/api/msw.browser';
import { routerMock } from '@/shared/test/mocks';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

vi.mock('@tanstack/react-router', () => routerMock);
beforeAll(async () => {
  await worker.start({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});
