import React, { useState } from "react";
import ToggleApp from "@/components/pages/workspace/components/ToggleApp";
import CreateNewAppLink from "@/components/pages/workspace/components/CreateNewAppLink";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/svg-icons/SearchIcon";
import { useParams } from "next/navigation";
import { useGetDictionary } from "@/hooks";
import { IoIosSearch } from "react-icons/io";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import SearchModalMobileSize from "@/components/pages/workspace/components/SearchModalMobileSize";

const sections = ['All','Apps','Documents']

interface Props{
  setActiveApp:(value:string) => void;
  ActiveApp:string
  setSearchWord:(value:string) => void
}
export const WorkspaceHeader = ({setActiveApp,ActiveApp,setSearchWord}:Props)=>{

  const { lang } = useParams();
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  // state for search modal in mobile mode
  const [openSearch,setOpenSearch]=useState(false);

  //using media query
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  //searched word

  return (
    <div className='flex w-full flex-col lg:flex-row  justify-between gap-[24px] lg:gap-0 '>
      <div className='flex justify-between flex-row items-center mx-[16px] lg:mx-[32px] lg:gap-4'>

      <h1 className="text-xl font-bold ">{ActiveApp ==='All'?'Apps':ActiveApp}</h1>
      <ToggleApp setActiveApp={setActiveApp}  sections={sections} />
      </div>
      <div>


      {
        <div className="flex w-full items-end lg:items-start  sm:items-center   lg:mx-0  ">


          <div className="flex flex-row-reverse justify-end sm:justify-start gap-2 lg:justify-end  w-full mx-[16px] lg:mx-[32px] ">
            <div >

            {(ActiveApp === 'All' || ActiveApp === 'Apps') &&

            <CreateNewAppLink
              href={`/${lang}/template/custom-template/create`}
              label={workspaceDictionary.add_app_button_label}
            />
            }

            </div>
            <div onClick={()=>{
                      if(isDesktop) return
                      setOpenSearch(true)
                    }} className={"relative h-[37px] flex-1 lg:w-[295px] lg:auto"}>
                      <Input
                        type="search"
                        style={{height:'100%',width:'100%'}}
                        className={'px-5'}
                        onChange={e=>setSearchWord(e.target.value)}
                        placeholder={search}
                      />
              <div className="absolute text-[15px]  start-0 top-1/2 items-center -translate-y-1/2">
                <IoIosSearch />
              </div>
            </div>
          </div>
        </div>
      }
      </div>
      {/*search modal in mobile size*/}
      <SearchModalMobileSize setOpenSearch={setOpenSearch} openSearch={openSearch} placeHolder={search} setSearchWord={setSearchWord} >
        <div className='h-[600px] w-full bg-muted'>
          children here
        </div>

      </SearchModalMobileSize>
    </div>
  )


}