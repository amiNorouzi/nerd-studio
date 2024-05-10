import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
interface inputData {
  name: string;
  email: string;
  message: string;
}
export interface PersonData {
  id: string;
  name: string;
  family: string;
  avatar: string;
  role: {
    title: string;
  };
  about: string;
  review: string;
  services: string;
  favorites: string;
}
export function useSendDataContactUs() {
  const { mutate, data, ...rest } = useMutation({
    async mutationFn(data: inputData) {
      try {
        const response = await axiosClient.post<inputData>(
          "/landing/create_contact/",
          {
            name: data.name,
            email: data.email,
            message: data.message,
          },
        );
        // console.log("res:", response.data.path);
        return response.data;
      } catch (err) {
        console.log("error happened in the upload", err);
      }
    },
  });

  return {
    mutate,
    data,
    ...rest,
  };
}
export function useGetTeams() {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["person"],
    async queryFn() {
      const { data } = await axiosClient.get<any>("/landing/teams/");
      return data;
    },
  });

  return { data, isLoading, refetch, isSuccess };
}
export function useGetEmploye(id: string) {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["employe"],
    async queryFn() {
      const { data } = await axiosClient.get<PersonData>(
        `/landing/teams/${id}`,
      );
      return data;
    },
  });

  return { data, isLoading, refetch, isSuccess };
}
