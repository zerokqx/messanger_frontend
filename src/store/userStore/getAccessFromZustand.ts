import z from "zod";

export const getAccessFromZustand = <
  T extends {
    accessToken: {
      token: string;
    };
  } & object,
>(
  nameStorage: string = "user-storage",
  storage: Storage = localStorage,
) => {
  const storageString = storage.getItem(nameStorage);
  if (storageString) {
    const { state }: { state: T } = JSON.parse(storageString);

    if (
      state?.accessToken?.token &&
      z.jwt().safeParse(state.accessToken.token).success
    )
      return true;
    else storage.removeItem("user-storage");
  }
  return false;
};
