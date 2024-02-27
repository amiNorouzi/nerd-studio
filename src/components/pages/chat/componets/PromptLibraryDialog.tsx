import { FiSearch } from "react-icons/fi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PromptLibrary } from "@/components/svg-icons";
import { MyTooltip } from "@/components/shared/myTooltip";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { promptLibrary } from "@/constants/chat";

/**
 * component for prompt library dialog
 * list of sample prompts
 * trigger by button in prompt input
 * @constructor
 */
function PromptLibraryDialog() {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();

  return (
    <Dialog>
      <MyTooltip title={chatDictionary.prompt_library_title}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="fit p-0 text-foreground/80">
            <PromptLibrary />
          </Button>
        </DialogTrigger>
      </MyTooltip>
      <DialogContent
        className="lg:max-[cal(100dvh-20px] my-0 flex h-[100dvh] max-h-[100dvh] !w-full max-w-[100vw] flex-col
           gap-4 overflow-y-auto bg-popover lg:h-auto lg:max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle>{chatDictionary.prompt_library_title}</DialogTitle>
        </DialogHeader>

        <div className="bg-linearGradient centered-col h-14 w-full rounded-lg py-5">
          <div className="row mx-auto h-fit w-full min-w-60 max-w-lg rounded-md bg-background p-0.5">
            <input
              className="h-full w-full border-none bg-transparent px-2 font-normal focus:outline-0 focus:ring-0"
              type="search"
            />
            <Button>
              <FiSearch size="1rem" className="me-1" />
              Search
            </Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          {promptLibrary.map(item => (
            <div
              className="col cursor-pointer gap-2 rounded-lg border p-4 hover:border-primary hover:shadow-card-hover"
              key={item.id}
            >
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="font-normal text-muted-foreground">{item.prompt}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PromptLibraryDialog;
