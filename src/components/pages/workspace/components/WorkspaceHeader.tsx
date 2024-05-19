import { useState } from "react";
import ToggleApp from "@/components/pages/workspace/components/ToggleApp";
import CreateNewAppLink from "@/components/pages/workspace/components/CreateNewAppLink";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/svg-icons/SearchIcon";
import { useParams } from "next/navigation";
import { useGetDictionary } from "@/hooks";
const sections = ['All','Apps','Documents']

interface Props{
  setActiveApp:(value:string) => void;
  ActiveApp:string
}
export const WorkspaceHeader = ({setActiveApp,ActiveApp}:Props)=>{
  console.log('ActiveApp',ActiveApp);
  const { lang } = useParams();
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  return (
    <div className='flex flex-row  justify-between'>
      <div className='flex flex-row items-center'>

      <h1 className="text-xl font-bold mx-[32px]">{ActiveApp ==='All'?'Apps':ActiveApp}</h1>
      <ToggleApp setActiveApp={setActiveApp}  sections={sections} />
      </div>
      <div>


      {(ActiveApp === 'All' || ActiveApp === 'Apps') &&
        <div className="flex items-start justify-between sm:items-center">


          <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center ml-auto">
            <CreateNewAppLink
              href={`/${lang}/template/custom-template/create`}
              label={workspaceDictionary.add_app_button_label}
            />

            <div className="relative h-9">
              <Input
                type="search"
                className="!h-9 w-60 bg-muted ps-7 text-sm font-light"
                placeholder={search}
              />
              <div className="absolute start-2 top-1/2 h-4 w-4 -translate-y-1/2">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      }
      {
        ActiveApp === 'Documents' &&
        <div className="flex items-start justify-between sm:items-center">


          <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center ml-auto">


            <div className="relative h-9">
              <Input
                type="search"
                className="!h-9 w-60 bg-muted ps-7 text-sm font-light"
                placeholder='search Doc'
              />
              <div className="absolute start-2 top-1/2 h-4 w-4 -translate-y-1/2">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  )


}