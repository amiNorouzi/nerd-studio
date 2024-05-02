"use client";
import * as React from "react";
import { useWorkspaces } from "@/components/pages/workspace/hooks/useWorkspaces";
import { WorkspaceItems } from "./workspaceItems";
import Loading from "@/components/shared/Loading";
import type { Workspace } from "@/services/types";

export interface TransformedWorkspace {
  id: string;
  created_at: string;
  updated_at: string;
  label: string;
  value: string;
  default: boolean;
}

function transformWorkspaces(workspaces: Workspace[]): TransformedWorkspace[] {
  return workspaces.map(workspace => ({
      id: workspace.id.toString(),
      created_at: workspace.created_at,
      updated_at: workspace.updated_at,
      label: workspace.name,
      value: workspace.name,
      default: workspace.is_default
  }));
}

/**
 * workspace select rendered in side panel if is open else rendered in header
 * @param isHeader for change size and hide it if side panel open
 * @constructor
 */
export function Workspace({ isHeader = false }: { isHeader?: boolean }) {

  const {data:workspaces, error, isLoading, isFetching, isError, isSuccess} = useWorkspaces();
  // console.log(workspaces);

  if(isError) { 
    console.error(error);
  }

  if(isLoading || isFetching){
    return <div><Loading /></div>
  }

  if(isSuccess) {
  return (
    <WorkspaceItems isHeader={isHeader} workspaces={transformWorkspaces(workspaces)} />
  );}
  else {
    return <div>No Workspace found.</div>
  }
}
