"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiMail, CiLock } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField, GoogleSignInButton } from "@/components/shared";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { signIn } from "next-auth/react";

interface FormTypes {
  email: string;
  password: string;
}
export function LoginPage() {
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

  const {
    common,
    page: { login, signup },
    components: { form },
  } = useGetDictionary();

  const handleLogin = async (data: FormTypes) => {
    await signIn("login-credentials", {
      redirect: false,
      fullName: null,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <section className=" z-50 flex w-full flex-col items-center justify-center gap-8 p-3">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
      >
        <h2 className="text-center text-lg font-bold">{login.welcome}</h2>
        <div className="grid grid-cols-1 items-start gap-2">
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
              size={20}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 items-start gap-2">
          <Label htmlFor="password">{common.password}</Label>
          <FormField
            control={control}
            id="password"
            name={"password"}
            type="password"
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
            <Link
              href="login/forget"
              className="absolute end-1 top-[20px] z-50 -translate-y-1/2 "
            >
              <Button
                variant="ghost"
                className="h-14 p-1 text-primary hover:bg-inherit hover:text-primary hover:underline hover:decoration-dotted"
              >
                {login.forget_pass}
              </Button>
            </Link>
          </FormField>
        </div>
        <Button
          type="submit"
          className="h-[50px] w-full text-sm font-extrabold"
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
