import type { components } from '@/shared/types/v1';

export const ASIDE_BUS_EVENTS = {
  USER_CONTACT: 'user/contact',
  USER_CONTACT_SKELETON: 'user/contact/skeleton',

  USER_SEARCH: 'user/search',
  USER_SEARCH_SKELETON: 'user/search/skeleton',
  LOADER: 'layout/loader',
  UNDEFINED: 'undefined',
} as const;

type AsideBusEventKeys = typeof ASIDE_BUS_EVENTS;

export type AsideBusEvents = AsideBusEventKeys[keyof AsideBusEventKeys];

export type AsideBusCommand =
  | {
      type: AsideBusEventKeys['USER_CONTACT'];
      data: components['schemas']['ProfileByUserIdData'];
    }
  | {
      type: AsideBusEventKeys['USER_SEARCH'];
      data: components['schemas']['ProfileByUserIdData'];
    }
  | {
      type: AsideBusEventKeys['UNDEFINED'];
      data: undefined;
    }
  | {
      type: AsideBusEventKeys['USER_CONTACT_SKELETON'];
      data: boolean;
    }
  | {
      type: AsideBusEventKeys['USER_SEARCH_SKELETON'];
      data: boolean;
    }
  | {
      type: AsideBusEventKeys['LOADER'];
      data: boolean;
    };
