import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import {
  AppShell,
  AppShellAside,
  AppShellNavbar,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { Suspense, lazy, useEffect, useRef } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
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
import { useTranslation } from 'react-i18next';

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
  const [i18nTitles] = useTranslation('titles');
  const { data: meUserId } = useMeUserId();
  const createNewChat = useCreateChatFromSocketEvent();
  const addMessage = useAddMessageToHistory();
  const selectedChat = useSelectedChat((s) => s.chatId);
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  const token = useTokenStore((s) => s.data.access);

  // Use refs to avoid recreating useEffect dependencies
  const createNewChatRef = useRef(createNewChat);
  const addMessageRef = useRef(addMessage);
  const meUserIdRef = useRef(meUserId);
  const tokenRef = useRef(token);

  useEffect(() => {
    // Update refs on every render
    createNewChatRef.current = createNewChat;
    addMessageRef.current = addMessage;
    meUserIdRef.current = meUserId;
    tokenRef.current = token;
  });

  useEffect(() => {
    const onAny = (event: string, ...args: unknown[]) => {
      Logger.debug('_authenticated/route.tsx','Socket new event',[event,...args])
      console.log('EVENT:', event, args);
    };

    const onConnect = () => {
      Logger.debug('_authenticated/route.tsx','Socket connected')
      console.log('✅ [SOCKET] Connected successfully, SID:', socket.id);
    };

    const onDisconnect = (reason: string) => {
      console.log('❌ [SOCKET] Disconnected, reason:', reason);
    };

    const onReconnect = () => {
      console.log('🔄 [SOCKET] Reconnected with new SID:', socket.id);
    };

    const onReconnectAttempt = () => {
      // Обновляем токен из куки при каждой попытке реконнекта
      const reconnectToken = import.meta.env.PROD
        ? getCookie(ACCESS_COOKIE_NAME) || ''
        : tokenAction.doGetToken() || '';
      
      console.log('🔄 [SOCKET] Reconnect attempt, updating token');
      
      socket.auth = {
        token: reconnectToken,
        client_type: import.meta.env.PROD ? 'web' : 'web-dev',
      };
    };

    const onMessage = async (event: ChatPrivateNewMessageSocketEvent) => {
      console.log('📨 [SOCKET] chat_private:new_message received', event);

      await createNewChatRef.current(event);
      const message = event.payload;
      if (!message.chat_id) {
        console.warn('⚠️ [SOCKET] No chat_id in message, skipping');
        return;
      }

      const historyQueryKey =
        getGetPrivateChatHistoryHistoryGetInfiniteQueryKey({
          chat_id: message.chat_id,
        });

      console.log('🔑 [SOCKET] Query key for chat:', historyQueryKey);
      console.log('👤 [SOCKET] Current user ID:', meUserIdRef.current, 'Message sender:', message.sender_id);

      if (meUserIdRef.current !== event.payload.sender_id) {
        console.log('➕ [SOCKET] Adding message to history', {
          chat_id: message.chat_id,
          content: message.content,
          message_type: message.message_type,
          sender_id: message.sender_id,
        });
        
        const prevHistory = await addMessageRef.current(
          {
            chat_id: message.chat_id,
            content: message.content,
            message_type: message.message_type,
            sender_id: message.sender_id,
          },
          historyQueryKey
        );
        
        console.log('✅ [SOCKET] Previous history state:', prevHistory);
      } else {
        console.log('ℹ️ [SOCKET] Message from current user, not adding (already added optimistically on send)');
      }
    };

    // В прод режиме достаём токен из куки (сокеты не умеют читать HttpOnly куки)
    const socketToken = import.meta.env.PROD
      ? getCookie(ACCESS_COOKIE_NAME) || ''
      : tokenRef.current;

    console.log('🔌 [SOCKET] Initial connection with token:', {
      isProd: import.meta.env.PROD,
      token_source: import.meta.env.PROD ? 'cookie' : 'localStorage',
      cookie_raw: getCookie(ACCESS_COOKIE_NAME),
      token_preview: socketToken.substring(0, 30) + '...',
      has_token: socketToken.length > 0,
    });

    // Передаём токен и client_type через auth — бэкенд использует их для аутентификации
    socket.auth = {
      token: socketToken,
      client_type: import.meta.env.PROD ? 'web' : 'web-dev',
    };

    // Подписываемся на события
    socket.on('reconnect', onReconnect);
    socket.on('reconnect_attempt', onReconnectAttempt);
    socket.on('disconnect', onDisconnect);

    // Первый коннект
    if (!socket.connected) {
      console.log('🔌 [SOCKET] Connecting...');
      socket.connect();
    } else {
      console.log('ℹ️ [SOCKET] Already connected, skipping');
    }
    
    socket.offAny();
    socket.off('connect', onConnect);
    socket.off('chat_private:new_message', onMessage);

    socket.onAny(onAny);
    socket.on('connect', onConnect);
    socket.on('chat_private:new_message', onMessage);

    return () => {
      // НЕ отключаемся при размонтировании - держим соединение живым
      // Только отписываемся от обработчиков чтобы не было дубликатов
      socket.off('connect', onConnect);
      socket.off('chat_private:new_message', onMessage);
      socket.off('reconnect', onReconnect);
      socket.off('reconnect_attempt', onReconnectAttempt);
      socket.off('disconnect', onDisconnect);
      socket.offAny(onAny);
      
      console.log('🧹 [SOCKET] Cleanup handlers only, keeping connection alive');
    };
  }, []); // Empty deps - socket connection lives forever

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
          <Suspense fallback={<Box p="md">{i18nTitles('loading')}</Box>}>
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
