import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LuUserPlus } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SelectAndDrawer } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import { useDeleteUserFromWorkspace } from "@/services/workspace";
import { useCallback, useEffect, useState } from "react";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import { useInviteMember } from "@/components/pages/workspace/hooks/useInviteMember";

interface Props {
  isOwner: boolean

  workspace_id:number
}
const invitePermissions = [{title:'Can Read',type:'read'},{title:'Can Read/Write',type:'read-write'}]

const MembersSearchInvite = ({ isOwner,workspace_id }: Props) => {
  const [email, setEmail] = useState("");
  // set permissions for invitation email
  const [invitePermission, setInvitePermission] = useState(invitePermissions[0].title)
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  const {
    mutate: inviteMember,
    isError: isInviteMemberError,
    isSuccess: isInviteMemberSuccess,

    data: invitedMemberResponseData,
    error: invitedMemberError,
  } = useInviteMember({ workspace_id });

  //show toast for invitation action
  useEffect(() => {
    isInviteMemberSuccess && showSuccess('email is sent')
    invitedMemberError && showError('enter a correct email')
  }, [isInviteMemberSuccess,invitedMemberError]);

  // error and success toast components
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();

  const InviteMemberHandler = useCallback(() => {
    if (email.length === 0) {
      showError("Email is not provided yet!");
      return
    }

    inviteMember({
      email,
      workspace_id,
      role:invitePermissions.filter(perm=>perm.title ===invitePermission )[0].type
    });
  }, [email, inviteMember, showError, workspace_id]);

  return (
    <div className="flex flex-row w-full  ">
      <div className="flex flex-row w-full gap-2 justify-end lg:justify-start mx-[16px] lg:mx-[32px]">


        <div className="fit relative flex-1 lg:flex-grow-0 lg:w-60  ">
          <Input
            type="search"
            className="w-full lg:w-60 bg-muted ps-7 font-light"

            placeholder={search}
          />
          <FiSearch
            size="1rem"
            className="absolute start-2 top-1/2 -translate-y-1/2"
          />
        </div>
        {isOwner &&
          <div>


            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/*invite member button*/}
                <Button className="w-fit lg:w-[100px]">
                  <LuUserPlus className="me-2 h-4 w-4" />
                  {workspaceDictionary.members_invite_button_label}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md ">
                <AlertDialogHeader>
                  <AlertDialogTitle>Invite Member</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="relative ">
                <span className="absolute left-2 top-1/2 -translate-y-1/2">
                  <MdOutlineEmail size={16} className="text-gray-400" />
                </span>
                  <div className='flex flex-row gap-2'>

                    <Input
                      placeholder="Email"
                      className="pl-7 ps-7"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <div className='w-[150px]'>

                      <SelectAndDrawer
                        value={invitePermission}
                        setValue={(val) => {
                          setInvitePermission(val)

                        }}
                        items={invitePermissions.map(item => item.title)}
                      />
                    </div>

                  </div>
                </div>
                <AlertDialogFooter>
                  {/*
                cancel button that close the dialog
              */}
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/*
                    delete button that call handleSubmit function
                */}
                  <Button variant="destructive" onClick={InviteMemberHandler}>
                    Invite New Member
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      </div>
    </div>
  )
}
export default MembersSearchInvite