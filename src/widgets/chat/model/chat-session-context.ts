import type {
  ProfileByUserIdData,
  ProfileData,
} from '@/shared/api/orval/profile-service/profile-service.schemas';
import type { FormatLoginResult } from '@/shared/lib/formaters';
import {
  createContext,
  type ContextSelector,
  useContextSelector,
} from '@fluentui/react-context-selector';

interface AvatarUrls {
  avatars: {
    current: {
      url?: string;
    };
  };
}

type CurrentUser = Pick<ProfileData, 'avatars' | 'login' | 'user_id'> &
  AvatarUrls;

type TargetUser = Pick<
  ProfileByUserIdData,
  'avatars' | 'login' | 'custom_name' | 'user_id'
> &
  AvatarUrls & { formatLogin: FormatLoginResult };

interface ChatSessionContextType {
  currentUser: CurrentUser;
  targetUser: TargetUser;
  chatId: string;
}
export const ChatSessionContext = createContext<ChatSessionContextType | null>(
  null
);

export const useChatSession = <T>(
  selector: ContextSelector<ChatSessionContextType, T>
) =>
  useContextSelector(ChatSessionContext, (context) => {
    if (!context) {
      throw new Error('useChatSession must be used within ChatSessionContext.Provider');
    }

    return selector(context);
  });
