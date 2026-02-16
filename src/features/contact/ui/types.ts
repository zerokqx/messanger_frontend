import type { components } from '@/shared/types/v1';

export type UpdateFormType = Omit<
  components['schemas']['ContactCreateRequest'],
  'user_id' | 'friend_code' | 'login'
>;

export interface UpdateContactFormProps {
  uuid: string;
  initialState: UpdateFormType;
}
