"use client"

import * as animationNoApps from '@/components/animations/no-apps-animation.json';
import WorkspaceAppsSection from "./WorkspaceAppsSection";
import WorkspaceDocumentsSection from "./WorkspaceDocumentsSection";

// import { apps } from "@/constants/spaces";

interface WorkspaceAppsProps {
  workspace_id: number;
}

/**
 * Apps tab content in workspace page
 * Show all apps that are installed in the workspace
 */
export const WorkspaceApps: React.FC<WorkspaceAppsProps> = ({ workspace_id }) => {
  return (
    <div className='h-full flex flex-col grow gap-4'>
      {/* ٌWorkspace apps */}
      <WorkspaceAppsSection workspace_id={ workspace_id } />
      {/* ٌWorkspace documents */}
      <WorkspaceDocumentsSection workspace_id={ workspace_id } />
    </div>
  );
};
