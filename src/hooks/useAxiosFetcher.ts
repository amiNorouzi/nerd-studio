"use client";
import { useEffect, useRef } from "react";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import useErrorToast from "./useErrorToast";

import axiosClient from "@/services/axios-client";
import { refreshExpiredTokenClosure } from "@/services/refresh-token";

/**
 * `configObjType` is an interface that defines the configuration object for the `axiosFetch` function.
 * It has the following properties:
 * - `url`: The URL for the request.
 * - `axiosInstance`: The `axios` instance to use for the request. If not provided, the default `axiosClient` is used.
 * - `method`: The HTTP method for the request. If not provided, the default method is `get`.
 * - `requestConfig`: The configuration for the `axios` request.
 * - `showError`: A boolean that indicates whether to show an error toast if the request fails.
 */
interface configObjType {
  url: string;
  axiosInstance?: AxiosInstance;
  method?: "get" | "post" | "delete" | "head" | "options" | "put";
  requestConfig?: AxiosRequestConfig;
  showError?: boolean;
}

// Create a closure for the `refreshExpiredToken` function.
const refreshExpiredToken = refreshExpiredTokenClosure();

/**
 * `useAxiosFetcher` is a custom React hook that provides a function for making `axios` requests and a function for aborting the request.
 * It uses the `useRef` hook from React to create a reference to an `AbortController` instance,
 * the `useErrorToast` hook to get the `showFetchError` function,
 * and the `useSession` hook from `next-auth/react` to get the current session and the `update` function.
 *
 * The hook returns an object with the following properties:
 * - `abortRequest`: A function that aborts the current request.
 * - `axiosFetch`: A function that makes an `axios` request with the provided configuration and data.
 *
 * @returns {Object} An object with the `abortRequest` and `axiosFetch` functions.
 */
export function useAxiosFetcher() {
  const controller = useRef<AbortController>();
  const { showFetchError } = useErrorToast();
  const { update } = useSession();

  /**
   * `axiosFetch` is an asynchronous function that makes an `axios` request with the provided configuration and data.
   * It uses the `interceptors` property from `axios` to add a response interceptor to the `axios` instance.
   *
   * The function first aborts any previous request.
   * Then, it creates a new `AbortController` instance and gets the `signal` from it.
   * It makes the `axios` request with the provided configuration and data, and the `signal` from the `AbortController` instance.
   * If the request is successful, it returns the data from the response.
   * If the request fails, it logs the error and shows an error toast if `showError` is `true`.
   *
   * @param {configObjType} configObj - The configuration object for the request.
   * @param {any} data - The data for the request.
   *
   * @returns {Promise<T|null>} A promise that resolves to the data from the response if the request is successful, or `null` if the request fails.
   */
  async function axiosFetch<T>(configObj: configObjType, data?: any) {
    const {
      axiosInstance = axiosClient!,
      method = "get",
      url,
      requestConfig = {},
      showError = false,
    } = configObj;

    /**
     *  Add a response interceptor to the axios instance.
     *  use axios interceptors to handle 401 error
     *  refresh token and retry the request
     */
    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        // keep the previous request
        const prevRequest = error?.config;
        // check if the error is 401 and the request has not been sent
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("401 error in private axios");
          // mark the request as sent
          prevRequest.sent = true;
          //refresh access token with the refresh token
          const token = await refreshExpiredToken();
          // if token is returned update the session and retry the request
          console.log("token returned from refresh token api: ", token);
          if (token) {
            const session = await getSession();
            await update({
              ...session,
              user: {
                ...session!.user,
              },
            });
            console.log("data in private axios: ", token);
            // add the new token to the request header
            axiosInstance.interceptors.request.use(config => {
              config.headers["Authorization"] = `Bearer ${token}`;
              return config;
            });
            // retry the request
            prevRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(prevRequest);
          } else {
            // if token is not returned sign out the user
            await signOut({ callbackUrl: "/login" });
            return Promise.reject(error);
          }
        } else {
          // if the error is not 401 or the request has been sent return the error
          return Promise.reject(error);
        }
      },
    );

    // Abort the previous request.
    // abortRequest();

    // Create a new AbortController instance and get the signal.
    controller.current = new AbortController();
    const signal = controller.current.signal;

    try {
      // Make the axios request with the provided configuration and data.
      const res = await axiosInstance!<T>({
        ...requestConfig,
        method,
        url,
        signal,
        data,
      });

      if (res) return res.data as T;
    } catch (err) {
      console.log({ err });
      // Show error toast if `showError` is `true`.
      if (showError) {
        showFetchError(err);
      }
    }
  }

  /**
   * `abortRequest` is a function that aborts the current request.
   * It uses the `abort` method from the `AbortController` instance.
   */
  const abortRequest = () => controller.current?.abort();

  // Abort the request when the component unmounts.
  useEffect(() => {
    return () => abortRequest();
  }, []);

  return { abortRequest, axiosFetch };
}
