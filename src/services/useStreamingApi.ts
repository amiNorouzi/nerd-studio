import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import {
  type InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { stopResponding } from "@/services/general";
import { fetchEventSource } from "@microsoft/fetch-event-source";

type StreamParams = {
  invalidationQuery: InvalidateQueryFilters;
  endpoint: string;
  appType: AppsType;
};

type MutationParams = Omit<
  OpenAiCompletionSchemaInput,
  "stream" | "workspace_id"
>;

export default function useStream<T>({ invalidationQuery, endpoint, appType }: StreamParams) {
  const queryClient = useQueryClient();
  const [conversationHistory, setConversationHistory] = useState<T[]>([]);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const { mutate, ...props } = useMutation({
    async mutationFn(requestBody: MutationParams) {
      await fetchEventSource(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "POST",
        onmessage(event) {
          console.log(event);
          const json = event.data;
          if (json) {
            const { content } = JSON.parse(json);
            content && setMessage(prev => prev + content);
          }
        },
        body: JSON.stringify({
          ...requestBody,
          workspace_id: session!.user.workspace.id!,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session!.user.accessToken}`,
        },
        onerror(error) {
          console.error(error);
        },
      });
    },
    onSuccess(data: any) {
      setConversationHistory(prev => [...prev, data]);
      queryClient.invalidateQueries(invalidationQuery); // Invalidate the query to trigger a refetch
    },
  });

  const resetMessage = useCallback(() => {
    setMessage("");
  }, []);

  const generateStream = useCallback(
    (requestBody: MutationParams) => {
      resetMessage();
      mutate(requestBody);
    },
    [mutate, resetMessage],
  );

  const cancelStream = useCallback(() => {
    return stopResponding(appType);
  }, [appType]);

  return {
    message,
    resetMessage,
    generateStream,
    cancelStream,
    conversationHistory,
    ...props,
  };
}
