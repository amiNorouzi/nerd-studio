"use client";
import { FiInfo } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";
import { BsBookmark } from "react-icons/bs";

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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinimalButton } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import useMobileSize from "@/hooks/useMobileSize";

import { docs } from "@/constants/dashboard";

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
 * @constructor
 */
export function AllDocsSection() {
  const {
    common: { save_label, delete_label },
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMobileSize();

  if (isMobile) return null;

  return (
    <section className="col col-span-3 row-span-3 gap-3 rounded-xl border bg-background px-3 py-3 shadow-dashboard-card max-lg:hidden lg:px-5">
      {/*title*/}
      <div className="row gap-1.5 border-b">
        <GoHistory
          size="1.2rem"
          className="h-7 w-7 rounded-lg bg-primary-light p-1.5 text-primary"
        />
        <h2>{dashboardDictionary.all_docs_title}</h2>

        <Tabs defaultValue="1" className=" w-full ">
          <TabsList className="flex w-full justify-end overflow-hidden bg-transparent pb-0">
            {docs.map(item => (
              <TabsTrigger
                value={item.id}
                className="border-b-tab h-full"
                key={item.id}
              >
                {dashboardDictionary[item.titleKey]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

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
                  <MinimalButton title={save_label} Icon={BsBookmark} />

                  <MinimalButton Icon={FaRegTrashCan} title={delete_label} />
                  <MinimalButton
                    Icon={FiInfo}
                    title={dashboardDictionary.info_button_label}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/*pagination*/}
      <Pagination className="mx-0 mt-auto w-full">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size="sm" />
          </PaginationItem>
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
          {/*<PaginationItem>*/}
          {/*  <PaginationEllipsis />*/}
          {/*</PaginationItem>*/}
          <PaginationItem>
            <PaginationNext href="#" size="sm" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
