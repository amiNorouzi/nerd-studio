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
