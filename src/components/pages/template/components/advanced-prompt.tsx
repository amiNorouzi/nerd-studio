"use client";
import { useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  TbCheck,
  TbChevronsRight,
  TbChevronsLeft,
  TbSearch,
} from "@/components/svg-icons";
import RenderIf from "@/components/shared/RenderIf";
import { AdvancedParentCategory } from "./advanced-parent-category";
import { AdvancedChildCategory } from "./advanced-child-category";
import { AdvancedContentTopic } from "./advanced-content-topic";
import { Separator } from "@/components/ui/separator";

import { useTemplateStore } from "@/stores/zustand/template-store";
import { useMediaQuery } from "usehooks-ts";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { StateSetterType } from "@/services/types";
import type { TemplateState } from "@/stores/zustand/types";

interface StepBoxProps {
  step: number;
  completed: boolean;
  title: string;
  active: boolean;
}

function StepBox({ completed, title, active, ...rest }: StepBoxProps) {
  const iconWrapper = useRef<HTMLDivElement>(null);
  const step = rest.step + 1;
  return (
    <div className="flex w-fit">
      <div className="col items-center gap-4">
        <div
          ref={iconWrapper}
          className={cn(
            "flex size-14 items-center justify-center rounded-lg bg-muted p-2",
            active && "bg-linearGradient",
            completed && "bg-[#ECFDF3]",
          )}
        >
          <div className="flex items-center justify-center rounded-full  bg-white p-1 text-center  text-xl font-bold shadow">
            {completed ? (
              <TbCheck className="size-6 text-[#027A48]" />
            ) : (
              <span
                className={cn(
                  "size-6 text-muted-foreground-light",
                  active && "gradient-text ",
                )}
              >
                {step}
              </span>
            )}
          </div>
        </div>
        <h4
          className={cn(
            " text-center text-xs font-medium md:text-sm lg:text-base",
            !completed && !active && "text-muted-foreground-light",
          )}
        >
          {title}
        </h4>
      </div>

      <svg
        height={30}
        viewBox="0 0 249 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "-mx-4 w-24 sm:w-32 md:w-48",
          step === 3 && "hidden",
          step === 1 ? "-mt-4" : "mb-5 mt-auto -scale-y-100",
        )}
      >
        <path
          d="M0.786687 28.2135C0.536936 28.3313 0.429976 28.6292 0.547786 28.879C0.665596 29.1287 0.963562 29.2357 1.21331 29.1179L0.786687 28.2135ZM249 28.6657L245.686 23.9383L243.249 29.1723L249 28.6657ZM1.21331 29.1179C2.08898 28.7048 2.96704 28.296 3.84747 27.8915L3.42995 26.9828C2.54648 27.3888 1.66538 27.799 0.786687 28.2135L1.21331 29.1179ZM9.15277 25.5181C10.9276 24.7455 12.7116 23.9901 14.5047 23.2521L14.1241 22.3273C12.3248 23.0679 10.5346 23.8259 8.75362 24.6013L9.15277 25.5181ZM19.9013 21.0942C21.7055 20.3937 23.5185 19.7108 25.34 19.0455L24.997 18.1062C23.1692 18.7738 21.3499 19.4591 19.5394 20.162L19.9013 21.0942ZM30.8193 17.1068C32.65 16.4797 34.489 15.8704 36.3361 15.2791L36.0312 14.3267C34.1777 14.9201 32.3323 15.5315 30.4952 16.1608L30.8193 17.1068ZM41.8892 13.5628C43.7435 13.0102 45.6055 12.4755 47.475 11.9591L47.2088 10.9952C45.3327 11.5134 43.4643 12.0499 41.6036 12.6045L41.8892 13.5628ZM53.0931 10.468C54.9678 9.99068 56.8498 9.53154 58.7388 9.09083L58.5116 8.11698C56.616 8.55922 54.7275 9.01995 52.8464 9.49897L53.0931 10.468ZM64.4127 7.82725C66.3047 7.42583 68.2035 7.04283 70.109 6.67845L69.9212 5.69625C68.0091 6.06189 66.1037 6.44621 64.2051 6.84902L64.4127 7.82725ZM75.8288 5.6441C77.7353 5.31907 79.6481 5.01262 81.5671 4.72494L81.4188 3.73599C79.4933 4.02466 77.5738 4.33217 75.6608 4.65832L75.8288 5.6441ZM87.3234 3.92084C89.2413 3.67246 91.1651 3.4428 93.0945 3.23202L92.9859 2.23794C91.0499 2.44943 89.1195 2.67989 87.195 2.92912L87.3234 3.92084ZM98.8778 2.65852C100.804 2.48685 102.736 2.33398 104.673 2.2001L104.604 1.20248C102.66 1.33682 100.722 1.49021 98.7891 1.66247L98.8778 2.65852ZM110.474 1.85686C112.405 1.76176 114.341 1.68551 116.282 1.6283L116.253 0.628738C114.305 0.686139 112.362 0.762644 110.424 0.858074L110.474 1.85686ZM122.093 1.51425C123.061 1.50476 124.03 1.5 125 1.5V0.5C124.026 0.5 123.054 0.504773 122.083 0.514296L122.093 1.51425ZM125 1.5C125.97 1.5 126.939 1.50476 127.908 1.51425L127.917 0.514297C126.946 0.504773 125.974 0.5 125 0.5V1.5ZM133.718 1.6283C135.659 1.68551 137.595 1.76176 139.526 1.85687L139.576 0.858076C137.638 0.762645 135.695 0.68614 133.747 0.628739L133.718 1.6283ZM145.327 2.2001C147.264 2.33398 149.196 2.48685 151.122 2.65852L151.211 1.66247C149.278 1.49021 147.34 1.33682 145.396 1.20248L145.327 2.2001ZM156.906 3.23202C158.835 3.4428 160.759 3.67247 162.677 3.92084L162.805 2.92912C160.881 2.67989 158.95 2.44944 157.014 2.23794L156.906 3.23202ZM168.433 4.72494C170.352 5.01262 172.265 5.31907 174.171 5.6441L174.339 4.65832C172.426 4.33217 170.507 4.02467 168.581 3.736L168.433 4.72494ZM179.891 6.67845C181.796 7.04284 183.695 7.42583 185.587 7.82725L185.795 6.84902C183.896 6.44622 181.991 6.0619 180.079 5.69625L179.891 6.67845ZM191.261 9.09083C193.15 9.53154 195.032 9.99068 196.907 10.4681L197.154 9.49897C195.272 9.01995 193.384 8.55922 191.488 8.11698L191.261 9.09083ZM202.525 11.9591C204.395 12.4755 206.257 13.0102 208.111 13.5628L208.396 12.6045C206.536 12.0499 204.667 11.5134 202.791 10.9952L202.525 11.9591ZM213.664 15.2791C215.511 15.8704 217.35 16.4797 219.181 17.1068L219.505 16.1608C217.668 15.5315 215.822 14.9201 213.969 14.3267L213.664 15.2791ZM224.66 19.0455C226.481 19.7108 228.294 20.3937 230.099 21.0942L230.461 20.162C228.65 19.4591 226.831 18.7738 225.003 18.1062L224.66 19.0455ZM235.495 23.2521C237.288 23.9901 239.072 24.7455 240.847 25.5182L241.246 24.6013C239.465 23.826 237.675 23.0679 235.876 22.3273L235.495 23.2521ZM0.786687 28.2135C0.536936 28.3313 0.429976 28.6292 0.547786 28.879C0.665596 29.1287 0.963562 29.2357 1.21331 29.1179L0.786687 28.2135ZM249 28.6657L245.686 23.9383L243.249 29.1723L249 28.6657ZM1.21331 29.1179C2.08898 28.7048 2.96704 28.296 3.84747 27.8915L3.42995 26.9828C2.54648 27.3888 1.66538 27.799 0.786687 28.2135L1.21331 29.1179ZM9.15277 25.5181C10.9276 24.7455 12.7116 23.9901 14.5047 23.2521L14.1241 22.3273C12.3248 23.0679 10.5346 23.8259 8.75362 24.6013L9.15277 25.5181ZM19.9013 21.0942C21.7055 20.3937 23.5185 19.7108 25.34 19.0455L24.997 18.1062C23.1692 18.7738 21.3499 19.4591 19.5394 20.162L19.9013 21.0942ZM30.8193 17.1068C32.65 16.4797 34.489 15.8704 36.3361 15.2791L36.0312 14.3267C34.1777 14.9201 32.3323 15.5315 30.4952 16.1608L30.8193 17.1068ZM41.8892 13.5628C43.7435 13.0102 45.6055 12.4755 47.475 11.9591L47.2088 10.9952C45.3327 11.5134 43.4643 12.0499 41.6036 12.6045L41.8892 13.5628ZM53.0931 10.468C54.9678 9.99068 56.8498 9.53154 58.7388 9.09083L58.5116 8.11698C56.616 8.55922 54.7275 9.01995 52.8464 9.49897L53.0931 10.468ZM64.4127 7.82725C66.3047 7.42583 68.2035 7.04283 70.109 6.67845L69.9212 5.69625C68.0091 6.06189 66.1037 6.44621 64.2051 6.84902L64.4127 7.82725ZM75.8288 5.6441C77.7353 5.31907 79.6481 5.01262 81.5671 4.72494L81.4188 3.73599C79.4933 4.02466 77.5738 4.33217 75.6608 4.65832L75.8288 5.6441ZM87.3234 3.92084C89.2413 3.67246 91.1651 3.4428 93.0945 3.23202L92.9859 2.23794C91.0499 2.44943 89.1195 2.67989 87.195 2.92912L87.3234 3.92084ZM98.8778 2.65852C100.804 2.48685 102.736 2.33398 104.673 2.2001L104.604 1.20248C102.66 1.33682 100.722 1.49021 98.7891 1.66247L98.8778 2.65852ZM110.474 1.85686C112.405 1.76176 114.341 1.68551 116.282 1.6283L116.253 0.628738C114.305 0.686139 112.362 0.762644 110.424 0.858074L110.474 1.85686ZM122.093 1.51425C123.061 1.50476 124.03 1.5 125 1.5V0.5C124.026 0.5 123.054 0.504773 122.083 0.514296L122.093 1.51425ZM125 1.5C125.97 1.5 126.939 1.50476 127.908 1.51425L127.917 0.514297C126.946 0.504773 125.974 0.5 125 0.5V1.5ZM133.718 1.6283C135.659 1.68551 137.595 1.76176 139.526 1.85687L139.576 0.858076C137.638 0.762645 135.695 0.68614 133.747 0.628739L133.718 1.6283ZM145.327 2.2001C147.264 2.33398 149.196 2.48685 151.122 2.65852L151.211 1.66247C149.278 1.49021 147.34 1.33682 145.396 1.20248L145.327 2.2001ZM156.906 3.23202C158.835 3.4428 160.759 3.67247 162.677 3.92084L162.805 2.92912C160.881 2.67989 158.95 2.44944 157.014 2.23794L156.906 3.23202ZM168.433 4.72494C170.352 5.01262 172.265 5.31907 174.171 5.6441L174.339 4.65832C172.426 4.33217 170.507 4.02467 168.581 3.736L168.433 4.72494ZM179.891 6.67845C181.796 7.04284 183.695 7.42583 185.587 7.82725L185.795 6.84902C183.896 6.44622 181.991 6.0619 180.079 5.69625L179.891 6.67845ZM191.261 9.09083C193.15 9.53154 195.032 9.99068 196.907 10.4681L197.154 9.49897C195.272 9.01995 193.384 8.55922 191.488 8.11698L191.261 9.09083ZM202.525 11.9591C204.395 12.4755 206.257 13.0102 208.111 13.5628L208.396 12.6045C206.536 12.0499 204.667 11.5134 202.791 10.9952L202.525 11.9591ZM213.664 15.2791C215.511 15.8704 217.35 16.4797 219.181 17.1068L219.505 16.1608C217.668 15.5315 215.822 14.9201 213.969 14.3267L213.664 15.2791ZM224.66 19.0455C226.481 19.7108 228.294 20.3937 230.099 21.0942L230.461 20.162C228.65 19.4591 226.831 18.7738 225.003 18.1062L224.66 19.0455ZM235.495 23.2521C237.288 23.9901 239.072 24.7455 240.847 25.5182L241.246 24.6013C239.465 23.826 237.675 23.0679 235.876 22.3273L235.495 23.2521Z"
          fill="url(#paint0_linear_1491_5393)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1491_5393"
            x1={1}
            y1={1}
            x2="21.497"
            y2="84.5069"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9D7AFF" />
            <stop offset={1} stopColor="#52D5FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

