import { useCallback, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  type InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { stopResponding } from "@/services/general";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useWorkspaceStore } from "@/stores/zustand/workspace";

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
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const abortControllerRef = useRef<AbortController | null>(null);
  //get the workspace id that is set in the editor header
  const worskapceID = useWorkspaceStore.use.workspaceID()
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, ...props } = useMutation({
    async mutationFn(requestBody: MutationParams & T) {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      await fetchEventSource(process.env.NEXT_PUBLIC_API_URL + endpoint, {
        method: "POST",
        onmessage(event) {
          // console.log(event);
          const json = event.data;
          if (json) {
            const { content } = JSON.parse(json);
            content && setMessage(prev => prev + content);
          }
        },
        body: JSON.stringify({
          ...requestBody,
          workspace_id: worskapceID? worskapceID :session!.user.workspace.id!,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session!.user.accessToken}`,
        },
        signal,
        onerror(error) {
          console.error(error);
        },
      });
    },
    onSuccess() {
      setIsSuccess(true);
      queryClient.invalidateQueries(invalidationQuery); // Invalidate the query to trigger a refetch
    },
  });

  const resetMessage = useCallback(() => {
    setMessage("");
  }, []);

  if (isSuccess) {
    setConversationHistory(prev => [...prev, message]);
    setIsSuccess(false)
  }

  const generateStream = useCallback(
    (requestBody: MutationParams & T) => {
      resetMessage();
      mutate(requestBody);
    },
    [mutate, resetMessage],
  );

  const cancelStream = useCallback(() => {
    abortControllerRef.current?.abort();
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
