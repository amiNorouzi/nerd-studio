import { useEffect, useRef } from "react";

type EventChannelParams = {
  eventName: string;
  onMessage?: (message: string) => void;
  url: string;
  baseUrl?: string;
};

export function useRefEventChannel({ eventName, onMessage, baseUrl = process.env.NEXT_PUBLIC_API_URL, url }: EventChannelParams) {
  const messageRef = useRef("");
  const eventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    eventSource.current = new EventSource(`${baseUrl}/${url}`);
    eventSource.current.addEventListener(eventName, (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.content) {
        onMessage?.(data.content);
        messageRef.current += data.content;
      }
    });

    return () => {
      eventSource.current?.close();
      eventSource.current = null;
    };
  }, [baseUrl, eventName, onMessage, url]);

  const resetMessage = () => (messageRef.current = "");

  return { message:messageRef.current, resetMessage };
}

export default useRefEventChannel;
