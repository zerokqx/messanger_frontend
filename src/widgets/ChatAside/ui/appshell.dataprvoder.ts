import { createDataHook } from '@/shared/lib/hooks/useDataProvider';
import { derive } from 'derive-zustand';

export const useAppshelData = createDataHook(['asside'], { assides: { w: 1 } });
