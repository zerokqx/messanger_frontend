import type { components } from '@/shared/types/v1';

export const ASIDE_BUS_EVENTS = {
  USER_CONTACT: 'user/contact',
  USER_CONTACT_SKELETON: 'user/contact/skeleton',

  USER_SEARCH: 'user/search',
  USER_SEARCH_SKELETON: 'user/search/skeleton',
  LOADER: 'layout/loader',
  UNDEFINED: 'undefined',
} as const;

type $$EventsKeys = typeof ASIDE_BUS_EVENTS;
export type AsideBusEevents = $$EventsKeys[keyof $$EventsKeys];

export type AsideBusCommand =
  | {
      type: $$EventsKeys['USER_CONTACT'];
      data: components['schemas']['ProfileByUserIdData'];
    }
  | {
      type: $$EventsKeys['USER_SEARCH'];
      data: components['schemas']['ProfileData'];
    }
  | {
      type: $$EventsKeys['UNDEFINED'];
      data: undefined;
    }
  | {
      type: $$EventsKeys['USER_CONTACT_SKELETON'];
      data: boolean;
    }
  | {
      type: $$EventsKeys['USER_SEARCH_SKELETON'];
      data: boolean;
    }
  | {
      type: $$EventsKeys['LOADER'];
      data: boolean;
    };
