import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { History } from "@/types/history";

interface UploadProfile {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  phone_number: string | null;
  description: string | null;
  is_verified: boolean;
  profile_image: string;
}

export function useUploadProfileImage() {
 return useMutation({
    async mutationFn(image: File) {
      try {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axiosClient.post<UploadProfile>(
          "/users/change/profile_image/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },

          },

        );

        return response.data.profile_image;
      } catch (err) {

      }
    },


  });

}

interface GetUserInfoResponse{
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  phone_number: string;
  description: string;
  is_verified: boolean;
  profile_image: string;
}

export function useGetUserInfo() {
  return useQuery({
    queryKey: ["user-info"],
    async queryFn() {
      const { data } = await axiosClient.get<GetUserInfoResponse>(
        "users/me/",
      );

      return data;
    },
  });


}


interface UpdateUserInfoParams {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  description?: string;
}

export function useUpdateInfo() {
  return useMutation({

    async mutationFn(params:UpdateUserInfoParams) {
      const { data } = await axiosClient.patch<GetUserInfoResponse>(
        "users/me/",{...params}
      );

      return data;
    },
  });


}




export function useChangeEmailUserTokenRequest() {
  return useMutation({

    async mutationFn({email}:{email:string}) {
      const { data } = await axiosClient.post<{detail:string}>(
        "users/change/email/token/",{email}
      );

      return data;
    },
  });


}


export function useChangeEmailUserConfirm() {
  return useMutation({

    async mutationFn({email,token}:{email:string,token:string}) {
      const { data } = await axiosClient.post<{detail:string}>(
        "users/change/email/confirm/",{email,token}
      );

      return data;
    },

  });


}

