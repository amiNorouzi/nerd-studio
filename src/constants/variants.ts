import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    size: {
      sm: "!h-3.5 !w-3.5 ",
      md: "!h-4 !w-4",
      lg: "!h-5 !w-5 ",
    },
  },
  defaultVariants: {},
});
