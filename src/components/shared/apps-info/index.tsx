import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ParamsType } from "@/services/types";
import {
  AppIntroMD,
  HeaderActions,
  HeaderDescription,
  HeaderIcon,
  HeaderInfo,
} from "./components";
// const HeaderActions = memo(HActions);
// const HeaderDescription = memo(HDescription);
// const HeaderIcon = memo(HIcon);
// const HeaderInfo = memo(HInfo);
// const AppIntroMD = memo(Introduction);
interface IProps {
  headerDescription: string;
  mdDescription: string;
  params: ParamsType;
}

export function Info({ mdDescription, headerDescription, params }: IProps) {
  return (
    <div className="col-span-12 flex h-fit max-h-full w-full items-start justify-center overflow-y-auto bg-background lg:h-full lg:overflow-hidden">
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
