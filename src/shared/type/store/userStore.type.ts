export interface TUserState {
  accessToken: {
    token: string;
    timeCreate: ReturnType<DateConstructor["now"]>;
  };
  user: {
    uuid: string;
    name: string;
    avatar: string;
    profileLink: string;
  };
}

export interface TUserActions {
  setToken: (token: TUserState["accessToken"]["token"]) => void;
  validateToken: () => boolean;
  removeToken: () => void;
  setUuid: (uuid: string) => void;
  clearStore: () => void;
}
