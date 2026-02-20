import { pagesMap } from './pages-map';

import type { components } from '@/shared/types/v1';
import type { InfiniteData } from '@tanstack/react-query';
import { describe, expect, it, test } from 'vitest';
type ContactItem = components['schemas']['ContactInfoData']['items'][number];
interface ContactPage {
  status: string;
  data: components['schemas']['ContactInfoData'];
}

const makeContact = (overrides: Partial<ContactItem> = {}): ContactItem => ({
  user_id: crypto.randomUUID(),
  login: 'alice',
  full_name: 'Alice Johnson',
  custom_name: null,

  friend_code: false,
  created_at: new Date('2025-01-01T00:00:00.000Z').toISOString(),
  last_seen_at: null,

  ...overrides,
});

const contactsInfiniteMock: InfiniteData<ContactPage> = {
  pages: [
    {
      status: 'success',
      data: {
        items: [
          makeContact({ user_id: 'user-1', login: 'alice', friend_code: true }),
          makeContact({
            user_id: 'user-2',
            login: 'bob',
            custom_name: 'Bobby',
          }),
        ],
        has_more: true,
      },
    },
    {
      status: 'success',
      data: {
        items: [makeContact({ user_id: 'user-3', login: 'charlie' })],
        has_more: false,
      },
    },
  ],
  pageParams: [null, 2],
};
const contactsInfinityResultMock: ContactItem[] = [
  {
    created_at: '2025-01-01T00:00:00.000Z',
    custom_name: null,
    friend_code: true,
    full_name: 'Alice Johnson',
    last_seen_at: null,
    login: 'alice',
    user_id: 'user-1',
  },
  {
    created_at: '2025-01-01T00:00:00.000Z',
    custom_name: 'Bobby',
    friend_code: false,
    full_name: 'Alice Johnson',
    last_seen_at: null,
    login: 'bob',
    user_id: 'user-2',
  },
  {
    created_at: '2025-01-01T00:00:00.000Z',
    custom_name: null,
    friend_code: false,
    full_name: 'Alice Johnson',
    last_seen_at: null,
    login: 'charlie',
    user_id: 'user-3',
  },
];
describe('Корректность данных', () => {
  it('Длина и итоговый результат', () => {
    const result = pagesMap(contactsInfiniteMock);
    expect(result).toHaveLength(3);
    expect(result).toBeInstanceOf(Array);
    expect(result).toStrictEqual(contactsInfinityResultMock);
  });
});