interface ListOfStepBoxesProps {
  stepper: number;
}

export function ListOfStepBoxes({ stepper }: ListOfStepBoxesProps) {
  const {
    page: { template },
  } = useGetDictionary();
  return (
    <div>
      <div className="row">
        {Object.keys(steps).map(step => (
          <StepBox
            key={step}
            step={Number(step)}
            completed={Number(step) < stepper}
            active={Number(step) === stepper}
            title={template[stepsTitle[step as keyof typeof steps]]}
          />
        ))}
      </div>
    </div>
  );
}

function SearchBox() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    common: { search },
  } = useGetDictionary();
  return (
    <div className="row h-fit w-full min-w-60 max-w-lg rounded-md  bg-background bg-popover p-0.5 shadow-2xl">
      <Button variant="ghost">
        <TbSearch size="1rem" className="me-1" />
      </Button>
      <input
        className="h-full w-full border-none bg-transparent px-2 font-normal focus:outline-0 focus:ring-0"
        type="search"
        placeholder={search}
        value={searchParams.get("advance-prompt") ?? ""}
        onChange={e => setSearchParams("advance-prompt", e.target.value)}
      />
    </div>
  );
}

interface FooterButtonsProps {
  stepper: number;
  setStepper: StateSetterType<number>;
  handleReset: () => void;
  selectedTemplate: TemplateState["currentTemplate"];
}

