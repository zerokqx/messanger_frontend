import _default from "react-use/lib/useBattery";

// TODO: refresh keep in localStorage
export default () => {
  const access = localStorage.getItem("access_token");
  return !access;
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
