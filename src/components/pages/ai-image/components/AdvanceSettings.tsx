import { DynamicInputsList, ToggleAdvance } from "@/components/shared";

import type { DynamicInput } from "@/stores/zustand/types";
import useInputValue from "@/components/pages/ai-image/hooks/useInputValue";

/**
 * some settings in collapsible div that open and close by switch
 * @constructor
 */
function AdvanceSettings({ settings }: { settings: DynamicInput[] }) {
  const { getValue, changeValue } = useInputValue();
  return (
    <ToggleAdvance>
      <div className="form-gap grid grid-cols-1 sm:grid-cols-2">
        <DynamicInputsList
          components={settings}
          itemClassName="col-span-1 sm:data-[isLast=true]:odd:col-span-2"
          getValue={getValue}
          changeValue={changeValue}
        />
      </div>
    </ToggleAdvance>
  );
}

export default AdvanceSettings;
