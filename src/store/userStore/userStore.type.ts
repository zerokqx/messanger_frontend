export interface TUserState {
  isRoot: boolean;
  uuid: string;
  accessToken: {
    token: string;
    timeCreate: ReturnType<DateConstructor["now"]>;
  };
  user: {
    name: string;
    avatar: string;
    profileLink: string;
  };
  setToken: (token:string) => void
}
