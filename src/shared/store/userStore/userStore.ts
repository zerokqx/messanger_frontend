import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { createSelectors } from "../autoGenerateSelector";
import z from "zod";
import type { TUserState, TUserActions } from "@type/store";

export const useUserStoreBase = create<TUserState & TUserActions>()(
  devtools(
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
  ),
);
export const useUserStore = createSelectors(useUserStoreBase);
