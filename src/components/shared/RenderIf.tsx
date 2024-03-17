import { FC } from "react";

import { ChildrenProps } from "@/services/types";

/**
 * for conditional rendering
 * @param isTrue if true children will be rendered
 * @param children
 * @constructor
 */
const RenderIf: FC<ChildrenProps<{ isTrue: boolean }>> = ({
  isTrue,
  children,
}) => {
  return isTrue && <>{children}</>;
};

export default RenderIf;
