import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TUserActions, TUserState } from "./userStore.type";
import { createSelectors } from "../autoGenerateSelector";

export const useUserStoreBase = create<TUserState & TUserActions>()(
  persist(
    (set) => ({
      accessToken: {
        token: "",
        timeCreate: Date.now(),
      },
      user: {
        profileLink: "",
        name: "",
        avatar: "",
        uuid: "",
      },
      setToken(token) {
        set(() => ({
          accessToken: {
            token,
            timeCreate: Date.now(),
          },
        }));
      },
      // setUser(){
      //
      // }
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useUserStore = createSelectors(useUserStoreBase);
