"use client";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import type { TemplateState } from "@/stores/zustand/types";
import RenderIf from "../../RenderIf";

interface IProps {
  template?: TemplateState["currentTemplate"];
}
export function TextBox({ template }: IProps) {
  const listOfText = template?.inputs ?? [];
  const { common } = useGetDictionary();

  // function textArea() {
  //   if (listOfText.length) {
  //     return listOfText.map(item => (
  //       <div key={item.id}>
  //         <Label htmlFor={item.id} className="text-xsm font-semibold">
  //           {item.title}
  //         </Label>
  //         <div className="relative h-full w-full">
  //           <textarea
  //             name={item.title}
  //             id={item.id}
  //             rows={1}
  //             className="w-full rounded-lg border p-2 outline-none ring-0"
  //             placeholder={item.placeHolder}
  //           />
  //           {/*<div className="absolute bottom-2 start-2 flex justify-start">*/}
  //           {/*  <Button variant="ghost"><></Button>*/}
  //           {/*</div>*/}
  //         </div>
  //       </div>
  //     ));
  //   }
  //   return (
  //     <>
  //       <Label htmlFor="textbox" className="text-xsm font-semibold">
  //         {writing.form_textarea_label}
  //       </Label>
  //       <div className="relative h-full w-full">
  //         <textarea
  //           name="userTextBox"
  //           id="textbox"
  //           rows={10}
  //           className="w-full rounded-lg border p-2 outline-none ring-0"
  //         />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className="mt-1 grid gap-2">
      <div>
        <Label htmlFor="textbox" className="text-xsm font-semibold">
          {common.form_textarea_label}
        </Label>
        <div className="relative h-full w-full">
          <textarea
            name="userTextBox"
            id="textbox"
            rows={8}
            defaultValue={template?.prompt ?? ""}
            className="w-full rounded-lg border p-2 outline-none ring-0"
          />
        </div>
      </div>
      <RenderIf isTrue={listOfText.length !== 0}>
        {listOfText.map(item => (
          <div key={item.id}>
            <Label htmlFor={item.id} className="text-xsm font-semibold">
              {item.title}
            </Label>
            <div className="relative h-full w-full">
              <textarea
                name={item.title}
                id={item.id}
                rows={1}
                className="w-full rounded-lg border p-2 outline-none ring-0"
                placeholder={item.placeHolder}
              />
              {/*<div className="absolute bottom-2 start-2 flex justify-start">*/}
              {/*  <Button variant="ghost"><></Button>*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
      </RenderIf>
    </div>
  );
}
