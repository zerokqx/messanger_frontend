import type { Fn } from '@/shared/types/utils/functions';
import type { RelationshipStatusResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';

export type Relationships = RelationshipStatusResponse;
export type RelationshipsFn = Fn<[relationships: Relationships], boolean>;
