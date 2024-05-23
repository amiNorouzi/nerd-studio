"use client";
import { FormEvent, useEffect, useState } from "react";

import { CustomInput, InputWithButton } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { useChangeEmailUserConfirm, useChangeEmailUserTokenRequest } from "@/services/user-setting";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";

/**
 * change email popover used in user panel account settings panel
 * @constructor
 */
function ChangeEmailDialog() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();
  //entered Email
  const [email,setEmail] = useState('')

  //entered token
  const [token , setToken] = useState('')

  const {showError} = useErrorToast()
  const {showSuccess} = useSuccessToast()

  const {data:TokenReqData,mutate:TokenReqMutate,isSuccess:TokenReqIsSuccess,isError:TokenReqIsError} =useChangeEmailUserTokenRequest()

  //confirm email change token
  const {mutate:ConfirmEmailTokenMutate,isSuccess:ConformTokenIsSuccess,isError:ConfirmTokenIsError} =useChangeEmailUserConfirm()

  //sending token to the email
  const handleSentToken = ()=>{
    if(!email) return
    TokenReqMutate({email})
  }

  //show toasts
  useEffect(() => {
    TokenReqIsSuccess && showSuccess('code is sent to your Email')
    TokenReqIsError && showError('could not send code')
  }, [TokenReqIsSuccess,TokenReqIsError]);


  useEffect(() => {
    ConformTokenIsSuccess && showSuccess('email is change')
    ConfirmTokenIsError && showError('could change the email')
  }, [ConformTokenIsSuccess,ConfirmTokenIsError]);



  //form submit handler
  //TODO: implement
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    ConfirmEmailTokenMutate({email,token})
  };

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={userPanelDictionary.account_edit_button_label}
      title={userPanelDictionary.change_email_title}
    >
      <CustomInput
        placeholder={userPanelDictionary.email_input_placeholder}
        rootClassName="mb-2"
        type="email"
        // value={formValues.oldPass}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <InputWithButton
        btnTitle={userPanelDictionary.change_email_send_code_button_label}
        btnVariant="outline"
        btnClassName="text-primary"
        onChange={(e)=>setToken(e.target.value)}
        handleClickButton={handleSentToken}

      />
    </SettingsDialog>
  );
}

export default ChangeEmailDialog;
