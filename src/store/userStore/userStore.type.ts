export interface TUserState {
  accessToken: {
    token: string;
    timeCreate: ReturnType<DateConstructor["now"]>;
  };
  user: {
    isRoot: boolean;
    uuid: string;
    name: string;
    avatar: string;
    profileLink: string;
  };
}

export interface TUserActions {
  setToken: (token: TUserState["accessToken"]["token"]) => void;
}
