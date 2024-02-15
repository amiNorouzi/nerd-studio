import React from "react";
import { VariantProps } from "class-variance-authority";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";

import { Button, buttonVariants } from "@/components/plate-ui/button";
import MyTooltip from "@/components/shared/myTooltip";

type IProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isCopy: boolean;
  };

const copyIcons = {
  Copied: IoCheckmarkDoneOutline,
  Copy: FaRegCopy,
} as const;

export function CopyButton(props: IProps) {
  const { isCopy, ...buttonProps } = props;
  const selectIcon = isCopy ? "Copied" : "Copy";
  const Icon = copyIcons[selectIcon];
  return (
    <MyTooltip responseTab title={selectIcon}>
      <Button {...buttonProps}>
        <Icon size={15} {...(isCopy && { color: "green" })} />
      </Button>
    </MyTooltip>
  );
}
