import axiosClient from "@/services/axios-client";
import type { AxiosResponse } from "axios";

type StopRespondingParams = {
  app_type: AppsType;
};

export async function stopResponding(app_type: AppsType) {
  try {
    const { data } = await axiosClient.post<
      any,
      AxiosResponse,
      StopRespondingParams
    >("/general/generate_stop/", { app_type });
    return data;
  } catch (error) {
    // todo
  }
}
