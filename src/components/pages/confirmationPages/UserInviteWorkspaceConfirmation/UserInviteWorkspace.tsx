"use client";

import type { ConfirmInviteToWorkspaceSearchParams } from "@/app/[lang]/(protect-roots)/workspace/confirm_invite_to_workspace/page";
import { useConfirmInviteToWorkspace } from "@/services/workspace";
import { useEffect } from "react";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import { useRouter } from "next/navigation";
import { isWasm } from "next/dist/build/swc";

export default function UserInviteWorkspace({searchParams}:{searchParams: ConfirmInviteToWorkspaceSearchParams}) {

  const {mutate,isError,isSuccess} =useConfirmInviteToWorkspace()

  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();
  const router = useRouter();


  useEffect(() => {
    mutate({email:searchParams.email , token:searchParams.token})

  }, []);
  useEffect(() => {
    if(isSuccess){
      showSuccess('successfully registered');
      router.replace('/workspace')
    }
    if(isError){
      showError('error has happened')
      router.replace('/workspace')
    }
  }, [isSuccess,isError]);
   return (
       <div className='flex w-full h-full items-center justify-center'>
           <h1 className='text-[30px] animate-pulse'>
             {!isSuccess && !isError && `confirming you invitation ...`}
             {isSuccess && `confirmed `}
           </h1>
       </div>
   );
}
