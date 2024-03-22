import { useState } from "react";

import { useForm } from "react-hook-form";

import useErrorToast from "@/hooks/useErrorToast";

import { signupApi } from "@/services/authentication-services";

export interface FormTypes {
  fullName: string;
  email: string;
  password: string;
  acceptReceiveEmail: boolean;
  acceptPolicy: boolean;
}

export function useSignup() {
  const { showFetchError } = useErrorToast();
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const form = useForm<FormTypes>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptPolicy: false,
      acceptReceiveEmail: false,
    },
  });

  const handleSignup = async (data: FormTypes) => {
    const { password, email, fullName } = data;
    try {
      const { data } = await signupApi({
        password,
        email,
        username: fullName,
      });
      console.log(data);
      setShowEmailConfirmation(true);
    } catch (e) {
      console.log(e);
      showFetchError(e);
    }
  };

  return {
    form,
    handleSignup,
    setShowEmailConfirmation,
    showEmailConfirmation,
  };
}
