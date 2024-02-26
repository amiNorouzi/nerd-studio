"use client";
import Link from "next/link";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { CiMail, CiLock } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import "../login.css";

interface FormTypes {
  fullName: string;
  Email: string;
  password: string;
  acceptReceiveEmail: boolean;
  acceptPolicy: boolean;
}
export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormTypes>({
    defaultValues: {
      fullName: "",
      Email: "",
      password: "",
      acceptPolicy: false,
      acceptReceiveEmail: false,
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
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
        <div className="flex items-center justify-start gap-2">
          <span>{`Already playing with ClickUp?`}</span>
          <Link href="login">
            <Button size="lg" className="font-semibold ">
              Login
            </Button>
          </Link>
        </div>
      </header>
      <section className=" flex w-full  flex-col items-center justify-center gap-8">
        <form
          onSubmit={handleSubmit(data => console.log(data))}
          className={
            "flex h-fit w-[480px]  flex-col   gap-5 rounded p-5 shadow"
          }
        >
          <h2 className="text-center text-lg font-bold">{"Let's go!"}</h2>
          <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="fullName">User Name</Label>

            <FormField
              control={control}
              autoFocus
              id="fullName"
              name="fullName"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder="Enter your email or username"
              rules={{ required: "Full name required" }}
            >
              <GoPerson
                className={cn(
                  "absolute start-2 top-[20px] -translate-y-1/2 text-muted-foreground",
                  errors.fullName && "text-destructive",
                )}
                size={20}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="Email">User Name</Label>

            <FormField
              control={control}
              autoFocus
              id="Email"
              name="Email"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder="Enter your email or username"
              rules={{ required: "Full name required" }}
            >
              <CiMail
                className={cn(
                  "absolute start-2 top-[20px] -translate-y-1/2 text-muted-foreground",
                  errors.Email && "text-destructive",
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
              type={showPass ? "text" : "password"}
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

              <Button
                variant="ghost"
                className="absolute end-1 top-[20px] z-50 -translate-y-1/2  p-1 text-primary hover:bg-inherit hover:text-primary hover:underline hover:decoration-dotted"
                onClick={() => setShowPass(!showPass)}
              >
                Show
              </Button>
            </FormField>
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              name={"acceptReceiveEmail"}
              control={control}
              render={({ field }) => (
                <Checkbox
                  id={"receivedEmail"}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label
              htmlFor="receivedEmail"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By checking this box, you agree to receive emails for marketing
              from ClickUp
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name={"acceptPolicy"}
              control={control}
              // rules={{
              //   required:
              //     "You must accept the policies in order to use ClickUp.",
              // }}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label
              htmlFor="terms"
              className="text-xs  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <Button type="submit" className={"w-full"}>
            Sign Up
          </Button>
        </form>
      </section>
    </div>
  );
}
