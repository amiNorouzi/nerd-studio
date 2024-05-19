import type { ConfirmInviteToWorkspaceSearchParams } from "@/app/[lang]/(protect-roots)/workspace/confirm_invite_to_workspace/page";
import UserInviteWorkspace from "./UserInviteWorkspace";

export default function UserInviteWorkspaceConfirmation({searchParams}:{searchParams: ConfirmInviteToWorkspaceSearchParams}) {
   return (
       <UserInviteWorkspace searchParams={searchParams} />
   );
}