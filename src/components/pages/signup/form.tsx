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
import { useGetDictionary } from "@/hooks";

interface FormTypes {
  fullName: string;
  Email: string;
  password: string;
  acceptReceiveEmail: boolean;
  acceptPolicy: boolean;
}
export function Form() {
  const [showPass, setShowPass] = useState(false);
  const {
    components: { form: formLang },
    page: { signup },
    common,
  } = useGetDictionary();
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
          <h2 className="text-center text-lg font-bold">
            {signup.form_header}
          </h2>
          <div className="grid grid-cols-1 items-start gap-2">
            <Label htmlFor="fullName">{formLang.full_name}</Label>

            <FormField
              control={control}
              autoFocus
              id="fullName"
              name="fullName"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder={formLang.full_name_placeholder}
              rules={{
                required: formLang.full_name_error_message,
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
            <Label htmlFor="Email">{formLang.email}</Label>

            <FormField
              control={control}
              id="Email"
              name="Email"
              type="text"
              className="relative"
              inputClass="ps-8 h-[40px]"
              placeholder={formLang.email_placeholder}
              rules={{ required: formLang.email_error_message }}
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
            <Label htmlFor="password">{formLang.choose_pass}</Label>
            <FormField
              control={control}
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              placeholder={formLang.pass_placeholder}
              className="relative "
              inputClass="ps-8 pe-[120px] h-[40px]"
              rules={{
                required: formLang.pass_error1,
                minLength: {
                  value: 8,
                  message: formLang.pass_error2,
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
                {formLang.show_pass}
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
                  <FormLabel>{formLang.accept_receive_email_label}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormInputField
            control={control}
            name="acceptPolicy"
            rules={{
              required: formLang.accept_policy_error,
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
                    {formLang.accept_policy_description1}{" "}
                    <Link href="#" className="underline">
                      {common.terms_of_service}
                    </Link>{" "}
                    {common.and}{" "}
                    <Link href="#" className="underline">
                      {common.privacy_policy}
                    </Link>
                    {formLang.accept_policy_description2}
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="h-14 w-full text-sm font-extrabold">
            {signup.signup}
          </Button>

          <GoogleSignInButton />
        </form>
      </FormProvider>
    </section>
  );
}
