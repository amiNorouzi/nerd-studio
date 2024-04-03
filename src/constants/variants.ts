import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4 ",
      md: "h-4.5 w-4.5 ",
      lg: "h-5 w-5 ",
    },
  },
  defaultVariants: {},
});
