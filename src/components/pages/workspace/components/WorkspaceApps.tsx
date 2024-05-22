"use client"

import * as animationNoApps from '../../../../../public/animations/no-apps-animation.json';
import WorkspaceAppsSection from "./WorkspaceAppsSection";
import WorkspaceDocumentsSection from "./WorkspaceDocumentsSection";
import React, { useState } from "react";
import ToggleApp from "@/components/pages/workspace/components/ToggleApp";
import { WorkspaceHeader } from "@/components/pages/workspace/components/WorkspaceHeader";
import { useWorkspaces } from "@/components/pages/workspace/hooks/useWorkspaces";

// import { apps } from "@/constants/spaces";

interface WorkspaceAppsProps {
  workspace_id: number;
}

/**
 * Apps tab content in workspace page
 * Show all apps that are installed in the workspace
 */



export const WorkspaceApps = ({ workspace_id }:{workspace_id:number}) => {
  const [ActiveApp, setActiveApp] = useState<string>('All')
  const [searchAppDoc,setSearchAppDoc]=useState<string>("");
  const {data:workspaces} = useWorkspaces();

  return (
    <div className="h-full flex flex-col grow gap-4">
      <WorkspaceHeader ActiveApp={ActiveApp} setActiveApp={setActiveApp} setSearchWord={setSearchAppDoc}/>

      {/* ٌWorkspace apps */}
      {/*<WorkspaceHeader ActiveApp={ActiveApp} setActiveApp={setActiveApp}/>*/}
      {(ActiveApp ==='All' || ActiveApp==='Apps') && <WorkspaceAppsSection workspaces={workspaces} workspace_id={workspace_id} ActiveApp={ActiveApp} searched={searchAppDoc}/>}
      {/* ٌWorkspace documents */
      }
      {(ActiveApp ==='All' || ActiveApp==='Documents') &&<WorkspaceDocumentsSection workspaces={workspaces} workspace_id={workspace_id} ActiveApp={ActiveApp}  />}
    </div>
  );
};
