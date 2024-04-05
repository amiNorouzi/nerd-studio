import {
  DescriptionHoverCard,
  SelectAndDrawer,
  ToggleAdvance,
} from "@/components/shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * some settings in collapsible div that open and close by switch
 * @constructor
 */
function AdvanceSettings() {
  return (
    <ToggleAdvance>
      <div className="form-gap grid grid-cols-1 md:grid-cols-2">
        <div className="col gap-label-space">
          <Label className="row flex-nowrap gap-2">
            Sampler
            <DescriptionHoverCard description="Which sampler to use for the diffusion process. If this value is omitted we'll automatically select an appropriate sampler for you." />
          </Label>
          <SelectAndDrawer value="DDIM" setValue={() => []} items={[]} />
        </div>

        <div className="col gap-label-space">
          <Label className="row flex-nowrap gap-2">
            Clip Guidance Preset
            <DescriptionHoverCard description="CLIP Guidance is a technique that uses the CLIP neural network to guide the generation of images to be more in-line with" />
          </Label>
          <SelectAndDrawer value="None" setValue={() => []} items={[]} />
        </div>

        <div className="col gap-label-space">
          <Label className="eow flex-nowrap gap-2">Artist Name</Label>
          <SelectAndDrawer value="None" setValue={() => []} items={[]} />
        </div>

        <div className="col gap-label-space">
          <Label htmlFor="numOfResult" className="row flex-nowrap gap-2 ">
            Number of images
            <DescriptionHoverCard description="Number of images to generate, maximim is 10" />
          </Label>
          <Input type="number" id="numOfResult" min={1} max={10} />
        </div>
      </div>
    </ToggleAdvance>
  );
}

export default AdvanceSettings;
