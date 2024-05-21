import { DescriptionHoverCard } from "@/components/shared";
import { WorkspaceMember } from "@/components/pages/workspace/types/members";
import { useCallback } from "react";
import { useGetDictionary } from "@/hooks";

interface MembersStatusProps {
  members: WorkspaceMember[]
}
 const MembersStatus= ({members}:MembersStatusProps)=>{
   const {
     common: { search },
     page: { workspace: workspaceDictionary },
   } = useGetDictionary();

   const countVerifiedMembers = useCallback((members: WorkspaceMember[]) => {
     let verifiedMembers = 0;
     let notVerifiedMembers = 0;

     for (let member of members) {
       if (member.user.is_verified) {
         verifiedMembers++;
       } else {
         notVerifiedMembers++;
       }
     }

     return { verifiedMembers, notVerifiedMembers };
   }, []);
   return (
     <div className='flex flex-row lg:flex-col gap-5'>

       <div className="w-[166px] h-[166px] lg:w-[248px] lg:h-[294px] flex border rounded-xl bg-muted items-center justify-center">
            <span className="text-3xl font-bold">
              {countVerifiedMembers(members).verifiedMembers}
            </span>
         <p className="text-[15px]">{workspaceDictionary.members_label}</p>
       </div>

       <div className="w-[166px] h-[166px] lg:w-[248px] lg:h-[294px] flex border rounded-xl bg-muted items-center justify-center">
            <span className="text-3xl font-bold">
              {countVerifiedMembers(members).notVerifiedMembers}
            </span>
         <p className="row gap-1 text-[15px]">
           {workspaceDictionary.members_pending_label}
           <DescriptionHoverCard
             description={workspaceDictionary.members_pending_description}
           />
         </p>
       </div>

     </div>

   )
 }

export default MembersStatus
