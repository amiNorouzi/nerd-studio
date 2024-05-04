import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { VscPinned } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ListPdfFile() {
  return (
    <>
      <div className="w-full  px-[143px] py-[48px]">
        <div className=" rounded-xl bg-white p-2 shadow-md">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell className="w-[10%] text-right">
                  <span className="text-[10px] text-[#747474]">size:</span>
                  <p className="text-xs">894.24 KB</p>
                </TableCell>
                <TableCell className="w-[10%] text-right">
                  <span className="text-[10px] text-[#747474]">data:</span>
                  <p className="text-xs">50 Min Ago</p>
                </TableCell>
                <TableCell className="w-[10%] text-right ">
                  <div className="flex items-center justify-evenly">
                    <VscPinned className="text-[1.25vw]" />
                    <FiEdit />
                    <RiDeleteBin5Line />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent className="w-full items-center justify-between">
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <div className="flex">
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
              </div>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
