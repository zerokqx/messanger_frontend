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
<<<<<<< Updated upstream
import { notify } from '@/shared/lib/notifications';
import { useTokenStore } from '@/shared/token';
import { socket, type ChatPrivateNewMessageSocketEvent } from '@/shared/api';
||||||| Stash base
import { useTokenStore, tokenAction } from '@/shared/token';
import { socket, getCookie, ACCESS_COOKIE_NAME, type ChatPrivateNewMessageSocketEvent } from '@/shared/api';
=======
import { useTokenStore, tokenAction } from '@/shared/token';
import {
  getSocketAuthToken,
  socket,
  type ChatPrivateNewMessageSocketEvent,
} from '@/shared/api';
>>>>>>> Stashed changes
import { SafeChat } from '@/widgets/chat';
import Logger from '@/shared/lib/logger/logger';
import { getGetMyProfileMeGetQueryOptions } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';
import { useSelectedChat } from '@/features/chat';
import { useResponsive } from '@/shared/lib/hooks/use-responsive';
import { useAddMessageToHistory } from '@/features/chat/api/send-message';
import { getGetPrivateChatHistoryHistoryGetInfiniteQueryKey } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { useCreateChatFromSocketEvent } from '@/entities/chat/model/cache-actions';
<<<<<<< Updated upstream
import { useQueryClient } from '@tanstack/react-query';
||||||| Stash base
import { useMeUserId } from '@/entities/user';
import { useTranslation } from 'react-i18next';
=======
import { useGetUserById, useMeUserId } from '@/entities/user';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
>>>>>>> Stashed changes

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
    await queryClient.prefetchQuery(getGetMyProfileMeGetQueryOptions());
  },
});

function RouteComponent() {
  const createNewChat = useCreateChatFromSocketEvent();
  const addMessage = useAddMessageToHistory();
  const selectedChat = useSelectedChat((s) => s.data);
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  const token = useTokenStore((s) => s.data.access);
  const queryClient = useQueryClient();

  useEffect(() => {
    const onAny = (event: string, ...args: unknown[]) => {
      console.log('EVENT:', event, args);
    };

    const onConnect = () => {
      notify.success({ title: 'Сокет', message: 'Успешное подключение' });
    };

    const onMessage = async (event: ChatPrivateNewMessageSocketEvent) => {
      Logger.debug('_authenticated/route.tsx',"New message",[event])
      await createNewChat(event);
      const message = event.payload;
      if (!message.chat_id) return;

      const historyQueryKey =
        getGetPrivateChatHistoryHistoryGetInfiniteQueryKey({
          chat_id: message.chat_id,
        });

<<<<<<< Updated upstream
      await addMessage(
        {
          chat_id: message.chat_id,
          content: message.content,
          message_type: message.message_type,
          sender_id: message.sender_id,
        },
        historyQueryKey
      );
||||||| Stash base
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
=======
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
        notifications.show({
          id:message.message_id.toString(),
          title: "Новое сообщение",
          content: message.content ??'',
        })
      }
>>>>>>> Stashed changes
    };

<<<<<<< Updated upstream
    socket.auth = { token };
||||||| Stash base
    // В прод режиме достаём токен из куки (сокеты не умеют читать HttpOnly куки)
    if (import.meta.env.PROD) {
      const cookieToken = getCookie(ACCESS_COOKIE_NAME);
      if (cookieToken) {
        socket.auth = { token: cookieToken };
      }
    } else {
      socket.auth = { token };
    }
=======
    socket.auth = { token: getSocketAuthToken(token) };
>>>>>>> Stashed changes

<<<<<<< Updated upstream
||||||| Stash base
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
=======
    socket.on('reconnect_attempt', () => {
      socket.auth = { token: getSocketAuthToken(tokenAction.doGetToken()) };
    });

    if (!socket.connected) {
      socket.connect();
    }
>>>>>>> Stashed changes
    socket.offAny();
    socket.off('connect', onConnect);
    socket.off('message', onMessage);

    socket.onAny(onAny);
    socket.on('connect', onConnect);
    socket.on('chat_private:new_message', onMessage);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('chat_private:new_message', onMessage);
      socket.offAny(onAny);
    };
  }, [addMessage, token]);

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
