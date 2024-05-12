import TitleSection from "@/components/pages/Landing/common/TitleSection";
import { Button } from "@/components/ui/button";
import { btnFeature } from "@/constants/Landing";
import Image from "next/image";
import { TbWriting } from "react-icons/tb";
import { Feature } from "geojson";
import FeatureButton from "@/components/pages/Landing/common/FeatureButton";

export default function Features() {

  return (
    <section className="padding-y padding-x flex flex-col justify-center">
      {/*Title section*/}
      <TitleSection
        title={"What can you do with"}
        titlePrimary={"Nerd Studio?"}
        subTitle={
          "These are the features that are available in Nerd Studio application."
        }
      />

      <div>
        {/*buttons */}
 <FeatureButton/>
      </div>
    </section>
  );
};
