import type { Fn } from '@/shared/types/utils/functions';

export interface SessionActionContextType {
  onRevoke: Fn<[id: string], void>;
  onRevokeAll: Fn<[], void>;
  onRefetch?: Fn<[], void>;
}
