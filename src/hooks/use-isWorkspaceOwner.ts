import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { WorkspaceMember } from "@/components/pages/workspace/types/members";

interface Props {
  members: WorkspaceMember[] | undefined
}


const useIsWorkspaceOwner = ({members}:Props) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if(members && session){
      const OwnerAccount = members.filter(member=>member.role.title==='owner');
      session.user.email === OwnerAccount[0].user.email && setIsOwner(true)
    }else{
      setIsOwner(false)
    }


  }, [members,session]);
return {
  isOwner,setIsOwner
}

}

export default useIsWorkspaceOwner;