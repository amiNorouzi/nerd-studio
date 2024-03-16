import axios from "axios";

import { getSession } from "next-auth/react";

const session = await getSession();

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: session?.user.accessToken,
  },
});

// check if auth header doesn't exist set it
axiosClient.interceptors.request.use(
  async config => {
    const session = await getSession();
    if (session) {
      config.headers["Authorization"] = session?.user.accessToken;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default axiosClient;
