"use client";
import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared";
import { Button } from "@/components/ui/button";
import ConfirmEmailMessage from "@/components/shared/ConfirmEmailMessage";

import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import useSuccessToast from "@/hooks/useSuccessToast";

import { cn } from "@/lib/utils";
import { forgotPassApi } from "@/services/authentication-services";

interface FormTypes {
  email: string;
}
/**
 * `ForgetPassPage` is a React component that handles the password reset process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 *
 * @returns The rendered password reset page.
 */
export default function ForgetPassPage() {
  // Use `useState` to manage the state of email confirmation for showing the email confirmation message.
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();
  // Use the custom hook `useSuccessToast` to get the `showSuccess` function.
  const { showSuccess } = useSuccessToast();

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormTypes>({
    defaultValues: {
      email: "",
    },
  });

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    page: { login, forget_pass },
    components: { form },
  } = useGetDictionary();

  /**
   * `handleForgotPass` is an async function that handles the password reset process.
   * It takes the form data as an argument, sends a request to the password reset API,
   * and updates the email confirmation state based on the response.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleForgotPass = async (data: FormTypes) => {
    try {
      // Send a request to the password reset API with the form data.
      await forgotPassApi(data);

      // If the request is successful, update the email confirmation state to true
      // and show a success message.
      setShowEmailConfirmation(true);
      showSuccess("Reset password link sent to your email");
    } catch (e) {
      console.log(e);

      // If the request fails, show an error message.
      showFetchError(e);
    }
  };

  // Render the password reset page.

  return (
    <>
      <section
        className=" z-50 flex w-full flex-col items-center justify-center gap-8 p-3"
        style={{ display: showEmailConfirmation ? "none" : "flex" }}
      >
        <form
          onSubmit={handleSubmit(handleForgotPass)}
          className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
        >
          <h2 className="text-center text-lg font-bold">{login.welcome}</h2>
          <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="Email">{form.email}</Label>

            <FormField
              control={control}
              id="Email"
              name="email"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder={form.email_placeholder2}
              rules={{ required: form.email_error_message }}
            >
              <CiMail
                className={cn(
                  "absolute start-2 top-[20px] -translate-y-1/2 text-muted-foreground",
                  errors.email && "text-destructive",
                )}
                size={20}
              />
            </FormField>
          </div>
          <Button
            type="submit"
            className="h-14 w-full text-sm font-extrabold"
            disabled={isSubmitting}
          >
            {forget_pass.send_me_link}
          </Button>
          <Link
            href="/login"
            className="text-center text-xs text-primary underline decoration-dotted"
          >
            {forget_pass.or_sign_in}
          </Link>
        </form>
        <div className="text-white">
          {login.dont_have_account + " "}
          <Link href="/signup" className="underline">
            {login.signup}
          </Link>
        </div>
      </section>
      <ConfirmEmailMessage
        handleBack={() => setShowEmailConfirmation(false)}
        email={getValues().email}
        resendEmail={() => handleForgotPass(getValues())}
        rootClassName={showEmailConfirmation ? "flex" : "!hidden"}
        isForgotPas
      />
    </>
  );
}
