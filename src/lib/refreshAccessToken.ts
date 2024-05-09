import axiosClient from "@/services/axios-client";
import { User } from "@/services/types";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

export async function refreshAccessToken(token:any):Promise<JWT> {
  console.log("Refreshing access token");
  try {
    const res = await axiosClient.post("/auth/refresh/", { refresh_token: token.accessToken });
    const {data} = res;
    console.log("returned res from back", res);

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
    } as JWT;
  } catch (error) {
    console.log("Can not refresh accessToken.");
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
