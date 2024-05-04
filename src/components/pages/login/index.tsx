"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { CiLock, CiMail } from "react-icons/ci";
import { TbEye, TbEyeClosed } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FormField,
  GoogleSignInButton,
  MinimalButton,
} from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";

import { cn } from "@/lib/utils";

interface FormTypes {
  email: string;
  password: string;
}

/**
 * `LoginPage` is a React component that handles the login process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses custom hooks `useErrorToast` and `useSuccessToast` to display error and success messages respectively.
 * It uses `useRouter` from `next/navigation` to navigate between pages.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @returns The rendered login page.
 */
export default function LoginPage() {
  // Use `useState` to manage the state of password visibility.
  const [showPass, setShowPass] = useState(false);

  // Use the custom hook `useErrorToast` to get the `showError` function.
  const { showError } = useErrorToast();
  // Use the custom hook `useSuccessToast` to get the `showSuccess` function.
  const { showSuccess } = useSuccessToast();

  // Use `useRouter` from `next/navigation` to navigate between pages.
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    common,
    page: { login, signup },
    components: { form },
  } = useGetDictionary();

  /**
   * `handleLogin` is an async function that handles the login process.
   * It takes the form data as an argument, sends a request to the login API,
   * and navigates to the home page if the request is successful.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleLogin = async (data: FormTypes) => {
    setIsPending(true);
    const res = await signIn("login-credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });

    if (!!res) {
      if (res.ok) {
        router.push("/dashboard");
        showSuccess("Logged in successfully");
      } else {
        showError(res.error!);
        setIsPending(false);
      }
    }
  };

  // Render the login page.
  return (
    <section className=" z-50 flex w-full flex-col items-center justify-center gap-6">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex h-fit w-full max-w-[380px] flex-col gap-5 rounded-xl bg-white shadow-2xl p-8"
      >
        <h2 className="text-center text-lg font-bold">{login.welcome}</h2>
        <div className="col items-start gap-2">
          <Label htmlFor="email">{login.email_label}</Label>
          <FormField
            control={control}
            autoFocus
            id="email"
            name="email"
            type="email"
            className="relative"
            inputClass="ps-8 h-[40px]"
            placeholder={login.email_placeholder}
            rules={{ required: login.email_error_message }}
          >
            <CiMail
              className={cn(
                "absolute start-2 top-[20px] -translate-y-1/2 text-muted-foreground",
                errors.email && "text-destructive",
              )}
              size={18}
            />
          </FormField>
        </div>
        <div className="col items-start gap-2">
          <Label htmlFor="password">{common.password}</Label>
          <FormField
            control={control}
            id="password"
            name={"password"}
            type={showPass ? "text" : "password"}
            placeholder={login.pass_placeholder}
            className="relative "
            inputClass="ps-8 pe-[120px] h-[40px]"
            rules={{
              required: form.pass_error1,
              minLength: {
                value: 8,
                message: form.pass_error2,
              },
            }}
          >
            <CiLock
              className={cn(
                "absolute start-2 top-[20px] -translate-y-1/2 text-muted-foreground",
                errors.password && "text-destructive",
              )}
              size={20}
            />
            <MinimalButton
              Icon={showPass ? TbEyeClosed : TbEye}
              onClick={e => setShowPass(!showPass)}
              type="button"
              className="absolute end-1 top-[20px] z-50 -translate-y-1/2  p-1 text-primary"
              iconClassname="h-5 w-5"
              title={showPass ? form.hide_pass : form.show_pass}
            />
          </FormField>
          <Link href="login/forget" className="-mt-2 ms-auto">
            <Button variant="link" className="fit p-0">
              {login.forget_pass}
            </Button>
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          isPending={isPending}
        >
          {login.login}
        </Button>

        <GoogleSignInButton />
      </form>
      <div className="text-white">
        {login.dont_have_account + " "}
        <Link href="signup" className="underline">
          {signup.signup}
        </Link>
      </div>
    </section>
  );
}
