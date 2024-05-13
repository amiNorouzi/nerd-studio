"use client";

import SimpleTextArea from "./simple-textarea";
import { useForm, Controller } from "react-hook-form";
import { useSendDataContactUs } from "@/services/static-pages/contact-us";
import { z } from "zod";
import { CustumInput } from "./custum-input";

export const FormSectionContactUs = () => {
  const { mutateAsync, isPending, isSuccess } = useSendDataContactUs();
  const { control, handleSubmit } = useForm();
  const contactSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(1, { message: "Message is required" }),
  });

  const onSubmitData = async (data: any) => {

    const validationResult = contactSchema.safeParse(data);

    if (validationResult.success) {
      await mutateAsync(data);
      if (isSuccess) {
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitData)}
      className=" w-full space-y-6 px-8"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => {
          return (
            <CustumInput
              labale={"Name"}
              placeholder={"text"}
              type={"text"}
              {...field}
            />
          );
        }}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <CustumInput
              labale={"Email"}
              placeholder={"text"}
              type={"email"}
              {...field}
            />
          );
        }}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => {
          return (
            <SimpleTextArea
              labale={"Message"}
              placeholder="placeholder"
              maxLength={400}
              {...field}
            />
          );
        }}
      />

      <button
        type="submit"
        disabled={isPending ? true : false}
        className={` w-full rounded-xl bg-[#9373EE] px-3 py-4 text-base text-white disabled:bg-purple-200`}
      >
        send
      </button>
      <div className="w-full fixed left-0 top-[10vh] bg-red-200"></div>
    </form>
  );
};
