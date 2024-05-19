import UserInviteWorkspaceConfirmation from "@/components/pages/confirmationPages/UserInviteWorkspaceConfirmation";

export type ConfirmInviteToWorkspaceSearchParams = 
    { token: string, email: string }


export default function page({ searchParams }: { searchParams: ConfirmInviteToWorkspaceSearchParams }) {
   return (
       <UserInviteWorkspaceConfirmation searchParams={searchParams} />
   );
}