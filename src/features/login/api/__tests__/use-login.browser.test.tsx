import { renderHook } from 'vitest-browser-react';
import { useLogin } from '../use-login';
import { vi, test, expect, describe } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const mockNavigate = vi.fn();
const mockInvalidate = vi.fn();
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({
    navigate: mockNavigate,
    invalidate: mockInvalidate,
  }),
  useSearch: vi.fn(() => ({ redirect: '/y' })),
}));

describe('useLogin Тесты', () => {
  test('Коректные данный', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result: mutate } = await renderHook(() => useLogin(), { wrapper });
    const {
      data: { access_token },
    } = await mutate.current.mutateAsync({
      body: {
        login: 'mock-user',
        password: 'mock-password',
      },
    });
    expect(access_token).not.toBeUndefined();
  });
});
