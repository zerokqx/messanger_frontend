import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TUserState } from "./userStore.type";
import { createSelectors } from "../autoGenerateSelector";

export const useUserStoreBase = create<TUserState>()(
  persist(
    (set, get) => ({
      accessToken: {
        token: "",
        timeCreate: Date.now(),
      },
      isRoot: false,
      user: {
        profileLink: "",
        name: "",
        avatar: "",
      },
      uuid: "",
      setToken(token) {
        set(() => ({
          accessToken: {
            token,
            timeCreate: Date.now(),
          },
        }));
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useUserStore = createSelectors(useUserStoreBase);
