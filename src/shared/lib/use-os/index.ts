import { useOs as useOsMantine, type UseOSReturnValue } from '@mantine/hooks';
import { useMemo } from 'react';
const mobile: UseOSReturnValue[] = ['android', 'ios'];
const desktop: UseOSReturnValue[] = ['chromeos', 'macos', 'linux', 'windows'];

export const useOs = () => {
  const os = useOsMantine();
  const osType = useMemo(
    () => ({
      isMobile: mobile.includes(os),
      isDesktop: desktop.includes(os),
    }),
    [os]
  );
  return osType;
};
