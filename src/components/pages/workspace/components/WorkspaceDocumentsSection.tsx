"use client";

import { useGetDictionary } from "@/hooks";
import { useParams } from "next/navigation";

import Lottie from "react-lottie";

import * as noDocsAnimation from "../../../../../public/animations/no-docs-animation.json";
import { App_types, useGetWorkspaceDocuments } from "../hooks/useGetWorkspaceDocuments";
import InstalledDocCard from "./InstalledDocCard";
import ToggleApp from "@/components/pages/workspace/components/ToggleApp";
import { useState } from "react";
import { WorkspacePagination } from "@/components/pages/workspace/components/WorkspacePagination";
import { SelectAndDrawer } from "@/components/shared";
const sections:{name:string,app_type:App_types}[] = [{name:'Chatbot',app_type:'highlight'},{name:'Rewrite',app_type:"ai_writer"},{name:'image',app_type:"image_to_image"},{name:'Translate',app_type:"translate"},{name:'Grammar',app_type:"grammar"},{name:'Code',app_type:"code"},{name:'Prompt Library' ,app_type:"template"}]

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
  ActiveApp:string
}

export default function WorkspaceDocumentsSection({
  workspace_id,
                                                    ActiveApp
}: IWorkspaceDocumentsSectionProps) {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  //set the category of the document
const [activeTab,setActiveTab] = useState<string>(sections[0].name)

  //get the documents in respect to the selected category
  const { data: WorkspaceDocs } = useGetWorkspaceDocuments({ workspace_id, app_type:sections.filter(item=>item.name ===activeTab)[0].app_type, page:1 });
  return (
    <div className="flex w-full  grow flex-col">
      {/* ٌWorkspace Apps bar */}
      <div className="flex w-full flex-col gap-6 ">
        {ActiveApp ==='All' && <h1 className="text-xl font-bold mx-[36px]">Documents</h1>}

        <div className="w-full hidden lg:flex mx-auto  justify-center">
          <ToggleApp setActiveApp={setActiveTab} sections={sections.map(item=>item.name)}/>

        </div>  <div className="w-full flex lg:hidden mx-auto  justify-center">

        <SelectAndDrawer
          value={activeTab}
          setValue={(val)=>{setActiveTab(val)}}
          items={sections.map(item=>item.name)}
        />
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

            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full gap-5 '>

          <div className="flex flex-wrap  w-full   gap-3 my-5">
            {/* ٌWorkspace Docs */}
            {WorkspaceDocs?.map(doc => (
              <div key={doc.id} className='lg:max-w-[350px]'>

                <InstalledDocCard document={doc}
                                  appName={sections.filter(item => item.name === activeTab)[0].app_type} />
              </div>
            ))}
          </div>
          <div className='w-full flex items-center justify-center '>
            {(ActiveApp === 'Documents' && (WorkspaceDocs && WorkspaceDocs.length > 0) &&

              <div className='flex w-[90%]'>

                <WorkspacePagination pages={10} />
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
