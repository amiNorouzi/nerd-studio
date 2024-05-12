"use client";

import type { ConfirmInviteToWorkspaceSearchParams } from "@/app/[lang]/confirm_invite_to_workspace/page";

export default function UserInviteWorkspace({searchParams}:{searchParams: ConfirmInviteToWorkspaceSearchParams}) {
   console.log("searchParams: ", searchParams);
   return (
       <div>
           <h1>UserInviteWorkspaceConfirmation</h1>
       </div>
   );
}