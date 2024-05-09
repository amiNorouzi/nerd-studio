import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const EventListenerBaseApi = "http://5.78.55.161:8000/events";

type EventChanelParams = {
  eventName: string;
};

const EventListenerBaseApi = "http://5.78.55.161:8000/events";

export default function useEventChanel({ eventName }: EventChanelParams) {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const uuid = session?.user.sub;

  const [sseConnection, setSSEConnection] = useState<EventSource | null>(null);

  const cancelStream = useCallback(() => {
    // if (eventSource) {
    //   eventSource.close();
    //   eventSource = null;
    // }
  }, []);

  const resetMessage = useCallback(() => {
    setMessage("");
  }, []);

  useEffect(() => {
    if (uuid) {
      fetchEventSource(`${EventListenerBaseApi}/${uuid}/`, {
        method: "GET",
        onmessage(msg) {
          const message = JSON.parse(msg.data).content;
          if (msg.event === eventName && message) {
            setMessage(prev => prev + message);
          }
        },
      });
    }
    // return () => {
    //   cancelStream();
    // };
  }, [cancelStream, eventName, uuid]);

  return {
    message,
    resetMessage,
    cancelStream,
  };
}

// export function useEventChanel({ eventName }: EventChanelParams) {
//   const [message, setMessage] = useState("");
//   const eventSource = useRef<EventSource>();
//   const { data: session } = useSession();
//   const uuid = session?.user.sub;

// useEffect(() => {
//   if (!eventSource.current && uuid) {
//     eventSource.current = new EventSource(
//       `http://5.78.55.161:8000/events/${uuid}`,
//     );
//     eventSource.current.addEventListener(eventName, event => {
//       if (event.data) {
//         const data = JSON.parse(event.data);
//         onMessage?.(data.content);
//         if (data.content) setMessage(prev => prev + data.content);
//       }
//       eventSource.current.onerror = ev => {
//         console.error("Error on events chanel: ", ev);
//      };
//     });
//
//
//   }
// }, [eventName, onMessage, uuid]);
//
//   return {
//     message,
//     reset() {
//       // setMessage("");
//     },
//   };
// }
