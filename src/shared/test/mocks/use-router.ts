/* eslint-disable react-x/no-unnecessary-use-prefix */
import { vi } from 'vitest';

export const mockNavigate = vi.fn();
const mockHistoryPush = vi.fn();
const mockHistoryGoBack = vi.fn();

export const mockInvalidate = vi.fn();
vi.stubGlobal('mockNavigate', mockNavigate);
export const routerMock = {
  useRouterState: ({ select }: { select?: (state: any) => unknown } = {}) => {
    const state = {
      location: {
        pathname: '/',
        search: {},
        hash: '',
        state: {},
        key: 'default',
      },
      status: 'idle',
    };

    return select ? select(state) : state;
  },
  useRouter: () => ({
    state: {
      location: {
        pathname: '/',
        search: {},
        hash: '',
        state: {},
        key: 'default',
      },
      status: 'idle',
    },
    navigate: mockNavigate,
    history: {
      push: mockHistoryPush,
      back: mockHistoryGoBack,
      go: vi.fn(),
    },
    invalidate: mockInvalidate,
  }),
  useNavigate: () => mockNavigate,
  useParams: () => ({}),
  useSearch: () => ({}),
  useLoaderData: () => ({}),
  // Добавляем Link как компонент-заглушку
  Link: ({ children, to }: any) => {
    return {
      type: 'a',
      props: {
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          mockNavigate({ to });
        },
        children,
      },
    };
  },
};
