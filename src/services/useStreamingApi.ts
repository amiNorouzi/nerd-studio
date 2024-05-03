import { useCallback, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import useEventChanel from "@/services/events-chanel";

export function useStream<T>({
  invalidationKey,
  endpoint,
  eventName,
}: {
  invalidationKey: InvalidateQueryFilters;
  endpoint: string;
  eventName: string;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [conversationHistory, setConversationHistory] = useState<T[]>([]);

  const { mutate, ...props } = useMutation({
    async mutationFn(requestBody: OpenAiCompletionSchemaInput) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >(endpoint, {
        ...requestBody,
        workspace_id: session?.user.workspace.id!,
        document_name: eventName,
      });

      return data as T;
    },
    onSuccess: data => {
      setConversationHistory(prev => [...prev, data]);
      queryClient.invalidateQueries(invalidationKey); // Invalidate the query to trigger a refetch
    },
  });

  const { message, resetMessage, cancelStream } = useEventChanel({
    eventName,
  });

  const generateStream = useCallback(
    (requestBody: OpenAiCompletionSchemaInput) => {
      if (requestBody.messages && requestBody.messages.length > 0) {
        resetMessage();
        mutate(requestBody);
      }
    },
    [mutate, resetMessage],
  );

  return {
    message,
    resetMessage,
    generateStream,
    cancelStream,
    conversationHistory,
    ...props,
  };
}
