import { useEffect, useRef, useState } from "react";

type EventChannelParams = {
  eventName: string;
  onMessage?: (message: string) => void;
  url: string;
};

export function useEventChannel({ eventName, onMessage, url }: EventChannelParams) {
  const [message, setMessage] = useState("");
  const eventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    eventSource.current = new EventSource(`${url}`);
    eventSource.current.addEventListener(eventName, (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.content) {
        onMessage?.(data.content);
        setMessage((prev) => prev + data.content);
      }
    });

    return () => {
      eventSource.current?.close();
      eventSource.current = null;
    };
  }, [eventName, onMessage, url]);

  const resetMessage = () => setMessage("");

  return { message, resetMessage };
}

export default useEventChannel;
