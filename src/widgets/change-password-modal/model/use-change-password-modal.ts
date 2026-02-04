import { createIsOpenStore } from "@/shared/lib/is-open";
import { createSelectors } from "@/shared/lib/zustand/selectors";

export const useChangePasswordModal = createSelectors(createIsOpenStore())
