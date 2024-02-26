"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const SignupQuestions = () => {
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setOpen(true);

    if (api) {
      const getProgress = () => {
        setProgress(
          Math.floor(
            (100 / api.scrollSnapList().length) *
              (api.selectedScrollSnap() + 1),
          ),
        );
      };

      getProgress();
      api.on("scroll", () => {
        setHasNext(api.canScrollNext());
        setHasPrev(api.canScrollPrev());
        getProgress();
      });
    }
  }, [api]);

  return (
    <Dialog open={open}>
      <DialogContent className="col flex h-full max-w-[100vw] overflow-hidden p-3 text-foreground/80 lg:h-4/6 lg:max-w-4xl">
        <div className="spacing-row z-40 bg-background p-1">
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

          <p className="text-sm font-normal">
            <span className="text-base font-semibold">Welcome, </span>Amir
            Abbasi!
          </p>
        </div>

        <Carousel className="col h-full w-full" setApi={setApi}>
          <CarouselContent className="mx-auto ">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Progress
          value={progress}
          className="h-2 bg-muted"
          indicatorClassName="bg-linearGradient"
        />
        <div className="spacing-row">
          <Button
            onClick={() => api?.scrollPrev()}
            className={cn(!hasPrev && "opacity-0")}
          >
            Previous
          </Button>
          <Button onClick={() => api?.scrollNext()}>
            {hasNext ? "Next" : "Finish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupQuestions;
