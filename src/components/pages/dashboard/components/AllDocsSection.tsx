"use client";
import { FiInfo } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsBookmark } from "react-icons/bs";
import { TbBookmark, TbHistory, TbInfoCircle, TbTrash } from "react-icons/tb";

import {
  Table,
  TableBody,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinimalButton } from "@/components/shared";

import { useGetDictionary } from "@/hooks";

import { docs } from "@/constants/dashboard";
import { useMediaQuery } from "usehooks-ts";

// list of documents user generate
// TODO: replace with real data from api
const data = [
  {
    id: "1",
    name: "New Document",
    appName: "Ai Writer",
    workbook: "All",
    category: "Writer",
    createdOn: "48 Min ago",
    language: "English(us)",
    words: 30,
  },
  {
    id: "2",
    name: "My Document",
    appName: "Article Wizard",
    workbook: "All",
    category: "Writer",
    createdOn: "1 Hr ago",
    language: "English(us)",
    words: 80,
  },
  {
    id: "3",
    name: "My Document",
    appName: "Article Wizard",
    workbook: "All",
    category: "Writer",
    createdOn: "1 Week ago",
    language: "English(us)",
    words: 80,
  },
];

/**
 * section to show all documents user generated
 * used in dashboard
 * contains table of documents with tabs to filter by type
 * @constructor
 */
export function AllDocsSection() {
  const {
    common: { save_label, delete_label },
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMediaQuery("(max-width:768px)");

  if (isMobile) return null;

  return (
    <section
      className="w-full rounded-xl border bg-background px-3 py-3 shadow-dashboard-card max-lg:h-fit max-md:hidden
    lg:col-span-3 lg:row-span-3 lg:h-[350px] lg:px-5 "
    >
      <div className="col h-full w-full gap-3">
        {/*title*/}
        <div className="row gap-1.5 border-b">
          <TbHistory
            size="1.2rem"
            className="h-7 w-7 rounded-lg bg-primary-light p-1.5 text-primary"
          />
          <h2>{dashboardDictionary.all_docs_title}</h2>

          {/*tabs to filter*/}
          <Tabs defaultValue="1" className=" w-full ">
            <TabsList className="flex w-full justify-end overflow-hidden bg-transparent pb-0">
              {docs.map(item => (
                <TabsTrigger
                  value={item.id}
                  className="border-b-tab h-full text-xs"
                  key={item.id}
                >
                  {dashboardDictionary[item.titleKey]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/*table header*/}
        <Table>
          <TableHeader>
            <TableRow className="[&>th]:h-8 [&>th]:py-1 [&>th]:text-xs">
              <TableHead>
                {dashboardDictionary.all_docs_name_column_label}
              </TableHead>
              <TableHead>
                {dashboardDictionary.all_docs_workbook_column_label}
              </TableHead>
              <TableHead>
                {dashboardDictionary.all_docs_language_column_label}
              </TableHead>
              <TableHead>
                {dashboardDictionary.all_docs_word_column_label}
              </TableHead>
              <TableHead className="text-end">
                {dashboardDictionary.all_docs_actions_column_label}
              </TableHead>
            </TableRow>
          </TableHeader>

          {/*documents table*/}
          <TableBody className="text-xs font-normal">
            {data.map(item => (
              <TableRow key={item.id} className="\ [&>td]:py-1">
                <TableCell>
                  <p className="col text-xs">
                    {item.name}
                    <span className="text-xs font-light text-muted-foreground">
                      {item.createdOn}
                    </span>
                  </p>
                </TableCell>
                <TableCell>{item.workbook}</TableCell>
                <TableCell>{item.language}</TableCell>
                <TableCell>{item.words}</TableCell>
                <TableCell>
                  <div className="row justify-end gap-1 text-muted-foreground">
                    <MinimalButton title={save_label} Icon={TbBookmark} />

                    <MinimalButton Icon={TbTrash} title={delete_label} />
                    <MinimalButton
                      Icon={TbInfoCircle}
                      title={dashboardDictionary.info_button_label}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/*pagination*/}
        <Pagination className="mx-0 mt-auto w-full ">
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationPrevious href="#" size="sm" />
            </PaginationItem>

            <div className="row gap-1">
              <PaginationItem>
                <PaginationLink href="#" isActive={true} size="sm">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="sm">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" size="sm">
                  10
                </PaginationLink>
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationNext href="#" size="sm" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
