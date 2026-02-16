import type { components } from '@/shared/types/v1';

export interface ContactAddButtonProps {
  userId: string;
}

export interface ContactMenuProps {
  userId: string;
  onUpdate: (userId: string) => void;
}

export interface ContactControllPanelProps {
  userId: string;
  user: components['schemas']['ProfileByUserIdData'];
  onUpdate: (userId: string) => void;
}

export type UpdateFormType = Omit<
  components['schemas']['ContactCreateRequest'],
  'user_id' | 'friend_code' | 'login'
>;

export interface UpdateContactFormProps {
  uuid: string;
  initialState: UpdateFormType;
}
