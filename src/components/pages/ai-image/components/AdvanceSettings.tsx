"use client";
import { useState } from "react";

import {
  Collapsible,
  DescriptionHoverCard,
  SelectAndDrawer,
} from "@/components/shared";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

function AdvanceSettings() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-5 flex items-start justify-start gap-2">
        <Switch
          id="collapse-trigger"
          checked={open}
          onCheckedChange={setOpen}
        />
        <Label htmlFor="collapse-trigger" className="flex flex-col gap-1">
          <span>{imageDictionary.advance_settings_title}</span>
          <span className="text-muted-foreground">
            {imageDictionary.advance_settings_descriptions}
          </span>
        </Label>
      </div>
      <Collapsible isOpen={open}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col gap-2">
            <Label className="row flex-nowrap gap-2">
              Sampler
              <DescriptionHoverCard description="Which sampler to use for the diffusion process. If this value is omitted we'll automatically select an appropriate sampler for you." />
            </Label>
            <SelectAndDrawer value="DDIM" setValue={() => []} items={[]} />
          </div>

          <div className="col gap-2">
            <Label className="row flex-nowrap gap-2">
              Clip Guidance Preset
              <DescriptionHoverCard description="CLIP Guidance is a technique that uses the CLIP neural network to guide the generation of images to be more in-line with" />
            </Label>
            <SelectAndDrawer value="None" setValue={() => []} items={[]} />
          </div>

          <div className="col gap-2">
            <Label className="eow flex-nowrap gap-2">Artist Name</Label>
            <SelectAndDrawer value="None" setValue={() => []} items={[]} />
          </div>

          <div className="col gap-2">
            <Label htmlFor="numOfResult" className="row flex-nowrap gap-2 ">
              Number of images
              <DescriptionHoverCard description="Number of images to generate, maximim is 10" />
            </Label>
            <Input type="number" id="numOfResult" min={1} max={10} />
          </div>
        </div>
      </Collapsible>
    </>
  );
}

export default AdvanceSettings;
