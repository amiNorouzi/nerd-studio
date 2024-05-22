import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { Workspace, WorkspaceApp } from "@/services/types";
import { Version } from "@/types/history";
import { useState } from "react";

type UseGetWorkspaceAppsParams = {
  workspace_id: number;
};

export interface AllApps{

  id:number;
  topic:string;
  task:string;
  prompt:string
  params:string[]
status:string
}
export function useGetUserApps() {
  return useQuery<AllApps[], Error>({
    queryKey: ["workspace-apps"],
    queryFn: async () => {
      const response = await axiosClient.get<AllApps[]>(
        `/workspaces/get_user_apps/`,
      );
      return response.data;
    },
  });
}

interface AddAppToWorkspace{
  app_id:number
  workspace_id:number
}
interface AddAppRequest{
  app_id:number
}

export function useAddAppToWorkspace() {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ app_id ,workspace_id}: AddAppToWorkspace) => {
      setWorkspaceId(workspace_id)

      const {data}= await axiosClient.post<unknown, any, AddAppRequest>(`/workspaces/add_app_to_workspace/${workspace_id}/`, { app_id });
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-apps",workspaceId] }); // Invalidate the query to trigger a refetch
    },
  });
}

export function useDeleteApps() {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ app_id ,workspace_id}: AddAppToWorkspace ) => {
      setWorkspaceId(workspace_id)
      const { data } = await axiosClient.delete<WorkspaceApp>(
        `workspaces/delete_app_from_workspace/${workspace_id}/${app_id}/`,
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-apps",workspaceId] }); // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["workspace-apps"] });
    },

  });
}

interface MoveApp{
  app_id:number,
  workspace_id:number,

}

export function useMoveAppToWorkspace({sourceWorkspace}:{sourceWorkspace:number}) {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ app_id ,workspace_id}: AddAppToWorkspace) => {
      setWorkspaceId(workspace_id)

      const {data}= await axiosClient.put<unknown, any, MoveApp>(`/workspaces/move_app/?workspace_id=${sourceWorkspace}`, { app_id,workspace_id});
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-apps",sourceWorkspace] });
      queryClient.invalidateQueries({ queryKey: ["workspace-apps",workspaceId] }); // Invalidate the query to trigger a refetch
    },
  });
}

interface ConfirmInviteToWorkspace {
  email:string
  token:string
}


export function useConfirmInviteToWorkspace(){

  return useMutation({
    mutationFn: async ({email,token}: ConfirmInviteToWorkspace) => {


      const {data}= await axiosClient.post<unknown, any, ConfirmInviteToWorkspace>(`/workspaces/confirm_invite_to_workspace_without_register/`, { email,token });
      return data
    },

  });

}

interface  ConfirmInviteToWorkspaceWithRegister{
  email:string
  username:string;
  password:string;
  token:string
}
export function useConfirmInviteToWorkspaceWithRegister() {

  return useMutation({
    mutationFn: async ({ email, username, password, token }: ConfirmInviteToWorkspaceWithRegister) => {


      const { data } = await axiosClient.post<unknown, any, ConfirmInviteToWorkspaceWithRegister>(`/workspaces/confirm_invite_to_workspace_with_register/`, {
        email,
        username,
        password,
        token
      });
      return data
    },

  });
}

interface DeleteUserFromWorkspace {
  workspace_id:number
  member_id:number
}

export function useDeleteUserFromWorkspace() {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ workspace_id,member_id}: DeleteUserFromWorkspace ) => {
      setWorkspaceId(workspace_id)
      const { data } = await axiosClient.delete<DeleteUserFromWorkspace>(
        `workspaces/delete_workspace_members/${workspace_id}/${member_id}/
`,
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] }); // Invalidate the query to trigger a refetch

    },

  });
}

interface ChangeMemberRole{

  member_id:number;
  role:'read' | 'read-write'
}

export function useChangeMemberRole({workspace_id}:{workspace_id:number}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ member_id,role}: ChangeMemberRole) => {

      const {data}= await axiosClient.put<unknown, any, ChangeMemberRole>(`/workspaces/change_member_role/${workspace_id}/`, { member_id,role});
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspace_id]});

    },
  });
}


export function useDeleteWorkspace(workspace_id:{workspace_id:number}) {
  return useMutation({
    mutationFn: async ({ app_id ,workspace_id}: AddAppToWorkspace ) => {
      const { data } = await axiosClient.delete<WorkspaceApp>(
        `workspaces/delete_workspace/${workspace_id}/
`,
      );

      return data;
    },


  });
}

interface ChangeWorkspaceName{
  name:string
}

export function useChangeWorkspaceName({workspace_id}:{workspace_id:number}) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name}: ChangeWorkspaceName) => {

      const {data}= await axiosClient.put<unknown, any, ChangeWorkspaceName>(`/workspaces/update_workspace/${workspace_id}/`,{name});
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    }

  });
}


interface MoveDocToWorkspace{
  document_id:number,
  workspace_id:number,
}

export function useMoveDocToWorkspace({sourceWorkspace}:{sourceWorkspace:number}) {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const [appType,setAppType] = useState()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ document_id ,workspace_id}: MoveDocToWorkspace) => {
      setWorkspaceId(workspace_id)

      const {data}= await axiosClient.put<unknown, any, MoveDocToWorkspace>(`/workspaces/move_document/?workspace_id=${sourceWorkspace}`, { document_id,workspace_id});
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-docs",sourceWorkspace,"grammar" ]});
      queryClient.invalidateQueries({ queryKey: ["workspace-docs",workspaceId,'grammar'] }); // Invalidate the query to trigger a refetch
    },
  });
}

interface DeleteDoc {   document_id: number
   workspace_id: number }

export function useDeleteDocs({app_type}:{app_type:string}) {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ document_id ,workspace_id}: DeleteDoc ) => {
      setWorkspaceId(workspace_id)
      const { data } = await axiosClient.delete<DeleteDoc>(
        `workspaces/delete_workspace_history/${workspace_id}/${document_id}/`,
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-docs",workspaceId,app_type ] }); // Invalidate the query to trigger a refetch
    },

  });
}






