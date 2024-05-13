import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

export const DrawerOption = ()=>{
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={()=>setIsOpen(prev=>!prev)} className='w-full flex flex-col  '>

      <div className='  w-full h-[50px] flex items-center justify-between px-4 '>
       <span className={'text-[15px]'}>
        Features

       </span>
        <MdOutlineKeyboardArrowDown className={cn(isOpen && 'rotate-180','transition-all text-[20px]')}/>
      </div>
      <div className={cn('w-full transition-all  border-b overflow-x-hidden' , isOpen ? 'h-auto': 'h-[0px]')}>
        <div className='flex flex-col w-full h-auto text-primary mx-10 gap-2 text-[15px]'>
          <Link href="grammar">

            <span className="flex w-full  ">Grammar</span>
          </Link>
          <Link href="Rewrite">

            <span className="flex">Rewrite</span>
          </Link><Link href="translate">

            <span className="flex">Translate</span>
          </Link>

        </div>
      </div>
    </div>
  )

}