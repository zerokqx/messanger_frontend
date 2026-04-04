import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useCheckAuth } from './use-check-auth';
import { useTokenStore } from '@/shared/token';
import { PROD_PLACEHOLDER_ACCESS_TOKEN } from '@/shared/api';
import { renderHook } from 'vitest-browser-react';

vi.mock('react-use', () => ({
  useLogger: vi.fn(),
}));

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IllvYmJsZSIsImlhdCI6MTczOTU3MTIwMCwiZXhwIjoyMDY1MTM5MjAwLCJyb2xlIjoiYWRtaW4ifQ.u_V8X1F8Y2J_Hn9K2_v7Z9f-W3u4D6x-P8j9L0m1n2o';
describe('useCheckAuth Тестирование', () => {
  beforeEach(() => {
    useTokenStore.getState().reset();
  });
  test('Статический метот check()', async () => {
    const { result, act } = await renderHook(() => useTokenStore((s) => s));

    expect(result.current.data.access).toBeTypeOf('string');
    expect(result.current.data.access).toHaveLength(0);
    expect(useCheckAuth.check()).toBeFalsy();
    await act(() => {
      result.current.update((s) => (s.access = jwt));
    });
    expect(result.current.data.access).toBe(jwt);
    expect(useCheckAuth.check()).toBeTruthy();
  });

  test('Хук', async () => {
    const { result: checkAuth } = await renderHook(() => useCheckAuth());
    expect(checkAuth.current).toBeFalsy();
    const { result: tokenStore, act } = await renderHook(() =>
      useTokenStore((s) => s)
    );
    expect(tokenStore.current.data.access).toHaveLength(0);

    await act(() => {
      tokenStore.current.update((s) => {
        s.access = jwt;
      });
    });

    expect(tokenStore.current.data.access).toBe(jwt);
    expect(checkAuth.current).toBeTruthy();
  });

  test('Placeholder token не считается валидной сессией без prod-cookie', async () => {
    const { result, act } = await renderHook(() => useTokenStore((s) => s));

    await act(() => {
      result.current.update((state) => {
        state.access = PROD_PLACEHOLDER_ACCESS_TOKEN;
      });
    });

    expect(useCheckAuth.check()).toBeFalsy();
  });
});
