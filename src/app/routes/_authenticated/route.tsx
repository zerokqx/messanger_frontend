import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import {
  AppShell,
  AppShellAside,
  AppShellNavbar,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { Suspense, lazy, useEffect } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { notify } from '@/shared/lib/notifications';
import { useTokenStore, tokenAction } from '@/shared/token';
import { socket, getCookie, ACCESS_COOKIE_NAME, type ChatPrivateNewMessageSocketEvent } from '@/shared/api';
import { SafeChat } from '@/widgets/chat';
import Logger from '@/shared/lib/logger/logger';
import { getGetMyProfileMeGetQueryOptions } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import { useSelectedChat } from '@/entities/chat';
import { useAddMessageToHistory } from '@/features/chat/api/send-message';
import { getGetPrivateChatHistoryHistoryGetInfiniteQueryKey } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { useCreateChatFromSocketEvent } from '@/entities/chat/model/cache-actions';
import { useMeUserId } from '@/entities/user';

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/navbar').then((m) => ({ default: m.AppShellNavbarWidget }))
);

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({ context: { auth }, location }) => {
    Logger.debug('_authenticated/route.tsx', 'AUTH', auth);
    if (!auth)
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.pathname,
        },
      });
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getGetMyProfileMeGetQueryOptions());
  },
});

function RouteComponent() {
  const { data: meUserId } = useMeUserId();
  const createNewChat = useCreateChatFromSocketEvent();
  const addMessage = useAddMessageToHistory();
  const selectedChat = useSelectedChat((s) => s.chatId);
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  const token = useTokenStore((s) => s.data.access);

  useEffect(() => {
    const onAny = (event: string, ...args: unknown[]) => {
      console.log('EVENT:', event, args);
    };

    const onConnect = () => {
      notify.success({ title: 'Сокет', message: 'Успешное подключение' });
    };

    const onMessage = async (event: ChatPrivateNewMessageSocketEvent) => {
      console.log('chat_private:new_message', event);
      await createNewChat(event);
      const message = event.payload;
      if (!message.chat_id) return;

      const historyQueryKey =
        getGetPrivateChatHistoryHistoryGetInfiniteQueryKey({
          chat_id: message.chat_id,
        });

      if (meUserId !== event.payload.sender_id) {
        await addMessage(
          {
            chat_id: message.chat_id,
            content: message.content,
            message_type: message.message_type,
            sender_id: message.sender_id,
          },
          historyQueryKey
        );
      }
    };

    // В прод режиме достаём токен из куки (сокеты не умеют читать HttpOnly куки)
    if (import.meta.env.PROD) {
      const cookieToken = getCookie(ACCESS_COOKIE_NAME);
      if (cookieToken) {
        socket.auth = { token: cookieToken };
      }
    } else {
      socket.auth = { token };
    }

    socket.on('reconnect_attempt', () => {
      // При переподключении обновляем токен из куки
      if (import.meta.env.PROD) {
        const cookieToken = getCookie(ACCESS_COOKIE_NAME);
        if (cookieToken) {
          socket.auth = { token: cookieToken };
        }
      } else {
        socket.auth = { token: tokenAction.doGetToken() || '' };
      }
    });

    if (!socket.connected) {
      socket.connect();
    }
    socket.offAny();
    socket.off('connect', onConnect);
    socket.off('chat_private:new_message', onMessage);

    socket.onAny(onAny);
    socket.on('connect', onConnect);
    socket.on('chat_private:new_message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('chat_private:new_message', onMessage);
      socket.off('reconnect_attempt');
      socket.offAny(onAny);
    };
  }, [addMessage, createNewChat, meUserId, token]);

  return (
    <AppShell
      navbar={{
        width: 400,
        breakpoint: 'sm',
        collapsed: { mobile: !!selectedChat },
      }}
      styles={{
        aside: {
          zIndex: 1000,
          padding: t.spacing.md,
        },
      }}
      aside={{
        width: 500,
        collapsed: { desktop: !asside, mobile: !asside },
        breakpoint: 'sm',
      }}
    >
      <Suspense fallback={<AppShellAside />}>
        <LazyAside
          onClose={() => {
            layoutAction.doSetAside(false);
          }}
        />
      </Suspense>

      <AppShell.Main
        style={{ height: '100dvh', minHeight: 0, overflow: 'hidden' }}
      >
        <Box h="100%" mih={0}>
          <Suspense fallback={<p>dawdw</p>}>
            <SafeChat
              onToggleAside={() => {
                layoutAction.doSetAside(!asside);
              }}
              asideStatus={asside}
            />
          </Suspense>
          <Outlet />
        </Box>
      </AppShell.Main>

      <Suspense fallback={<AppShellNavbar />}>
        <LazyAppShellNavbar />
      </Suspense>
    </AppShell>
  );
}
