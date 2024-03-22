"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { FcFeedback } from "react-icons/fc";

import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";

interface IProps {
  email: string;
  token: string;
}

/**
 * component for complete email verification process
 * @param email email from search params
 * @param token from search params
 * @constructor
 */
function SignupConfirm({ email, token }: IProps) {
  const { showFetchError } = useErrorToast();
  const router = useRouter();
  const {
    page: { signup: signupDictionary },
  } = useGetDictionary();

  useEffect(() => {
    const confirmSignup = async () => {
      try {
        await signIn("signup-confirm-credentials", {
          redirect: false,
          email,
          token,
          callbackUrl: "/",
        });
        router.push("/");
      } catch (e) {
        showFetchError(e);
      }
    };
    confirmSignup();
  }, []);
  return (
    <div className="col items-center justify-center gap-5">
      <div className="col z-10 h-fit w-full max-w-[480px] items-center gap-4 rounded-xl bg-white p-5 shadow-2xl sm:px-16 sm:py-10">
        {/*<Loading svgClass="h-20 w-20" />*/}
        <FcFeedback size={60} className="animate-bounce" />
        <h1 className="text-xl font-semibold">
          {signupDictionary.email_verification_title}
        </h1>
        <p className="text-center font-normal text-muted-foreground">
          {signupDictionary.email_verification_message}
        </p>
      </div>
    </div>
  );
}

export default SignupConfirm;
