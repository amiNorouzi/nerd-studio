"use client";
import { IoDocumentText } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";

import { useGetDictionary } from "@/hooks";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import * as React from "react";
import { PiPencilLineLight } from "react-icons/pi";

// list of documents user generate
// TODO: replace with real data from api
const data = [
  {
    id: "1",
    name: "New Document",
    appName: "Ai Writer",
    workbook: "All",
    category: "Writer",
    createdOn: "05/02/2024",
    language: "English(us)",
    words: 30,
  },
  {
    id: "1",
    name: "My Document",
    appName: "Article Wizard",
    workbook: "All",
    category: "Writer",
    createdOn: "06/08/2024",
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
    common: { showing, of, to, page },
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();

  return (
    <section className="col gap-5 rounded-lg border bg-background p-4 shadow-sm">
      {/*title*/}
      <h2 className="row gap-1.5 border-b pb-2">
        <IoDocumentText size="1.2rem" />
        {dashboardDictionary.all_docs_title}
      </h2>

      <div className="spacing-row">
        {/* select for choose how many item return in a page*/}
        <Select>
          <SelectTrigger className="h-8 w-20">
            <SelectValue placeholder="25" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Count</SelectLabel>
              <SelectItem value="apple">25</SelectItem>
              <SelectItem value="banana">50</SelectItem>
              <SelectItem value="blueberry">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* search box*/}
        <div className="fit relative">
          <Input type="search" className="w-60 ps-10" />
          <FiSearch
            size="1.2rem"
            className="absolute start-2 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {dashboardDictionary.all_docs_name_column_label}
            </TableHead>
            <TableHead>
              {dashboardDictionary.all_docs_workbook_column_label}
            </TableHead>
            <TableHead>
              {dashboardDictionary.all_docs_category_column_label}
            </TableHead>
            <TableHead>
              {dashboardDictionary.all_docs_created_column_label}
            </TableHead>
            <TableHead>
              {dashboardDictionary.all_docs_language_column_label}
            </TableHead>
            <TableHead>
              {dashboardDictionary.all_docs_word_column_label}
            </TableHead>
            <TableHead>
              {dashboardDictionary.all_docs_actions_column_label}
            </TableHead>
          </TableRow>
        </TableHeader>

        {/*documents table*/}
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id} className="[&>td]:py-2">
              <TableCell>
                <div className="row gap-1.5">
                  <span className="rounded-md bg-active p-1.5">
                    <PiPencilLineLight size={20} />
                  </span>
                  <p className="col">
                    {item.name}
                    <span className="text-xs font-light text-muted-foreground">
                      {item.appName}
                    </span>
                  </p>
                </div>
              </TableCell>
              <TableCell>{item.workbook}</TableCell>
              <TableCell>
                <span className="rounded-md border border-primary bg-active px-2 py-1 font-normal text-primary">
                  {item.category}
                </span>
              </TableCell>
              <TableCell>{item.createdOn}</TableCell>
              <TableCell>{item.language}</TableCell>
              <TableCell>{item.words}</TableCell>
              <TableCell>
                <div className="row flex-wrap gap-1">
                  <Button variant="outline" className="fit p-1">
                    <IoDocumentText size="1rem" />
                  </Button>
                  <Button variant="destructive" className="fit p-1">
                    <MdDeleteOutline size="1rem" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="spacing-row w-full">
        {/*show how many page of data exist*/}
        <p className="text-xs font-light text-muted-foreground">
          {showing} {page} 1 {of} 1
        </p>

        {/*pagination*/}
        <Pagination className="mx-0 w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            {/*<PaginationItem>*/}
            {/*  <PaginationEllipsis />*/}
            {/*</PaginationItem>*/}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
