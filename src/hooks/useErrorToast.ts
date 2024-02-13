import { isAxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";

//hook for show error toast to user
//normal error toast with given and fetch error toast get from axios api cal error

const useErrorToast = () => {
  const { toast } = useToast();

  /**
   * show given message as toast with red failed title and red border
   * @param message error message show as toast description
   */
  const showError = (message: string) => {
    toast({
      title: "Failed",
      description: message,
      className:
        "border-red-400 rounded-lg error-toast bg-popover first-letter:capitalize",
    });
  };

  /**
   * show error message returned from axios api call
   * @param error if is axios error extract message from it
   */
  const showFetchError = (error: any) => {
    if (isAxiosError(error)) {
      if (!error.response) {
        if (error.message === "Network Error") {
          return showError("It is not possible to connect to the server");
        } else {
          return showError(error.message);
        }
      }
      if (error.response.data.message.indexOf("logout#") !== -1) {
        showError(
          error.response.data.message.slice(
            error.response.data.message.indexOf("logout#") + 7,
          ),
        );
      } else {
        showError(error.response.data.message);
      }
    }
  };

  return { showError, showFetchError };
};

export default useErrorToast;
