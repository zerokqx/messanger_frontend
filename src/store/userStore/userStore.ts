import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TUserActions, TUserState } from "./userStore.type";
import { createSelectors } from "../autoGenerateSelector";
import z from "zod";

export const useUserStoreBase = create<TUserState & TUserActions>()(
  persist(
    (set, get, store) => ({
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
      clearStore() {
        set(store.getInitialState());
      },
      setUuid(uuid) {
        if (z.uuid().safeParse(uuid).success) {
          set((state) => ({
            user: {
              ...state.user,
              uuid,
            },
          }));
        }
      },
      setToken(token) {
        set(() => ({
          accessToken: {
            token,
            timeCreate: Date.now(),
          },
        }));
      },
      validateToken() {
        return z.jwt().safeParse(get().accessToken.token).success;
      },
      removeToken() {
        set(() => ({
          accessToken: {
            token: "",
            timeCreate: 0,
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
