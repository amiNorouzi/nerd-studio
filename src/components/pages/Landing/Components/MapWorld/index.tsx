"use client";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import geo from "@/constants/geo.json";
const MapWorld = () => {
  return (
    <div className="padding-x mt-0  bg-[#F8F8F8] py-6 md:mt-20 lg:py-[10px] 2xl:py-[10px]">
      {/*Title section*/}
      <TitleSection
        customTrue={true}
        customize={
          <div className={`mb-6 flex flex-col  `}>
            <h2 className="text-title mb-6 text-center font-medium leading-normal">
              <span className=" px-1.5 text-primary">Available everywhere</span>
              <br />
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              It doesn't matter where you are
            </h2>
            <div className=" text-center  ">
              <span className=" sub-title sub-color-title">
                These are the stories of our customers who have joined us with
                great pleasure when using this crazy feature.
              </span>
            </div>
          </div>
        }
      />

      <div className="flex w-full items-center justify-center ">
        <ComposableMap>
          <Geographies geography={geo}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  style={{
                    pressed: {
                      fill: "rgba(238,68,34,0.01)",
                    },
                  }}
                  fill="#DDE0E4"
                  key={geo.rsmKey}
                  geography={geo}
                  name={geo.name}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapWorld;
