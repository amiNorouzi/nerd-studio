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
export function ForgetPassPage() {
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const { showFetchError } = useErrorToast();
  const { showSuccess } = useSuccessToast();
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

  const {
    page: { login, forget_pass },
    components: { form },
  } = useGetDictionary();

  const handleForgotPass = async (data: FormTypes) => {
    try {
      await forgotPassApi(data);
      setShowEmailConfirmation(true);
      showSuccess("Reset password link sent to your email");
    } catch (e) {
      console.log(e);
      showFetchError(e);
    }
  };

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
