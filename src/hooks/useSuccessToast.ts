import { useToast } from "@/components/ui/use-toast";

//hook for show success toast to user with given message

const useSuccessToast = () => {
  const { toast } = useToast();

  /**
   * show given message as toast with green success title and green border
   * @param message success message show as toast description
   */
  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      className:
        "border-green-400 rounded-lg success-toast bg-popover first-letter:capitalize",
    });
  };

  return { showSuccess };
};

export default useSuccessToast;
