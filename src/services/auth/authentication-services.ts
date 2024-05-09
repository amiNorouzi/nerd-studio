import axiosClient from "@/services/axios-client";
import { AuthReturn } from "@/services/types";
import axios from "axios";

export function loginApi(data: { email: string; password: string }) {
  return axios.post<AuthReturn>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/test_login/`,
    data,
  );
}

export function signupApi(data: {
  username: string;
  email: string;
  password: string;
}) {
  return axiosClient.post("/auth/register/", data);
}

export function signupConfirmApi(data: { email: string; token: string }) {
  return axiosClient.post<AuthReturn>("/auth/register/confirm/", data);
}
export function forgotPassApi(data: { email: string }) {
  return axiosClient.post("/auth/forget-password/", data);
}
export function setNewPassApi(data: {
  email: string;
  token: string;
  new_password: string;
  confirm_password: string;
}) {
  return axiosClient.post("/auth/set-new-password/", data);
}

export function oAuthLoginApi(data: {
  email: string;
  name: string;
  user_id: string;
  picture: string;
}) {
  return axiosClient.post<AuthReturn>("/auth/oauth/google/", data);
}
