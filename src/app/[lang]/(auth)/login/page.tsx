"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { CiMail, CiLock } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared";
import "../login.css";
import { cn } from "@/lib/utils";

interface FormTypes {
  userName: string;
  password: string;
}
export default function Login() {
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

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <header className="flex w-full p-8">
        <div className="me-auto flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="nerd"
            width={80}
            height={80}
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold">Nerd Studio</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>{`Don't have an account?`}</span>
          <Link href="signup">
            <Button size="lg" className="font-semibold ">
              Sign up
            </Button>
          </Link>
        </div>
      </header>
      <section className=" flex w-full  flex-col items-center justify-center gap-8">
        <form
          onSubmit={handleSubmit(data => console.log(data))}
          className={
            "flex h-[437px] w-[480px]  flex-col   gap-5 rounded px-16 py-10 shadow"
          }
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
              rules={{ required: "User name required" }}
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
              autoFocus
              id="password"
              name={"password"}
              type="password"
              placeholder="Enter password"
              className="relative "
              inputClass="ps-8 pe-[120px] h-[40px]"
              rules={{
                required: "Password is required",
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
                href="forget-password"
                className="absolute end-1 top-[20px] z-50 -translate-y-1/2 "
              >
                <Button
                  variant="ghost"
                  className="h-[50px] p-1 text-primary hover:bg-inherit hover:text-primary hover:underline hover:decoration-dotted"
                >
                  Forget Password?
                </Button>
              </Link>
            </FormField>
          </div>
          <Button type="submit" className={"w-full"}>
            Log In
          </Button>
        </form>
        <div>
          {"Don't have an account? "}
          <Link href="signup" className="underline">
            Sing up
          </Link>
        </div>
      </section>
      <footer>
        <span className="text-xs">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </span>
      </footer>
    </div>
  );
}
