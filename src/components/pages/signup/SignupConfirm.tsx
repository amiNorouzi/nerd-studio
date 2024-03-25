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
 * `SignupConfirm` is a React component that handles the signup confirmation process.
 * It uses the `useEffect` hook from React to perform the signup confirmation when the component is mounted.
 * It uses the `useRouter` hook from `next/navigation` to navigate between pages.
 * It uses the `signIn` function from `next-auth/react` to confirm the signup.
 * It uses a custom hook `useErrorToast` to display error messages.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @param {Object} props - The props object.
 * @param {string} props.email - The email of the user.
 * @param {string} props.token - The token for signup confirmation.
 *
 * @returns {JSX.Element} The rendered signup confirmation page.
 */
function SignupConfirm({ email, token }: IProps) {
  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();

  // Use `useRouter` from `next/navigation` to navigate between pages.
  const router = useRouter();

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    page: { signup: signupDictionary },
  } = useGetDictionary();

  // Use `useEffect` to perform the signup confirmation when the component is mounted.
  useEffect(() => {
    /**
     * `confirmSignup` is an async function that handles the signup confirmation process.
     * It sends a request to the signup confirmation API with the email and token,
     * and navigates to the home page if the request is successful.
     */
    const confirmSignup = async () => {
      try {
        // Send a request to the signup confirmation API with the email and token.
        await signIn("signup-confirm-credentials", {
          redirect: false,
          email,
          token,
          callbackUrl: "/",
        });

        // If the request is successful, navigate to the home page.
        router.push("/");
      } catch (e) {
        // If the request fails, show an error message.
        showFetchError(e);
      }
    };
    confirmSignup();
  }, []);

  // Render the signup confirmation page.
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
