import { useAuth } from '@/shared/model/authProviderContext';
import { LoaderSuspense } from '@/shared/ui/LoaderSuspense';
import { LoaderProvider } from '@/shared/ui/LoaderSuspense/ui/LoaderProvider';
import { lazy } from 'react';

const LoginModalLazy = lazy(() =>
  import('@/widgets/LoginModal').then(({ LoginModal }) => ({
    default: LoginModal,
  }))
);
const RegisterModalLazy = lazy(() =>
  import('@/widgets/RegisterModal/ui/RegisterModal').then(
    ({ RegisterModal }) => ({ default: RegisterModal })
  )
);
const PasswordChangeModal = lazy(() =>
  import('@/widgets/ChangePasswordModal').then(({ ChangePasswordModal }) => ({
    default: ChangePasswordModal,
  }))
);

export const Modals = () => {
  const isAuth = useAuth((s) => s.isAuth);

  return (
    <>
      <LoaderProvider fallback={false}>
        <LoaderSuspense
          condition={isAuth}
          lazyComponent={PasswordChangeModal}
        />
        <LoaderSuspense lazyComponent={LoginModalLazy} />
        <LoaderSuspense lazyComponent={RegisterModalLazy} />
      </LoaderProvider>
    </>
  );
};
