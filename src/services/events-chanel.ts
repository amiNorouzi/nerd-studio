import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

type EventChanelParams = {
  eventName: string;
  onMessage?: (message: string) => void;
};

export function useEventChanel({ onMessage, eventName }: EventChanelParams) {
  const [message, setMessage] = useState("");
  const eventSource = useRef<EventSource>();
  const { data: session } = useSession();

  useEffect(() => {
    if (!eventSource.current) {
      eventSource.current = new EventSource(
        `http://5.78.55.161:8000/events/${session?.user.sub}`,
      );
      eventSource.current.addEventListener(eventName, event => {
        if (event.data) {
          const data = JSON.parse(JSON.parse(event.data));
          onMessage?.(data.content);
          if (data.content) setMessage(prev => prev + data.content);
        }
      });
    }
  }, [eventName, onMessage]);

  return message;
}

const eventChanelService = {
  useEventChanel,
};

export default eventChanelService;
