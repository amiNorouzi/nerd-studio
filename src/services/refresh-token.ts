import { isAxiosError } from "axios";

const clearAuthData = async () => {};

const getToken = async () => {
  return {
    data: {
      accessToken: "",
      refreshToken: "",
    },
  };
};
const refreshToken = async () => {
  try {
    const { data } = await getToken();
    console.log("Data in refresh token: ", data);
    if (data) {
      const token = data?.accessToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refresh", data.refreshToken);
      return {
        token,
      };
    } else {
      await clearAuthData();
    }
  } catch (e) {
    if (isAxiosError(e)) {
      console.log(`error in refresh token: ${e.request.url}: `, e);
      console.log(
        "error message in refresh token: ",
        e?.response?.data?.message,
      );
    }
    await clearAuthData();
  }
};

export default refreshToken;
