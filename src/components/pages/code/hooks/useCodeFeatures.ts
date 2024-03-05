import { useCustomSearchParams } from "@/hooks";

/**
 * This hook is used to get the current feature from the url search params and set the feature in the url search params
 */
function useCodeFeatures() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  //get the feature from the url search params or use the default feature "code-convertor"
  const currentFeature = searchParams.get("feature") ?? "code-convertor";

  /**
   * This function is used to set the feature in the url search params
   * @param feature the feature to set in the url search params
   */
  const setFeature = (feature: string) => {
    setSearchParams("feature", feature);
  };

  return {
    currentFeature,
    setFeature,
  };
}

export default useCodeFeatures;
