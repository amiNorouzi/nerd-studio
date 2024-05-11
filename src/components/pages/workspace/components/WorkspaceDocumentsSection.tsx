"use client";

import { useGetDictionary } from "@/hooks";
import { useParams } from "next/navigation";

import Lottie from "react-lottie";

import * as noDocsAnimation from "../../../../../public/animations/no-docs-animation.json";
import { useGetWorkspaceDocuments } from "../hooks/useGetWorkspaceDocuments";
import InstalledDocCard from "./InstalledDocCard";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: noDocsAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

interface IWorkspaceDocumentsSectionProps {
  workspace_id: number;
}

export default function WorkspaceDocumentsSection({
  workspace_id,
}: IWorkspaceDocumentsSectionProps) {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const { lang } = useParams();
  const { data: WorkspaceDocs } = useGetWorkspaceDocuments({ workspace_id, app_type:"template", page:1 });
  console.log("WorkspaceDocs: ", WorkspaceDocs);

  return (
    <div className="flex grow flex-col">
      {/* ٌWorkspace Apps bar */}
      <div className="flex items-start justify-between sm:items-center">
        <h1 className="text-xl font-bold">Documents</h1>

        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center">
          {/* <CreateNewAppLink
            href={`/${lang}/template/custom-template/create`}
            label={workspaceDictionary.add_app_button_label}
          />

          <div className="relative h-9">
            <Input
              type="search"
              className="!h-9 w-60 bg-muted ps-7 text-sm font-light"
              placeholder={search}
            />
            <div className="absolute start-2 top-1/2 h-4 w-4 -translate-y-1/2">
              <SearchIcon />
            </div>
          </div> */}
        </div>
      </div>

      {WorkspaceDocs?.length === 0 ? (
        <div className="mt-12  flex h-full grow items-center justify-center gap-4">
          {/* ٌWorkspace No Docs */}
          <div>
            <Lottie options={defaultOptions} height={160} width={131} />
          </div>
          <div className="flex h-full w-80 flex-col justify-center">
            <div className="flex h-full grow flex-col justify-center gap-4 text-wrap">
              <span className="h-full text-2xl font-bold capitalize">
                No Document Added Yet!
              </span>
              <span className="items-center text-wrap text-[14px] text-gray-400">
                You can create different documents in other pages of your
                workspace on the sidebar!
              </span>
              {/* <CreateNewAppLink
                href={`/${lang}/template/custom-template/create`}
                label={workspaceDictionary.add_app_button_label}
                className="w-full"
            /> */}
            </div>
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* ٌWorkspace Docs */}
          {WorkspaceDocs?.map(doc => (
            <InstalledDocCard document={doc} key={doc.id} />
          ))}
        </section>
      )}
    </div>
  );
}
