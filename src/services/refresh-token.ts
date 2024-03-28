import { getSession } from "next-auth/react";

import axiosClient from "@/services/axios-client";

//check if refresh token request has been made
let isCalled = false;
/**
 * This function creates a closure to handle the refreshing of expired tokens.
 * It maintains a state of whether a refresh token request has been made or not.
 * If a request has been made, it returns the promise of the request.
 * If a request has not been made, it initiates a new request and returns the promise.
 *
 * @returns {Function} A function that either returns the promise of an ongoing refresh token request or initiates a new one.
 */
export const refreshExpiredTokenClosure = () => {
  // The promise of the refresh token request.
  let runningPromise: any = undefined;

  // The function that is returned by the closure.
  return () => {
    // If a refresh token request has been made, return the promise of the request.
    if (isCalled) {
      console.log("called block");
      return runningPromise;
    }
    // If a refresh token request has not been made, initiate a new request and return the promise.
    else {
      console.log("not called block");
      isCalled = true;
      runningPromise = refreshToken();
      return runningPromise;
    }
  };
};

/**
 * `refreshToken` is an asynchronous function that handles the refreshing of an expired token.
 * It uses the `getSession` function from `next-auth/react` to get the current session,
 * and the `post` method from `axiosClient` to make a POST request to the refresh token API.
 *
 * The function first checks if there is a current session.
 * If there is no current session, it returns `null`.
 * If there is a current session, it makes a POST request to the refresh token API with the refresh token from the current session.
 * If the request is successful, it returns the new access token.
 * If the request fails, it logs the error and does not return anything.
 *
 * @returns {Promise<string|null>} A promise that resolves to the new access token if the request is successful, or `null` if there is no current session.
 */
const refreshToken = async () => {
  const session = await getSession();
  if (!session) return null;

  try {
    const { data } = await axiosClient.post<{ access_token: string }>(
      "/v1/api/auth/refresh/",
      {
        refresh_token: session.user.refreshToken,
      },
    );

    return data.access_token;
  } catch (e) {
    console.log("error in refresh token api", e);
  }
};