function FooterButtons({
  stepper,
  setStepper,
  handleReset,
  selectedTemplate,
}: FooterButtonsProps) {
  /**
   * use this function to set selected template in store and use it in selected template page
   */
  const setCurrentTemplate = useTemplateStore.use.setCurrentTemplate();
  const {
    page: { template },
  } = useGetDictionary();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="col sticky bottom-1 w-full gap-2 bg-background sm:relative">
      <div
        className={cn(
          "flex w-full flex-nowrap justify-between gap-2",
          stepper === 0 && "justify-center",
        )}
      >
        {/*back step button*/}
        <RenderIf isTrue={stepper > 0}>
          <Button
            onClick={() => setStepper(v => v - 1)}
            variant="muted"
            className={cn(
              "items-center gap-2 rounded-xl text-primary-dark max-sm:basis-1/2 sm:w-44",
              stepper === 1 && "max-sm:basis-1/3",
            )}
          >
            <TbChevronsLeft />
            {template.back_step_label_button}
          </Button>
        </RenderIf>
        {/*next step button*/}
        <RenderIf isTrue={stepper < 2}>
          <Button
            onClick={() => setStepper(v => v + 1)}
            className="items-center gap-2 rounded-xl max-sm:w-full max-sm:basis-2/3 max-sm:only:basis-full sm:w-44"
          >
            {template.next_step_label_button}
            <TbChevronsRight />
          </Button>
        </RenderIf>
        {/*reset and show prompt(show on desktop width) buttons*/}
        <RenderIf isTrue={stepper === 2}>
          <div className="flex gap-6 max-sm:basis-1/2">
            <Button
              onClick={handleReset}
              variant="secondary"
              className="w-full rounded-xl text-primary-dark sm:w-44"
            >
              {template.reset_label_button}
            </Button>
          </div>
        </RenderIf>
      </div>
    </div>
  );
}

