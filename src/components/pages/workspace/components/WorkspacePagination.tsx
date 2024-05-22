import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface Props{
  pages:number
  currenPage:number
  setPage:(value:number) => void
}

export const WorkspacePagination = ({pages,currenPage,setPage}:Props)=>{
  // const [selectedPage, setSelectedPage] = useState<number>(1);

  const pageNumbers = [...Array(pages)].map((_, i) => i + 1);
  return(
    <Pagination className=" relative mx-0 mt-auto w-full h-[100px] ">
      <PaginationContent className="w-full ">
        <div className='absolute left-0'>

        {currenPage !==1 &&

        <PaginationItem onClick={()=>{

          setPage(currenPage-1)
        }}>
          <PaginationPrevious href="#" size="sm" />
        </PaginationItem>
        }
        </div>


        <div className='row gap-1 absolute right-1/2'>
          {pageNumbers.map(page=>{
            return(
              <>
                {(page ===1 || Math.abs(page-currenPage)<=2 || page===10 )&&
                <PaginationItem key={page} onClick={()=>setPage(page)}>
                <PaginationLink href="#" isActive={currenPage ===page} size="sm">
                  {page}
                </PaginationLink>
              </PaginationItem>
                }
                {
                  (Math.abs(page-currenPage)===3 && page<10 && page!==1  ) &&
                    <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                }
              </>
            )
          })}
        </div>
        <div className='absolute right-0'>

        {
          currenPage !==pages &&

        <PaginationItem onClick={()=>{

          setPage(currenPage+1)
        }}>
          <PaginationNext href="#" size="sm" />
        </PaginationItem>
        }
        </div>
      </PaginationContent>
    </Pagination>
  )
}