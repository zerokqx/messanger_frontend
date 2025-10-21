import { useCheckAuth } from '@/features/checkAuth';
import { LoaderSuspense } from '@/shared/ui/LoaderSuspense';
import { LoaderProvider } from '@/shared/ui/LoaderSuspense/ui/LoaderProvider';
import { lazy } from 'react';

const SettingsModals = lazy(() =>
  import('@/widgets/Settings/ui/Settings').then(({ SettingsModal }) => ({
    default: SettingsModal,
  }))
);
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
  const isAuth = useCheckAuth();

  return (
    <>
      <LoaderProvider fallback={false}>
        <LoaderSuspense
          condition={isAuth}
          lazyComponent={PasswordChangeModal}
        />
        <LoaderSuspense condition={isAuth} lazyComponent={SettingsModals} />
        <LoaderSuspense lazyComponent={LoginModalLazy} />
        <LoaderSuspense lazyComponent={RegisterModalLazy} />
      </LoaderProvider>
    </>
  );
};