const steps = {
  "0": AdvancedParentCategory,
  "1": AdvancedChildCategory,
  "2": AdvancedContentTopic,
} as const;
const stepsTitle = {
  "0": "parent_category",
  "1": "child_category",
  "2": "content_topic",
} as const;

export function AdvancedPrompt() {
  const [selectedCategoryParentItemId, setSelectedCategoryParentItemId] =
    useState(-1);
  const [selectedTopicChildItemId, setSelectedTopicChildItemId] = useState(-1);
  const [selectedContentTopicItemId, setSelectedContentTopicItemId] =
    useState(-1);
  const [stepper, setStepper] = useState(0);
  const Content = steps[String(stepper) as keyof typeof steps];
  const {
    page: { template },
  } = useGetDictionary();
  const currentTemplate = useTemplateStore.use.currentTemplate();

  function handleReset() {
    setSelectedCategoryParentItemId(-1);
    setSelectedTopicChildItemId(-1);
    setStepper(0);
  }

  return (
    <div className="col h-fit w-full flex-1 items-center gap-6 ">
      <ListOfStepBoxes stepper={stepper} />
      <RenderIf isTrue={stepper > 0}>
        <SearchBox />
      </RenderIf>
      <Content
        //these props are for parent category
        selectedCategoryParentItemId={selectedCategoryParentItemId}
        setSelectedCategoryParentItemId={setSelectedCategoryParentItemId}
        //these props are for child category
        selectedTopicChildItemId={selectedTopicChildItemId}
        setSelectedTopicChildItemId={setSelectedTopicChildItemId}
      />
      <FooterButtons
        stepper={stepper}
        setStepper={setStepper}
        handleReset={handleReset}
        selectedTemplate={currentTemplate}
      />
    </div>
  );
}
