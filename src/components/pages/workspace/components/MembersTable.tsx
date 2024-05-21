import { UserAvatar } from "@/components/user";
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { SelectAndDrawer } from "@/components/shared";
import { WorkspaceMember } from "@/components/pages/workspace/types/members";
import { useDeleteUserFromWorkspace } from "@/services/workspace";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import { useEffect } from "react";

interface Props{
  members: WorkspaceMember[]
isOwner:boolean
  workspace_id:number
}

const MembersTable = ({members,isOwner,workspace_id}:Props)=>{

  const {mutate:DeleteMemberMutate,isSuccess:deleteMemberIsSuccess,isError:deleteMemberIsError} = useDeleteUserFromWorkspace()

  // error and success toast components
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();

  //show some toast with actions
  useEffect(() => {
    deleteMemberIsSuccess && showSuccess('member deleted successfully.');
    deleteMemberIsError && showError('member is not deleted');
  }, [deleteMemberIsSuccess,deleteMemberIsError]);


  return (
    <div className="flex flex-col w-full h-full  gap-2   ">
      <div className='flex flex-row justify-between w-full h-[40px] border-b'>
        <p className='text-muted-foreground-light text-[15px]'>User Name</p>
        <p className='text-muted-foreground-light text-[15px]'>permissions</p>

      </div>
      {members.length > 0 &&
        <div className='flex flex-col gap-5'>
          {members.map((member, index) => {
            return (
              <div className='flex flex-row justify-between border-b pb-4'>
                <div>

                  <div className="row gap-2" key={member.id}>

                    <UserAvatar
                      imageSrc=""
                      name={`${member.user.first_name} ${member.user.last_name}`}
                    />
                    <p className="font-normal capitalize">
                      {member.user.username}
                    </p>
                  </div>
                </div>
                <div className='text-[15px] gap-4  rounded-lg  flex items-center justify-center px-1'>
                  {member.role.title === 'owner' &&
                    <div className='border text-white bg-primary rounded-lg px-1 py-1'>
                      Owner
                    </div>
                  }

                  {
                    isOwner && member.role.title !== 'owner' &&


                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        {/*invite member button*/}
                        <div className=" cursor-pointer">
                          <FaRegTrashCan className="hover:text-muted-foreground rounded-lg " />
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-md ">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Member</AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="relative ">
                                     <span className='text-[15px]'>
                                       This will remove the member from the workspace.
                                     </span>
                        </div>
                        <AlertDialogFooter>
                          {/*
                                      cancel button that close the dialog
                                                         */}
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          {/*
                                        delete button that call handleSubmit function
                                                              */}
                          <Button variant="destructive" onClick={() => {
                            DeleteMemberMutate({ workspace_id, member_id: member.id })
                          }}>
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>


                  }
                  {
                    member.role.title !== 'owner' &&
                    <SelectAndDrawer
                      value={member.role.access_level[0].title}
                      setValue={() => {
                      }}
                      items={member.role.access_level.map(item => item.title)}
                    />
                  }
                </div>
              </div>
            )
          })}

        </div>
      }
    </div>

  )
}

export default MembersTable