import type { Fn } from '@/shared/types/utils/functions';
import type { components } from '@/shared/types/v1';

export type Relationships = components['schemas']['RelationshipStatusResponse'];
export type RelationshipsFn = Fn<[relationships: Relationships], boolean>;

