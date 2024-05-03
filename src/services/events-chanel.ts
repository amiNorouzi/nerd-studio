import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

const EventListenerBaseApi = "http://5.78.55.161:8000/events";

type EventChanelParams = {
  eventName: string;
};

export default function useEventChanel({ eventName }: EventChanelParams) {
  const [message, setMessage] = useState("");
  const eventSource = useRef<EventSource | null>(null);
  const { data: session } = useSession();
  const uuid = session?.user.sub;

  const cancelStream = useCallback(() => {
    if (eventSource.current) {
      eventSource.current.close();
      eventSource.current = null;
    }
  }, []);

  const resetMessage = useCallback(() => {
    setMessage("");
  }, []);

  useEffect(() => {
    if (!eventSource.current && uuid) {
      eventSource.current = new EventSource(`${EventListenerBaseApi}/${uuid}`);
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
  //     });
  //
  //     eventSource.current.onerror = ev => {
  //       // console.error("Error on events chanel: ", ev);
  //     };
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
