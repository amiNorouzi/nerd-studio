"use client";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InstalledAppCard from "./InstalledAppCard";

import { useGetDictionary } from "@/hooks";

import { apps } from "@/constants/spaces";

/**
 * apps tab content in workspace page
 * show all app that installed in workspace
 * @constructor
 */
export function WorkspaceApps() {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  return (
    <>
      <div className="flex items-start justify-between sm:items-center">
        {/*page title*/}
        <h1 className="text-lg font-bold">{workspaceDictionary.apps_title}</h1>

        {/*column in mobile size and row in sm and above*/}
        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center">
          {/*add app button*/}
          <Button className="w-fit">
            {" "}
            <IoAdd className="me-2 h-4 w-4" />
            {workspaceDictionary.add_app_button_label}
          </Button>

          {/*search input*/}
          <div className="fit relative">
            <Input
              type="search"
              className="w-60 bg-muted ps-7 font-light"
              placeholder={search}
            />
            <FiSearch
              size="1rem"
              className="absolute start-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      {/*
          installed apps
          1 item in a row in mobile size, 2 in md, 3 in lg and 4 in xl
        */}
      <section className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {apps.map(app => (
          <InstalledAppCard app={app} key={app.id} />
        ))}
      </section>
    </>
  );
}
