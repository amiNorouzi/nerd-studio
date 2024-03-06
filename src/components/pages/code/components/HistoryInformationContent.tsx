import useCodeFeatures from "../hooks/useCodeFeatures";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import RenderIf from "@/components/shared/RenderIf";
import { Show } from "@/components/shared";

const InfoItemBox = ({ text }: { text: string }) => (
  <div className="w-full rounded-lg border border-foreground p-2.5">{text}</div>
);

function HistoryInformationContent() {
  // get the current feature from the search params
  const { currentFeature } = useCodeFeatures();
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  return (
    <div className="mb-5 grid w-full grid-cols-2 content-start gap-5 py-5">
      <RenderIf isTrue={currentFeature === "code-converter"}>
        <div
          data-feature={currentFeature}
          className="col col-span-2 gap-2 data-[feature=code-covertor]:col-span-1"
        >
          <Label>{codeDictionary.code_convert_from_language_label}</Label>
          <InfoItemBox text="VB.Net" />
        </div>
      </RenderIf>

      {/* to language select */}
      <div
        data-feature={currentFeature}
        className="col col-span-2 gap-2 data-[feature=code-covertor]:col-span-1"
      >
        <Label>{codeDictionary.code_convert_to_language_label}</Label>
        <InfoItemBox text="C#" />
      </div>

      <Show>
        <Show.When isTrue={currentFeature === "code-generator"}>
          {/*code explanation input*/}
          <div className="col col-span-2 gap-2">
            <Label htmlFor="generate-code-textarea">
              {codeDictionary.generate_code_textarea_label}
            </Label>
            <InfoItemBox text="test" />
          </div>
        </Show.When>

        <Show.Else>
          {/* code input */}
          <div className="col col-span-2 gap-2">
            <Label>
              {currentFeature === "code-explainer"
                ? codeDictionary.explainer_code_input_label
                : codeDictionary.code_convert_code_input_label}
            </Label>
            <InfoItemBox text="test" />
          </div>
        </Show.Else>
      </Show>

      <div className="col col-span-1 gap-2">
        <Label>{codeDictionary.want_select_label}</Label>
        <InfoItemBox text="To Convert + Explanation" />
      </div>

      {/*output language select*/}
      <div className="col col-span-1 gap-2">
        <Label>{codeDictionary.output_language_select_label}</Label>
        <InfoItemBox text="English" />
      </div>
    </div>
  );
}

export default HistoryInformationContent;
