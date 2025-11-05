import { createIsOpenStore } from "@/shared/lib/isOpen";
import { createSelectors } from "@/shared/lib/zustand/selectors";

export const useChangePasswordModal = createSelectors(createIsOpenStore())
