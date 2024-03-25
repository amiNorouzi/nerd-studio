"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { TbEye, TbEyeClosed } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField, MinimalButton } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import useErrorToast from "@/hooks/useErrorToast";

import { cn } from "@/lib/utils";
import { setNewPassApi } from "@/services/authentication-services";

interface FormTypes {
  new_password: string;
  confirm_password: string;
}

interface IProps {
  email: string;
  token: string;
}

/**
 * `NewPassPage` is a React component that handles the password reset process.
 * It uses the `react-hook-form` for form handling and validation, and `useState` for local state management.
 * It also uses a custom hook `useErrorToast` to display error messages.
 * It uses `useGetDictionary` to get the localized strings for the page.
 *
 * @param {Object} props - The props object.
 * @param {string} props.email - The email of the user from search params.
 * @param {string} props.token - The token for password reset from search params.
 *
 * @returns {JSX.Element} The rendered password reset page.
 */
export function NewPassPage({ email, token }: IProps) {
  // Use `useState` to manage the state of password visibility.
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  // Use the custom hook `useErrorToast` to get the `showFetchError` function.
  const { showFetchError } = useErrorToast();

  // Use `useRouter` from `next/navigation` to navigate between pages.
  const router = useRouter();

  // Use `useForm` from `react-hook-form` to manage the form state and validation.
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormTypes>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  // Use `useGetDictionary` to get the localized strings for the page.
  const {
    common: { save_label },
    page: { forget_pass: dictionary },
    components: { form },
  } = useGetDictionary();

  /**
   * `handleSetNewPass` is an async function that handles the password reset process.
   * It takes the form data as an argument, sends a request to the password reset API,
   * and navigates to the login page if the request is successful.
   *
   * @param {FormTypes} data - The form data.
   */
  const handleSetNewPass = async (data: FormTypes) => {
    try {
      // Send a request to the password reset API with the form data, email, and token.
      await setNewPassApi({
        ...data,
        token,
        email,
      });

      // If the request is successful, navigate to the login page.
      router.push("/login");
    } catch (e) {
      // If the request fails, show an error message.
      showFetchError(e);
    }
  };

  // Render the password reset page.
  return (
    <section className=" z-50 flex w-full flex-col items-center justify-center gap-8 p-3">
      <form
        onSubmit={handleSubmit(handleSetNewPass)}
        className="flex h-fit w-full max-w-[480px] flex-col gap-5 rounded-xl bg-white p-5 shadow-2xl sm:px-16 sm:py-10"
      >
        <h2 className="text-center text-lg font-bold">
          {dictionary.reset_pass_title}
        </h2>
        <div className="col items-start gap-2">
          <Label htmlFor="new-password">{dictionary.new_pass_label}</Label>
          <FormField
            control={control}
            id="new-password"
            name="new_password"
            type={showPass ? "text" : "password"}
            placeholder={dictionary.new_pass_placeholder}
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
                errors.new_password && "text-destructive",
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
        </div>

        <div className="col items-start gap-2">
          <Label htmlFor="confirm-password">
            {dictionary.confirm_pass_label}
          </Label>
          <FormField
            control={control}
            id="confirm-password"
            name="confirm_password"
            type={showConfPass ? "text" : "password"}
            placeholder={dictionary.confirm_pass_placeholder}
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
                errors.confirm_password && "text-destructive",
              )}
              size={20}
            />
            <MinimalButton
              Icon={showConfPass ? TbEyeClosed : TbEye}
              onClick={e => setShowConfPass(!showConfPass)}
              type="button"
              className="absolute end-1 top-[20px] z-50 -translate-y-1/2  p-1 text-primary"
              iconClassname="h-5 w-5"
              title={showConfPass ? form.hide_pass : form.show_pass}
            />
          </FormField>
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="h-[50px] w-full text-sm font-extrabold"
        >
          {save_label}
        </Button>
      </form>
    </section>
  );
}
