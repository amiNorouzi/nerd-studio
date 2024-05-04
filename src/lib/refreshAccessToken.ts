import axiosClient from "@/services/axios-client";

export async function refreshAccessToken(token:any) {
  console.log("Refreshing access token");
  try {
    const {data} = await axiosClient.post<
      unknown,
      {data: {access_token:string} | {message: string}},
      {refresh_token:string;}
    >("/auth/refresh/", {refresh_token: token.refreshToken});

    let accessToken = null;
    let message = null;

    if('access_token' in data)
      accessToken = data.access_token;
    else message = data.message;

    // error ocuured during refreshToken response
    if(message) {
      throw message;
    }

    console.log("Refreshed access token");
    console.log(accessToken);

    return {
      ...token,
      accessToken: accessToken,
      accessTokenExpires: Date.now() + 5*60*1000,
      refreshToken: accessToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError" as const,
    };
  }
}