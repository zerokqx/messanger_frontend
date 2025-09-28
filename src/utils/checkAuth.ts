// TODO: refresh keep in localStorage
export const checkAuth = () => {
  const access = localStorage.getItem("access_token");

  return !access;
};
