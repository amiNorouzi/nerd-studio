"use client";
import { useState } from "react";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import { CiLock, CiMail } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import {
  FormField,
  GoogleSignInButton,
  MinimalButton,
} from "@/components/shared";
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
import { useSignup } from "./hooks/useSignup";
import ConfirmEmailMessage from "@/components/shared/ConfirmEmailMessage";
import { TbEye, TbEyeClosed } from "react-icons/tb";

export function Form() {
  const [showPass, setShowPass] = useState(false);

  const {
    components: { form: formLang },
    page: { signup },
    common,
  } = useGetDictionary();
  const {
    form,
    handleSignup,
    setShowEmailConfirmation,
    showEmailConfirmation,
  } = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = form;

  return (
    <>
      <section
        className="z-50 w-full flex-col items-center justify-center gap-8 p-3"
        style={{ display: showEmailConfirmation ? "none" : "flex" }}
      >
        <FormProvider {...form}>
          <form
            method="post"
            onSubmit={handleSubmit(handleSignup)}
            className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded-xl bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
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
                name="email"
                type="text"
                className="relative"
                inputClass="ps-8 h-[40px]"
                placeholder={formLang.email_placeholder}
                rules={{ required: formLang.email_error_message }}
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

                <MinimalButton
                  Icon={showPass ? TbEyeClosed : TbEye}
                  onClick={e => setShowPass(!showPass)}
                  type="button"
                  className="absolute end-1 top-[20px] z-50 -translate-y-1/2  p-1 text-primary"
                  iconClassname="h-5 w-5"
                  title={showPass ? formLang.hide_pass : formLang.show_pass}
                />
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

            <Button
              type="submit"
              className="h-14 w-full text-sm font-extrabold"
              disabled={isSubmitting}
            >
              {signup.signup}
            </Button>

            <GoogleSignInButton />
          </form>
        </FormProvider>
      </section>
      <ConfirmEmailMessage
        handleBack={() => setShowEmailConfirmation(false)}
        email={getValues().email}
        resendEmail={() => handleSignup(getValues())}
        rootClassName={showEmailConfirmation ? "flex" : "!hidden"}
      />
    </>
  );
}
