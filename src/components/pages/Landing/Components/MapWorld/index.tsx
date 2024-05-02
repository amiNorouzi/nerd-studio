"use client";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import geo from "@/constants/geo.json";
import { useState } from "react";
import { MarkerIconMap } from "@/components/svg-icons/MarkerIconMap";

const MapWorld = () => {
  const [showPopup, setShowPopup] = useState(false);
  // const [popupContent, setPopupContent] = useState({
  //   title: "“I like it because .”.",
  //   imageUrl: "/images/landing/Avatar.png",
  // });

  return (
    <div className="padding-x  mt-0  bg-[#F8F8F8] py-6 md:mt-20 lg:py-[10px] 2xl:py-[10px]">
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

      <div className="flex flex-1 justify-center ">
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
            <Marker
              coordinates={[37.6173, 55.7558]}
              onMouseEnter={() => {
                setShowPopup(true);
              }}
              onMouseLeave={() => {
                setShowPopup(false);
              }}
            >
              <MarkerIconMap />

              <text
                textAnchor="middle"
                y={15}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              ></text>
              {showPopup && (
                <g transform="translate(-60, -120)">
                  <rect
                    width="120"
                    height="110"
                    fill="white"
                    stroke="#B388F4FF"
                  />
                  <image
                    href={"/images/landing/Avatar.png"}
                    x="10"
                    y="10"
                    width="100"
                    height="50"
                  />
                  <text
                    textAnchor="middle"
                    x="60"
                    y="80"
                    style={{ fontFamily: "system-ui", fill: "#333" }}
                  >
                    “I like it because .”
                  </text>
                </g>
              )}
            </Marker>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default MapWorld;
