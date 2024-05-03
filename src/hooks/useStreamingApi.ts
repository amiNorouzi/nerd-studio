import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

const EventListenerBaseApi = "http://5.78.55.161:8000/events";

export function useStream<T>({envalidationKey, endpoint, eventName}:{
  envalidationKey:InvalidateQueryFilters;
  endpoint:string;
  eventName:string;
  }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState<T[]>([]);
  const eventSource = useRef<EventSource | null>(null);
  const uuid = session?.user.sub;
  
  const { mutate, ...props } = useMutation({
    mutationFn: async (requestBody: OpenAiCompletionSchemaInput) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >(endpoint, {
        ...requestBody,
        workspace_id: session?.user.workspace.id!,
        document_name: eventName
      });

      return data as T;
    },
    onSuccess: (data) => {
      setConversationHistory(prev => [...prev, data]);
      queryClient.invalidateQueries(envalidationKey); // Invalidate the query to trigger a refetch
    },
  });

  const generateStream = useCallback((requestBody: OpenAiCompletionSchemaInput) => {
    if (requestBody.messages && requestBody.messages.length > 0) {
      setMessage("");
      mutate(requestBody);
    }
  },[mutate]);

  const cancelStream = useCallback(() => {
    if (eventSource.current) {
      eventSource.current.close();
      eventSource.current = null;
    }
  }, []);

  const resetMessage = useCallback(()=> {
    setMessage("");
  },[]);

  useEffect(() => {
    if (!eventSource.current && uuid) {
      eventSource.current = new EventSource(
        `${EventListenerBaseApi}/${uuid}`,
      );
      eventSource.current.addEventListener(eventName, event => {
        if (event.data) {
          const data = JSON.parse(event.data);
          if (data.content) setMessage(prev => prev + data.content);
        }
      });
    }
    return () => {
      cancelStream();
    };
  }, [cancelStream, eventName, uuid]);

  return {
    message,
    resetMessage,
    generateStream,
    cancelStream,
    conversationHistory,
    ...props
  };
}
