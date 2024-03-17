import React from "react";
interface IProps extends React.ComponentPropsWithoutRef<"svg"> {
  fill?: string;
}
export function BgWave({ fill = "#9372ee", ...svgProps }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      {...svgProps}
    >
      <path
        fill={fill}
        fill-opacity="1"
        d="M0,288L80,282.7C160,277,320,267,480,234.7C640,203,800,149,960,128C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  );
}
