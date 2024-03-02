"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiMail, CiLock } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField, GoogleSignInButton } from "@/components/shared";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

interface FormTypes {
  userName: string;
  password: string;
}
export function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const {
    common,
    page: { login },
  } = useGetDictionary();
  return (
    <section className=" z-50 flex w-full flex-col items-center justify-center gap-8 p-3">
      <form
        onSubmit={handleSubmit(data => console.log(data))}
        className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
      >
        <h2 className="text-center text-lg font-bold">Welcome back!</h2>
        <div className="grid grid-cols-1 items-start gap-2">
          <Label htmlFor="userName">User Name</Label>

          <FormField
            control={control}
            autoFocus
            id="userName"
            name="userName"
            type="text"
            className="relative"
            inputClass="ps-8 h-[40px]"
            placeholder="Enter your email or username"
            rules={{ required: "User name required!" }}
          >
            <CiMail
              className={cn(
                "absolute start-2 top-[20px] -translate-y-1/2 text-muted-foreground",
                errors.userName && "text-destructive",
              )}
              size={20}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 items-start gap-2">
          <Label htmlFor="password">Password</Label>
          <FormField
            control={control}
            id="password"
            name={"password"}
            type="password"
            placeholder="Enter password"
            className="relative "
            inputClass="ps-8 pe-[120px] h-[40px]"
            rules={{
              required: "Password required!",
              minLength: {
                value: 8,
                message: "Password must be 8 characters or longer! ",
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
                Forget Password?
              </Button>
            </Link>
          </FormField>
        </div>
        <Button
          type="submit"
          className="h-[50px] w-full text-sm font-extrabold"
        >
          Log In
        </Button>
        <span className="text-center">or</span>
        <GoogleSignInButton />
      </form>
      <div className="text-white">
        {"Don't have an account? "}
        <Link href="signup" className="underline">
          Sing up
        </Link>
      </div>
    </section>
  );
}
