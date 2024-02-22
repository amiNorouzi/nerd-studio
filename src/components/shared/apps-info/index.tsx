import React, { memo } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

import {
  AppIntroMD as Introduction,
  HeaderActions as HActions,
  HeaderDescription as HDescription,
  HeaderIcon as HIcon,
  HeaderInfo as HInfo,
} from "./components";
import type { ParamsType } from "@/services/types";

const HeaderActions = memo(HActions);
const HeaderDescription = memo(HDescription);
const HeaderIcon = memo(HIcon);
const HeaderInfo = memo(HInfo);
const AppIntroMD = memo(Introduction);
interface IProps {
  headerDescription: string;
  mdDescription: string;
  params: ParamsType;
}

export function Info({ mdDescription, headerDescription, params }: IProps) {
  return (
    <div className="col-span-12 flex h-fit w-full items-start justify-center overflow-hidden bg-background lg:h-full">
      <div className="flex h-full w-full  max-w-4xl flex-col items-center justify-start gap-8 overflow-hidden p-0 md:p-5">
        {/* header - actions - icon - description*/}
        <HeaderInfo>
          {/*header icon*/}
          <HeaderIcon />

          {/*header description*/}
          <HeaderDescription headerDescription={headerDescription} />

          {/*actions(delete and add to workspace)  */}
          <HeaderActions />
        </HeaderInfo>
        {/*introduction - markdown viewer*/}
        <AppIntroMD params={params}>
          <Markdown remarkPlugins={[remarkGfm]}>{mdDescription}</Markdown>
        </AppIntroMD>
      </div>
    </div>
  );
}
