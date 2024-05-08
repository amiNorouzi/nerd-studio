"use client";
import { GoArrowRight } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import ChangeReferralCodeDialog from "./ChangeReferralCodeDialog";
import { InputWithButton, MultiValueInput } from "@/components/forms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

import { SocialMedias } from "@/components/shared";
import { TbGift } from "react-icons/tb";

/**
 * component for referral and invite other user
 * used in user-panel dialog
 * @constructor
 */
export default function Referral() {
  const userPanelDictionary = useGetDictionary().components.user.panel;
  //for copy referral code and link
  const [handleCopy, isCopied, copiedVal] = useCopyTextInClipBoard();

  //TODO: replace with real data
  const link = "https://nerd/?r=qJGwqoEp";
  const code = "qwelfsvs";

  return (
    <div className="col">
      <div className="col overflow-hidden rounded-md border bg-popover">
        {/*hero*/}
        <div className="row bg-gradiant mb-2 gap-4 p-4">
          <TbGift />
          <div className="col gap-0.5">
            <h4 className="mb-1 text-base font-semibold">
              {userPanelDictionary.invite_user_header_title}
            </h4>
            <p className="font-normal">
              {userPanelDictionary.invite_user_header_description}
            </p>
            <Button variant="ghost" className="fit row gap-1 p-0 text-primary">
              {userPanelDictionary.invite_user_header_link}
              <GoArrowRight size="1rem" />
            </Button>
          </div>
        </div>

        {/*referral code and link*/}
        <div className="col gap-[3px] p-4">
          <h4>{userPanelDictionary.referral_code_title}</h4>
          <p className="font-normal text-muted-foreground">
            {userPanelDictionary.referral_code_description}
          </p>

          <div className="row group mb-4">
            <div className="h-8 w-28 rounded-s-md border bg-muted px-3 py-1.5 text-muted-foreground">
              qwelfsvs
            </div>
            <Button
              onClick={() => handleCopy(code)}
              variant="outline"
              className="h-full rounded-s-none bg-background px-2"
            >
              {isCopied && copiedVal === code ? (
                <LuCopyCheck size="1rem" />
              ) : (
                <LuCopy size="1rem" />
              )}
            </Button>

            <div className="opacity-0 transition-all duration-200 group-hover:opacity-100">
              <ChangeReferralCodeDialog />
            </div>
          </div>

          {/*referral link*/}
          <h4>{userPanelDictionary.referral_link_title}</h4>
          <div className="row mb-4">
            <InputWithButton
              btnTitle={
                isCopied && copiedVal === link
                  ? userPanelDictionary.referral_link_copied_button
                  : userPanelDictionary.referral_link_button
              }
              handleClickButton={() => handleCopy(link)}
              rootClassName="w-3/5 me-4"
              className="font-normal text-foreground/80"
              value={link}
            />
            <SocialMedias />
          </div>

          {/*referral email*/}
          <h4>{userPanelDictionary.referral_email_title}</h4>
          <MultiValueInput
            onValuesChange={() => {}}
            placeholder={userPanelDictionary.referral_email_description}
          />
          <Button className="ms-auto mt-1">
            <IoIosSend size="1rem" className="mr-1.5" />
            {userPanelDictionary.referral_email_button}
          </Button>
        </div>
      </div>

      {/*faq about referral and rewards*/}
      <h2 className=" mt-6 text-base">{userPanelDictionary.faq_title}</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {userPanelDictionary.first_faq_summery}
          </AccordionTrigger>
          <AccordionContent className="font-normal text-muted-foreground">
            {userPanelDictionary.first_faq_description}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {userPanelDictionary.second_faq_summery}
          </AccordionTrigger>
          <AccordionContent className="font-normal text-muted-foreground">
            {userPanelDictionary.second_faq_description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
