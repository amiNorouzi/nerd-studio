import React from "react";
import { withRef } from "@udecode/cn";
import { useOutdentButton } from "@udecode/plate-indent";

import { Icons, iconVariants } from "@/components/icons";

import { ToolbarButton } from "./toolbar";

export const OutdentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useOutdentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Outdent" {...props} {...rest}>
        <Icons.outdent className={iconVariants({ size: "md" })} />
      </ToolbarButton>
    );
  },
);
