import { describe, expect, test } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useLogout } from './use-logout';
import { tokenAction } from '@/shared/token';
import { mockInvalidate, mockNavigate } from '@/shared/test/mocks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, type FC, type ReactNode } from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe('useLogout Тест', () => {
  test('Проверка на выход', async () => {
    const queryClient = createTestQueryClient();
    const wrapper: FC<{ children: ReactNode }> = ({ children }) =>
      createElement(QueryClientProvider, { client: queryClient }, children);
    const token = 'mock-token';
    tokenAction.doSetToken(token);
    expect(tokenAction.doGetToken()).toBe(token);
    const { result: logout } = await renderHook(() => useLogout(), { wrapper });
    await logout.current();
    expect(mockNavigate).toBeCalledWith({ hash: '' });
    expect(mockInvalidate).toBeCalled();
    expect(tokenAction.doGetToken()).toBe('');
  });
});
