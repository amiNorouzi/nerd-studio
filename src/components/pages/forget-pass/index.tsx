"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import { FormField } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

interface FormTypes {
  Email: string;
}
export function ForgetPassPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      Email: "",
    },
  });

  const {
    page: { login, forget_pass },
    components: { form },
  } = useGetDictionary();

  return (
    <section className=" z-50 flex w-full flex-col items-center justify-center gap-8 p-3">
      <form
        onSubmit={handleSubmit(data => console.log(data))}
        className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
      >
        <h2 className="text-center text-lg font-bold">{login.welcome}</h2>
        <div className="grid grid-cols-1 items-start gap-2">
          <Label htmlFor="Email">{form.email}</Label>

          <FormField
            control={control}
            id="Email"
            name="Email"
            type="text"
            className="relative"
            inputClass="ps-8 h-[40px]"
            placeholder={form.email_placeholder2}
            rules={{ required: form.email_error_message }}
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
        <Button type="submit" className="h-14 w-full text-sm font-extrabold">
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
  );
}
