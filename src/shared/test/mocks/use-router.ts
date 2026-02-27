import { vi } from 'vitest';

export const mockNavigate = vi.fn();
export const mockHistoryPush = vi.fn();
export const mockHistoryGoBack = vi.fn();

export const mockInvalidate = vi.fn();
vi.stubGlobal('mockNavigate', mockNavigate);
export const routerMock = {
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
        onClick: (e: any) => {
          e.preventDefault();
          mockNavigate({ to });
        },
        children,
      },
    };
  },
};
