import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Loading from "@/components/shared/Loading";
import RenderIf from "@/components/shared/RenderIf";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-normal ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none hover:shadow disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-dark active:bg-primary-dark",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:border-primary hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-primary-light active:bg-primary-light",
        ghost: "hover:bg-primary-light hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        muted:
          "bg-muted text-primary hover:bg-muted-dark active:bg-muted-dark disabled:opacity-100",
      },
      size: {
        default: "h-7 px-3 py-1.5",
        sm: "h-7 px-3 py-1.5",
        lg: "h-10 rounded-lg px-8",
        icon: "fit rounded-md p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isPending?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isPending,
      variant,
      size,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <RenderIf isTrue={!!isPending}>
          <Loading
            rootClass="-ms-1 me-1"
            svgClass="w-6 h-6 !stroke-primary-foreground"
          />
        </RenderIf>
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
