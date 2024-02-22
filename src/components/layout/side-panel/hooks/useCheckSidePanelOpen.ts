import useMobileSize from "@/hooks/useMobileSize";
import { useUiStore } from "@/stores/zustand/ui-store";

// check of side panel open by hover or expand button
function useCheckSidePanelOpen() {
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();
  const isHoverOnSidePanel = useUiStore.use.isHoverOnSidePanel();
  const isMobile = useMobileSize();

  //don't open side panel on mobile size
  return (isSidePanelOpen && !isMobile) || isHoverOnSidePanel;
}
export default useCheckSidePanelOpen;
