"use client";

import { useGetDictionary } from "@/hooks";

import Lottie from "react-lottie";

import * as noDocsAnimation from "../../../../../public/animations/no-docs-animation.json";
import { App_types, useGetWorkspaceDocuments } from "../hooks/useGetWorkspaceDocuments";
import InstalledDocCard from "./InstalledDocCard";
import ToggleApp from "@/components/pages/workspace/components/ToggleApp";
import { useState } from "react";
import { WorkspacePagination } from "@/components/pages/workspace/components/WorkspacePagination";
import { SelectAndDrawer } from "@/components/shared";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { WorkspaceList } from "@/services/types";
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
  workspaces: WorkspaceList[] | undefined

}

export default function WorkspaceDocumentsSection({
  workspace_id, ActiveApp,workspaces
}: IWorkspaceDocumentsSectionProps) {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  //set the category of the document
const [activeTab,setActiveTab] = useState<string>(sections[0].name)

  //page number
  const [page,setPage]=useState(1);

  //get the documents in respect to the selected category
  const { data: WorkspaceDocs } = useGetWorkspaceDocuments({ workspace_id, app_type:sections.filter(item=>item.name ===activeTab)[0].app_type, page });
//show more in all tabs
  const [showMore,setShowMore] = useState(false)

  //check for screen size
  const isDesktop = useMediaQuery('(min-width: 1024px)');


  const DocumentsToShowInMobileInAllTab = WorkspaceDocs ? (showMore ?WorkspaceDocs.documents : WorkspaceDocs.documents.slice(0, 4)) : []
  const DocumentsToShowInDesktopInAllTab = WorkspaceDocs ? (showMore ?WorkspaceDocs.documents : WorkspaceDocs.documents.slice(0, 8)) : []



  return (
    <div className="flex w-full  grow flex-col ">
      {/* ٌWorkspace Apps bar */}
      <div className="flex w-full flex-col gap-6 lg:mx-0 ">
        {ActiveApp ==='All' && <h1 className="text-xl font-bold mx-[16px]  lg:mx-[36px]">Documents</h1>}

        <div className="w-full hidden lg:flex mx-auto  justify-center">
          <ToggleApp setActiveApp={setActiveTab} sections={sections.map(item=>item.name)}/>

        </div>
        <div className="w-[90%] mx-auto flex lg:hidden   justify-center">

        <SelectAndDrawer
          value={activeTab}
          setValue={(val)=>{setActiveTab(val)}}
          items={sections.map(item=>item.name)}

        />
        </div>

      </div>

      {WorkspaceDocs?.documents.length === 0 ? (
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

          <div className="flex flex-wrap  w-full  gap-3 my-5">
            {/* ٌWorkspace Docs */}
            <div
              className='grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto lg:mx-[36px] '>

              {ActiveApp === 'Documents' && WorkspaceDocs && WorkspaceDocs.documents.map(doc => (
                <div key={doc.id} className='w-[315px] lg:max-w-[350px]'>

                  <InstalledDocCard document={doc}
                                    appName={sections.filter(item => item.name === activeTab)[0].app_type}
                                    app_type={sections.filter(item => item.name === activeTab)[0].app_type}
                                    workspace_id={workspace_id}
                                    workspaces={workspaces}
                  />
                </div>
              ))}
              {ActiveApp === 'All' && !isDesktop && WorkspaceDocs && DocumentsToShowInMobileInAllTab.map(doc => (
                <div key={doc.id} className='w-[315px] lg:max-w-[350px]'>

                  <InstalledDocCard document={doc}
                                    appName={sections.filter(item => item.name === activeTab)[0].app_type}
                                    app_type={sections.filter(item => item.name === activeTab)[0].app_type}
                                    workspace_id={workspace_id}
                                    workspaces={workspaces}


                  />
                </div>
              ))}
              {ActiveApp === 'All' && isDesktop && WorkspaceDocs && DocumentsToShowInDesktopInAllTab.map(doc => (
                <div key={doc.id} className='w-[315px] lg:max-w-[350px]'>

                  <InstalledDocCard document={doc}
                                    appName={sections.filter(item => item.name === activeTab)[0].app_type}
                                    app_type={sections.filter(item => item.name === activeTab)[0].app_type}
                                    workspace_id={workspace_id}
                                    workspaces={workspaces}

                  />
                </div>
              ))}
            </div>
          </div>
          {
            ActiveApp === 'All' && WorkspaceDocs && WorkspaceDocs.documents.length > 3 &&
            <div className='w-full flex  '>
              {

                <div onClick={() => setShowMore(prev => !prev)}
                     className={cn(' cursor-pointer  h-[37px] flex bg-secondary text-primary border rounded-xl  items-center justify-center', !isDesktop ? "w-full" : 'w-[134px] mx-auto')}>
                  <p>

                    {showMore ? 'Show Less' : 'Show More'}
                  </p>
                </div>
              }
            </div>

          }
          <div className='w-full flex items-center justify-center '>
            {ActiveApp === 'Documents' && WorkspaceDocs && WorkspaceDocs.paginator.num_pages > 1 &&

              <div className='flex w-[90%]'>

                <WorkspacePagination pages={WorkspaceDocs.paginator.num_pages} currenPage={WorkspaceDocs.current_page}
                                     setPage={setPage} />
              </div>
            }
          </div>


        </div>
      )}
    </div>
  );
}
