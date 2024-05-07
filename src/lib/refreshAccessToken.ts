import axiosClient from "@/services/axios-client";
import { User } from "@/services/types";
import { jwtDecode } from "jwt-decode";

export async function refreshAccessToken(token:any) {
  console.log("Refreshing access token");
  try {
    const { data } = await axiosClient.post("/auth/refresh/", { refresh_token: token.refreshToken });

    if ('message' in data) {
      console.log("Error: ", data);
      throw new Error(data.message);
    }

    const { access_token, refresh_token } = data;

    console.log("Refreshed access tokens: ", {access_token, refresh_token});

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: (jwtDecode(data.refresh_token) as User).exp,
      refreshToken: refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
