import React from "react";
//TODO:Fixed This component
const Footer = () => {
  return (
    <div className="flex flex-col bg-black px-4 py-9 text-white lg:bg-primary">
      <div>
        <div>
          <span>Brand</span>
        </div>
        <div className="flex flex-col justify-start ">
          <div className="mb-3 flex flex-row items-center gap-x-6">
            <span>Download Now</span>
            <span>License</span>
          </div>
          <div className="flex flex-row items-center gap-x-6 text-base">
            <span>About</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>News</span>
            <span>Help</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span></span>
        </div>
        <div>
          <div></div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div>
          <div></div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
