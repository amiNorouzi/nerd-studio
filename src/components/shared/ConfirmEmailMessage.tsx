"use client";
import { FcFeedback } from "react-icons/fc";
import { TbArrowLeft } from "react-icons/tb";

import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";

interface IProps {
  handleBack: () => void;
  email: string;
  resendEmail: () => void;
  rootClassName?: string;
  isForgotPas?: boolean;
}

function ConfirmEmailMessage({
  handleBack,
  email,
  resendEmail,
  rootClassName,
  isForgotPas = false,
}: IProps) {
  const {
    components: { confirm_email: dictionary },
  } = useGetDictionary();

  return (
    <div
      className={cn("centered-col z-50 flex w-full gap-8 p-3", rootClassName)}
    >
      <div className="col relative h-fit w-full max-w-[480px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div
          className="relative h-24 w-full  bg-primary-light after:absolute after:inset-x-0
       after:-bottom-5 after:h-14 after:rounded-[50%] after:bg-primary-light"
        >
          <div className="centered-col absolute -bottom-14 left-1/2 z-10 h-20 w-20 -translate-x-1/2 rounded-full border-2 border-white bg-primary">
            <FcFeedback size={50} className="z-20" />
          </div>

          <Button
            variant="ghost"
            className="fit absolute start-3 top-2 p-1"
            onClick={handleBack}
          >
            <TbArrowLeft size={20} />
          </Button>
        </div>
        <div className=" col gap-3 p-5 pt-16 sm:px-16 sm:pb-10">
          <h1 className="text-center text-xl font-bold">{dictionary.title}</h1>
          <p className="text-center text-muted-foreground">
            {dictionary.description_part1}{" "}
            <span className="text-primary">{email}</span>{" "}
            {dictionary.description_part2}{" "}
            {isForgotPas
              ? dictionary.forgot_complete_message
              : dictionary.signup_complete_message}
          </p>

          <div className="centered-row mt-5 gap-2 border-t p-2">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="font-normal text-muted-foreground">
              {dictionary.link_message}
            </p>
            <Button variant="link" className="fit p-0" onClick={resendEmail}>
              {dictionary.send_button_label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmailMessage;
