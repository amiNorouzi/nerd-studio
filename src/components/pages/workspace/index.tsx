import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpacesHeader from "@/components/layout/header/SpacesHeader";

import { spacesTabs } from "@/constants/spaces";

import type { Locale } from "../../../../i18n.config";
import { getDictionary } from "@/lib/dictionary";

/**
 * WorkspacePage with three tabs(apps, members, settings)
 * @param lang - current language get from page params
 * @constructor
 */
export default async function WorkspacePage({ lang }: { lang: Locale }) {
  const {
    page: { workspace: workspaceDictionary },
  } = await getDictionary(lang);

  return (
    <Tabs
      defaultValue={spacesTabs[0].value}
      className="flex h-full w-full flex-col"
    >
      <SpacesHeader childrenWrapperClassName="pb-0 ps-2">
        <TabsList className="flex h-full w-full flex-1 items-end justify-start gap-2 bg-transparent pb-0">
          {spacesTabs.map(tab => (
            <TabsTrigger
              value={tab.value}
              key={tab.id}
              className="rounded-none border-b-2 border-transparent bg-transparent pb-3 text-foreground hover:text-primary/80  data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              {workspaceDictionary[tab["i18TitleKey"]]}
            </TabsTrigger>
          ))}
        </TabsList>
      </SpacesHeader>
      <div className="max-h-page h-full w-full overflow-y-auto p-2 md:p-4 xl:p-6">
        <TabsContent value="tabone">tab one</TabsContent>
        {spacesTabs.map(({ value, Component }) => (
          <TabsContent key={value} value={value}>
            {/*page content*/}
            <Component />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
