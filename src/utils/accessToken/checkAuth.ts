import _default from "react-use/lib/useBattery";
import z from "zod";

type CheckAuth = {
  error: boolean;
  token: ReturnType<typeof localStorage.getItem>;
};
// TODO: refresh keep in localStorage
export default (): CheckAuth => {
  const access = localStorage.getItem("access_token");
  if (access && !z.jwt().safeParse(access)) {
    return {
      error: true,
      token: access,
    };
  }
  return {
    error: false,
    token: access,
  };
};

// TODO: create class Auth for declarative control auth state
// class Auth {
//   public status: boolean | undefined = undefined;
//   private key_name: string = "access_token";
//   constructor() {}
//   getStatus = () => !this.getToken;
//
//   getToken = () => {
//     return localStorage.getItem(this.key_name);
//   };
// }
// new Auth().getStatus()
