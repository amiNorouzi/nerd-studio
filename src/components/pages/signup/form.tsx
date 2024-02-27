"use client";
import { useState } from "react";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { useForm } from "react-hook-form";
import { CiLock, CiMail } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import { FormField, GoogleSignInButton } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form as FormProvider,
  FormControl,
  FormField as FormInputField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

interface FormTypes {
  fullName: string;
  Email: string;
  password: string;
  acceptReceiveEmail: boolean;
  acceptPolicy: boolean;
}
export function Form() {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<FormTypes>({
    defaultValues: {
      fullName: "",
      Email: "",
      password: "",
      acceptPolicy: false,
      acceptReceiveEmail: false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <section className="z-50 flex w-full  flex-col items-center justify-center gap-8 p-3">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(data => console.log(data))}
          className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
        >
          <h2 className="text-center text-lg font-bold">{"Let's go!"}</h2>
          <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="fullName">Full Name</Label>

            <FormField
              control={control}
              autoFocus
              id="fullName"
              name="fullName"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder="John Doe"
              rules={{
                required: "Full name required!",
                minLength: {
                  value: 8,
                  message: "this field must be more than 8 character",
                },
              }}
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
            <Label htmlFor="Email">Email</Label>

            <FormField
              control={control}
              id="Email"
              name="Email"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder="example@site.com"
              rules={{ required: "Email required!" }}
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
            <Label htmlFor="password">Choose Password</Label>
            <FormField
              control={control}
              id="password"
              name={"password"}
              type={showPass ? "text" : "password"}
              placeholder="Minimum 8 characters"
              className="relative "
              inputClass="ps-8 pe-[120px] h-[40px]"
              rules={{
                required: "Password  required!",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters or longer!",
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

          <FormInputField
            control={control}
            name="acceptReceiveEmail"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="text-xs font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <FormLabel>
                    By checking this box, you agree to receive emails for
                    marketing from Nerd Studio
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormInputField
            control={control}
            name="acceptPolicy"
            rules={{
              required:
                "You must accept the policies in order to use Nerd Studio.",
            }}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="text-xs font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <FormLabel>
                    By checking this box, you agree to out{" "}
                    <Link href="#" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="underline">
                      Privacy Policy
                    </Link>
                    , and consent to data transfer, hosting, and processing
                    outside of the.
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="h-14 w-full text-sm font-extrabold">
            Sign Up
          </Button>
          <span className="text-center">or</span>
          <GoogleSignInButton />
        </form>
      </FormProvider>
    </section>
  );
}
