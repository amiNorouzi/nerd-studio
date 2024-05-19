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
  pages:10
}

export const WorkspacePagination = ({pages}:Props)=>{
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const pageNumbers = [...Array(pages)].map((_, i) => i + 1);
  return(
    <Pagination className="mx-0 mt-auto w-full ">
      <PaginationContent className="w-full justify-between">
        <PaginationItem onClick={()=>{
          if(selectedPage ===1) return
          setSelectedPage(prev=>prev-1)
        }}>
          <PaginationPrevious href="#" size="sm" />
        </PaginationItem>

        {/*<div className="row gap-1">*/}
        {/*  <PaginationItem>*/}
        {/*    <PaginationLink href="#" isActive={true} size="sm">*/}
        {/*      1*/}
        {/*    </PaginationLink>*/}
        {/*  </PaginationItem>*/}
        {/*  <PaginationItem>*/}
        {/*    <PaginationLink href="#" size="sm">*/}
        {/*      2*/}
        {/*    </PaginationLink>*/}
        {/*  </PaginationItem>*/}
        {/*  <PaginationItem>*/}
        {/*    <PaginationEllipsis />*/}
        {/*  </PaginationItem>*/}
        {/*  <PaginationItem>*/}
        {/*    <PaginationLink href="#" size="sm">*/}
        {/*      10*/}
        {/*    </PaginationLink>*/}
        {/*  </PaginationItem>*/}
        {/*</div>*/}
        <div className='row gap-1'>
          {pageNumbers.map(page=>{
            return(
              <>
                {(page ===1 || Math.abs(page-selectedPage)<=2 || page===10 )&&
                <PaginationItem key={page} onClick={()=>setSelectedPage(page)}>
                <PaginationLink href="#" isActive={selectedPage ===page} size="sm">
                  {page}
                </PaginationLink>
              </PaginationItem>
                }
                {
                  (Math.abs(page-selectedPage)===3 && page<10 && page!==1  ) &&
                    <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                }
              </>
            )
          })}
        </div>
        <PaginationItem onClick={()=>{
          if(selectedPage ===10) return
          setSelectedPage(prev=>prev+1)
        }}>
          <PaginationNext href="#" size="sm" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}