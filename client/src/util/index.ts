import Cookies from "js-cookie";

type TUserToken = {
  token: string;
};

export const getToken = () => {
  if (!Cookies.get("token")) {
    return { token: "" };
  }

  return JSON.parse(Cookies.get("token") ?? "") as TUserToken;
};
