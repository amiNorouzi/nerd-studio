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
  const uuid = session?.user.sub;

  useEffect(() => {
    if (!eventSource.current && uuid) {
      eventSource.current = new EventSource(
        `http://5.78.55.161:8000/events/${uuid}`,
      );
      eventSource.current.addEventListener(eventName, event => {
        if (event.data) {
          const data = JSON.parse(event.data);
          onMessage?.(data.content);
          if (data.content) setMessage(prev => prev + data.content);
        }
      });

      eventSource.current.onerror = ev => {
        console.error("Error on events chanel: ", ev);
      };
    }
  }, [eventName, onMessage, uuid]);

  return {
    message,
    reset() {
      setMessage("");
    },
  };
}

const eventChanelService = {
  useEventChanel,
};

export default eventChanelService;
