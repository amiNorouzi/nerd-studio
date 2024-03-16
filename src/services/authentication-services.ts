import axiosClient from "@/services/axios-client";
import { AuthReturn } from "@/services/types";

export function loginApi(data: { email: string; password: string }) {
  return axiosClient.post<AuthReturn>("/auth/login", data);
}

export function signupApi(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  return axiosClient.post<AuthReturn>("/auth/signup", data);
}
