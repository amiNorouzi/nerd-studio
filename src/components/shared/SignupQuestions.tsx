"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { PiCaretRight, PiCaretLeft } from "react-icons/pi";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

import { useGetDictionary } from "@/hooks";
import useCarouselApi from "@/hooks/useCarouselApi";

import { cn } from "@/lib/utils";
import { signupQuestions } from "@/constants/signup-questions";

/**
 * component for ask question after user signup
 * used in layout
 * TODO: open after signup
 * TODO: save with api
 * TODO: create workspace after finish
 * @constructor
 */
const SignupQuestions = () => {
  const {
    components: { signup_questions: signupQuestionsDictionary },
  } = useGetDictionary();
  const { registerApi, activeIndex, hasNext, hasPrev, progress, api } =
    useCarouselApi();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    use: "",
    people: "",
    solution: "",
    find: "",
    workspace: "Amir Abbasi's Workspace",
  }); //user selected values of question

  /**
   * handle change of question values
   * @param key witch question(key in values state)
   * @param value user selected value
   */
  const handleChange = (key: keyof typeof values, value: string) => {
    setValues({ ...values, [key]: value });
  };

  //TODO open after signup
  // useEffect(() => {
  //   setOpen(true);
  // }, []);

  //select key by index for check if current question is answered
  //if not disable next button
  const keys = Object.keys(values);
  const activeKey = keys[activeIndex];

  return (
    <Dialog open={open}>
      <DialogContent className="col flex h-full max-w-[100vw] overflow-hidden p-3 text-foreground/80 lg:h-5/6 lg:max-w-4xl">
        <header className="spacing-row z-40 bg-background p-1">
          {/*nerd logo*/}
          <div className="row gap-1.5">
            <Image
              src="/images/logo.png"
              alt="nerd logo"
              width={50}
              height={40}
              className="w-7"
            />
            <p className="whitespace-nowrap text-base font-bold">Nerd Studio</p>
          </div>

          {/*welcome message*/}
          <p className="text-sm font-normal">
            <span className="text-base font-semibold">Welcome, </span>Amir
            Abbasi!
          </p>
        </header>

        <Carousel
          className="col h-full w-full"
          setApi={registerApi}
          opts={{
            watchDrag: false,
          }}
        >
          <CarouselContent>
            {/*questions*/}
            {signupQuestions.map(item => (
              <CarouselItem key={item.id}>
                <div className="centered-col gap-6 p-4 pt-20">
                  <p className="text-center text-2xl font-bold">
                    {item.question}
                  </p>
                  <div className="flex h-full w-full max-w-lg flex-wrap justify-center gap-2">
                    {item.options.map(option => (
                      <Button
                        key={option}
                        variant={
                          values[item.key] === option ? "default" : "outline"
                        } //default variant for user selected value
                        onClick={() => handleChange(item.key, option)} //set value of question
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
            {/*make first workspace*/}
            <CarouselItem key={8}>
              <div className="centered-col p-4 pt-20">
                <p className="mb-6 text-center text-2xl font-bold">
                  Lastly, what would you like to name your Workspace?
                </p>
                <Input
                  value={values.workspace}
                  className="h-10 w-72"
                  onChange={e => handleChange("workspace", e.target.value)}
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {/*progress bar for steps done*/}
        <Progress
          value={progress}
          className="h-2 bg-muted"
          indicatorClassName="bg-linearGradient"
        />

        <div className="spacing-row">
          {/*
            previous button
            hidden if current question is first
          */}
          <Button
            variant="outline"
            onClick={() => api?.scrollPrev()}
            className={cn(!hasPrev && "opacity-0")}
          >
            <PiCaretLeft className="me-1 h-3 w-3" />
            {signupQuestionsDictionary.previous_button_label}
          </Button>

          {/*
            next button
            disabled if current question is not answered
            finish button if current question is last
          */}
          <Button
            onClick={() => api?.scrollNext()}
            variant={hasNext ? "outline" : "default"}
            disabled={
              hasNext && values[activeKey as keyof typeof values] === ""
            }
          >
            {hasNext
              ? signupQuestionsDictionary.next_button_label
              : signupQuestionsDictionary.finish_button_label}
            <RenderIf isTrue={hasNext}>
              <PiCaretRight className="ms-1 h-3 w-3" />
            </RenderIf>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupQuestions;
