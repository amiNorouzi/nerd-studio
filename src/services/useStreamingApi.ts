import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  type InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { fetchEventSource } from "@microsoft/fetch-event-source";

interface StreamParams {
  invalidationQuery: InvalidateQueryFilters;
  endpoint: string;
  eventName: EventName;
}

export default function useStream<T>({
  invalidationQuery,
  endpoint,
  eventName,
}: StreamParams) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [conversationHistory, setConversationHistory] = useState<T[]>([]);
  const [message, setMessage] = useState("");

  const { mutate,data, ...props } = useMutation({
    async mutationFn(requestBody: OpenAiCompletionSchemaInput) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >(
        `http://5.78.55.161:8000/v1/api/ai_writers/test/`,
        {
          ...requestBody,
          workspace_id: session?.user.workspace.id!,
          document_name: eventName,
        },
        {
          headers:{
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          },

        },
      );

      return data as T;
    },
    onSuccess(data) {
      setConversationHistory(prev => [...prev, data]);
      queryClient.invalidateQueries(invalidationQuery); // Invalidate the query to trigger a refetch
    },
  });

  // const { message, resetMessage, cancelStream } = useEventChanel({
  //   eventName,
  // });
  // const { data: session } = useSession();
  const uuid = session?.user.sub;

  const generateStream = useCallback(
    (requestBody: OpenAiCompletionSchemaInput) => {
      // resetMessage();
      mutate(requestBody);

      // fetchEventSource(`http://5.78.55.161:8000/v1/api/ai_writers/test/`, {
      //   method: 'POST',
      //   onmessage(msg) {
      //     const message = (JSON.parse(msg.data).content);
      //     if (message) {
      //       setMessage(prev => prev + message);
      //     }
      //
      //   },
      // });
    },
    [mutate],
  );

  return {
    message,
    resetMessage: () => {},
    generateStream,
    cancelStream: () => {},
    conversationHistory,data,
    ...props,
  };
}
