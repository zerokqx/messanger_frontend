import { describe, expect, test } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useLogout } from './use-logout';
import { tokenAction } from '@/shared/token';
import { userAction, useUserStore } from '@/entities/user/model/user-store';
import {
  mockCurrentUser,
  mockInvalidate,
  mockNavigate,
} from '@/shared/test/mocks';

describe('useLogout Тест', () => {
  test('Проверка на выход', async () => {
    const token = 'mock-token';
    tokenAction.doSetToken(token);
    userAction.doInit(mockCurrentUser);
    expect(tokenAction.doGetToken()).toBe(token);
    const { result: logout } = await renderHook(() => useLogout());
    await logout.current();
    expect(mockNavigate).toBeCalledWith({ to: '/auth' });
    expect(mockInvalidate).toBeCalled();
    expect(tokenAction.doGetToken()).toBe('');
    const { result: me } = await renderHook(() => useUserStore((s) => s.data));
    expect(me.current).toStrictEqual({ user: null });
  });
});
