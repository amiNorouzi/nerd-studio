interface T {
  cy?: number;
  cx?: number;
}

export function MarkerIconMap({ cy, cx }: T) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="58"
      height="58"
      viewBox="0 0 100 100"
      fill="none"
      className=""
    >
      <g filter="url(#filter0_d_2958_8182)">
        <circle cx="28.7348" cy="18.7458" r="18.0349" fill="white" />
      </g>
      <circle
        cx="28.735"
        cy="18.746"
        r="13.5193"
        fill="white"
        stroke="url(#paint0_linear_2958_8182)"
        stroke-width="2.64681"
      />
      <circle
        cx="28.7345"
        cy="18.7462"
        r="6.50595"
        fill="url(#paint1_linear_2958_8182)"
      />
      <defs>
        <filter
          id="filter0_d_2958_8182"
          x="0.112723"
          y="0.710938"
          width="57.244"
          height="57.2443"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="10.5872" />
          <feGaussianBlur stdDeviation="5.29361" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.529167 0 0 0 0 0.529167 0 0 0 0 0.529167 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2958_8182"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2958_8182"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2958_8182"
          x1="13.8923"
          y1="3.90332"
          x2="49.6776"
          y2="20.1673"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9D7AFF" />
          <stop offset="1" stop-color="#52D5FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2958_8182"
          x1="22.2285"
          y1="12.2402"
          x2="37.9142"
          y2="19.3692"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9D7AFF" />
          <stop offset="1" stop-color="#52D5FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
