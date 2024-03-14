import axios from "axios";

import refreshToken from "./refresh-token";
import { getSession } from "next-auth/react";

let isCalled = false;
const refreshExpiredTokenClosure = () => {
  let runningPromise: any = undefined;
  return () => {
    if (isCalled) {
      console.log("called block");
      return runningPromise;
    } else {
      console.log("not called block");
      isCalled = true;
      runningPromise = refreshToken();
      return runningPromise;
    }
  };
};

const refreshExpiredToken = refreshExpiredTokenClosure();

function createPrivateAxios() {
  if (typeof window !== "undefined") {
    console.log("private axios");

    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    // check if auth header doesn't exist set it
    axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = token;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("401 error in private axios");
          prevRequest.sent = true;
          const data = await refreshExpiredToken();
          console.log("data in private axios: ", data);
          if (data?.token) {
            axiosInstance.interceptors.request.use(config => {
              config.headers["Authorization"] = data?.token;
              return config;
            });
            prevRequest.headers["Authorization"] = data?.token;
            isCalled = false;
            return axiosInstance(prevRequest);
          } else {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      },
    );

    return axiosInstance;
  }
}

export default createPrivateAxios();
