"use client";
import { useToggle } from "usehooks-ts";

import { Stars } from "@/components/svg-icons";
import { Button } from "@/components/ui/button";
import { Collapsible, DescriptionHoverCard } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Plans from "./Plans";
import UpgradeDetailsProgress from "./UpgradeDetailsProgress";
import CollapsibleToggle from "./CollapsibleToggle";

import { useGetDictionary } from "@/hooks";

import type { StateSetterType } from "@/services/types";

/**
 * upgrade panel in user panel dialog
 * show current plan and upgrade options
 * @param setActiveMenu - set active menu in user panel
 * @constructor
 */
function Upgrade({
  setActiveMenu,
}: {
  setActiveMenu: StateSetterType<string>;
}) {
  const {
    common: { free },
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();
  const [isDetailOpen, toggleDetailOpen] = useToggle(false);

  return (
    <div className="col">
      {/*
        about upgrade
        bg-gradiant is a custom class for background gradiant in global css
       */}
      <div className="bg-gradiant mb-4 flex rounded-md px-4 py-2">
        <Stars />
        <div className="text-gradiant">
          {userPanelDictionary.upgrade_header_text}
          <Button
            variant="link"
            className="fit ms-1 rounded-none border-b border-primary p-0"
          >
            {userPanelDictionary.learn_more_button_label}
          </Button>
        </div>
      </div>

      {/*user active plan information`*/}
      <div className="mb-4 flex gap-2">
        <div className="col w-full rounded-md border px-5 py-4">
          <div className="row">
            <p className="me-1">{userPanelDictionary.plan_credit_title}</p>
            <DescriptionHoverCard
              description={userPanelDictionary.plan_credit_description}
            />
            <CollapsibleToggle
              isOpen={isDetailOpen}
              handleToggle={toggleDetailOpen}
            />
          </div>
          <p className="mb-2 text-2xl font-bold">67.66</p>

          {/*faq about credit*/}
          <Accordion type="single" collapsible className="mb-2 w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                📌 {userPanelDictionary.plan_credit_accordion_summery}
              </AccordionTrigger>
              <AccordionContent className="font-normal text-muted-foreground">
                {userPanelDictionary.plan_credit_accordion_description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/*
            progress of credit
            progress bar for gratis and plan
          */}
          <Collapsible isOpen={isDetailOpen} className="col gap-3">
            <UpgradeDetailsProgress
              title={userPanelDictionary.gratis_progress_label}
              availableAmount={37.66}
              totalAmount={100.0}
              progress={38}
            />
            <UpgradeDetailsProgress
              title={userPanelDictionary.plan_progress_label}
              description={userPanelDictionary.plan_progress_description}
              availableAmount={10.66}
              totalAmount={30.0}
              progress={11}
            />
          </Collapsible>

          <div className="row mt-4 gap-3">
            {/*go to user transaction panel*/}
            <Button
              onClick={() => setActiveMenu("transactions")}
              variant="ghost"
              className="fit p-0 hover:bg-transparent hover:text-primary"
            >
              {userPanelDictionary.transaction_button_label}
            </Button>
            <Button
              variant="ghost"
              className="fit p-0 hover:bg-transparent hover:text-primary"
            >
              {userPanelDictionary.redeem_button_label}
            </Button>
          </div>
        </div>

        <div className="col min-w-60 rounded-md border px-5 py-4 ">
          <div className="row mb-2">
            <p>{userPanelDictionary.plan_info_title}</p>
            <CollapsibleToggle
              isOpen={isDetailOpen}
              handleToggle={toggleDetailOpen}
            />
          </div>

          {/*current plan*/}
          <p className="border-b pb-4 text-[15px]">{free}</p>

          {/*
            next payment date and amount
            show next payment date and amount
          */}
          <Collapsible isOpen={isDetailOpen} className="col gap-3">
            <p className="mt-4 text-xs font-normal text-muted-foreground">
              {userPanelDictionary.next_payment_date_title}
              <br />-
            </p>
            <p className="text-xs font-normal text-muted-foreground">
              {userPanelDictionary.next_payment_amount_title}
              <br />-
            </p>
          </Collapsible>

          <div className="row ms-auto mt-auto justify-end gap-1">
            <Button variant="muted" className="fit px-1.5 py-1 text-xs">
              {userPanelDictionary.invoices_button_label}
            </Button>
            <Button variant="muted" className="fit px-1.5 py-1 text-xs">
              {userPanelDictionary.manage_button_label}
            </Button>
          </div>
        </div>
      </div>

      {/*plans*/}
      <Plans />
    </div>
  );
}

export default Upgrade;
