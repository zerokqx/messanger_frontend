import { server } from '@/shared/api/msw.node';
import { afterAll, afterEach, beforeAll } from 'vitest';

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
