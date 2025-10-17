import { createIsOpenStore } from "@/shared/lib/isOpen";
import { createSelectors } from "@/shared/lib/zustand/selectors";


const useLoginModalBase = createIsOpenStore()
export const useLoginModal = createSelectors(useLoginModalBase)
