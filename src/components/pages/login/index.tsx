"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiMail, CiLock } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FormField,
  GoogleSignInButton,
  MinimalButton,
} from "@/components/shared";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { signIn } from "next-auth/react";
import useErrorToast from "@/hooks/useErrorToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import useSuccessToast from "@/hooks/useSuccessToast";

interface FormTypes {
  email: string;
  password: string;
}
export function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const { showError } = useErrorToast();
  const { showSuccess } = useSuccessToast();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    const res = await signIn("login-credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (!!res) {
      if (res.ok) {
        router.push("/");
        showSuccess("Logged in successfully");
      } else {
        showError(res.error!);
      }
    }
  };

  return (
    <section className=" z-50 flex w-full flex-col items-center justify-center gap-8 p-3">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded-xl bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
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
              size={20}
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
          disabled={isSubmitting}
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
