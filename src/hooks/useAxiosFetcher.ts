"use client";
import { useState, useEffect, useRef } from "react";

import type { AxiosInstance, AxiosRequestConfig } from "axios";

import useErrorToast from "./useErrorToast";
import axiosClient from "@/services/axios-client";
import { refreshExpiredTokenClosure } from "@/services/refresh-token";
import { useSession } from "next-auth/react";

interface configObjType {
  url: string;
  axiosInstance?: AxiosInstance;
  method?: "get" | "post" | "delete" | "head" | "options" | "put";
  requestConfig?: AxiosRequestConfig;
}

const refreshExpiredToken = refreshExpiredTokenClosure();

export function useAxiosFetcher() {
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController>();
  const { showFetchError } = useErrorToast();
  const { update, data: session } = useSession();

  async function axiosFetch<T>(configObj: configObjType, data?: any) {
    const {
      axiosInstance = axiosClient!,
      method = "get",
      url,
      requestConfig = {},
    } = configObj;

    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("401 error in private axios");
          prevRequest.sent = true;
          const data = await refreshExpiredToken();
          if (data?.token) {
            await update({
              ...session,
              user: {
                ...session!.user,
                accessToken: "",
                refreshToken: "",
              },
            });
            console.log("data in private axios: ", data);
            axiosInstance.interceptors.request.use(config => {
              config.headers["Authorization"] = data?.token;
              return config;
            });
            prevRequest.headers["Authorization"] = data?.token;
            return axiosInstance(prevRequest);
          } else {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      },
    );

    abortRequest();

    controller.current = new AbortController();
    const signal = controller.current.signal;

    try {
      setLoading(true);
      const res = await axiosInstance!<T>({
        ...requestConfig,
        method,
        url,
        signal,
        data,
      });

      setResponse(res.data);
      return res;
    } catch (err) {
      showFetchError(err);
    } finally {
      setLoading(false);
    }
  }

  const abortRequest = () => controller.current?.abort();

  useEffect(() => {
    // useEffect cleanup function
    return () => abortRequest();
  }, []);

  return { response, loading, abortRequest, axiosFetch };
}
