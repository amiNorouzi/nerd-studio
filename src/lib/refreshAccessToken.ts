import axiosClient from "@/services/axios-client";
import type { JWT } from "next-auth/jwt";

export async function refreshAccessToken(token:any) {
  console.log("Refreshing access token");

  try {
    const { data } = await axiosClient.post("/auth/refresh/", { refresh_token: token.refreshToken });

    if ('message' in data) {
      throw new Error(data.message);
    }

    const { access_token, refresh_token } = data;

    console.log("Refreshed access token", access_token, refresh_token);

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + 5 * 60 * 1000,
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
