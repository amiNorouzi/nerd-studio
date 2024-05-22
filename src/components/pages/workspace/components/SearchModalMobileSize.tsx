import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  placeHolder: string;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  children: React.ReactNode;
  setSearchWord:(val:string) => void;
}

const SearchModalMobileSize = ({placeHolder,openSearch,setOpenSearch,children,setSearchWord}:Props)=>{

return(
  <Drawer open={openSearch} onOpenChange={setOpenSearch}>
    <DrawerContent className="max-h-[90dvh] gap-2 bg-muted p-2 z-[300] ">
      <div className='w-full h-full flex flex-col'>
        {/*searchbar */}
        <div className='w-full h-full mx-[16px] flex flex-row gap-2 '>
          <div  className="relative w-[90%] flex flex-row">
            <Input
              type="search"
              style={{ height: '100%', width: '100%' }}
              className={'px-5'}
              placeholder={placeHolder}
              onChange={(e)=>setSearchWord(e.target.value)}
            />
            <div className="absolute text-[15px]  start-0 top-1/2 items-center -translate-y-1/2">
              <IoIosSearch />
            </div>
          </div>
          <Button variant='muted' onClick={()=>setOpenSearch(false)} >
            cancel
          </Button>
        </div>
        {/*result of the search bar*/}
        <div className='w-full h-auto mx-[16px]'>

        {children}
        </div>
      </div>
    </DrawerContent>
  </Drawer>
)

}


export default SearchModalMobileSize;