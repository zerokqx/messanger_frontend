import type { Fn } from '@/shared/types/utils/functions';
import type { SessionData } from '../ui';

export type TrustedSession = Fn<
  [createdAt: SessionData['created_at']],
  boolean
>;
