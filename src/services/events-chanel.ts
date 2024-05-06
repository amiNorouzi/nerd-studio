import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
    if (sseConnection) {
      sseConnection.close();
      setSSEConnection(null);
    }
  }, [sseConnection]);

  const resetMessage = useCallback(() => {
    setMessage("");
  }, []);

  // Function to take care of initial connect to the SSE API
// Also, it reconnects to the SSE API as soon as it shuts down
// This keeps the connection alive - forever with micro second delays
const connectToStream = useCallback(() => {
  // Connect to /api/stream as the SSE API source
  const eventSource = new EventSource(`${EventListenerBaseApi}/${uuid}`);
  eventSource.onopen = () => {
    console.log('SSE connection opened.');
  };
  
  eventSource.addEventListener(eventName, (event) => {
    const data = JSON.parse(event.data);
    if (data.content) setMessage(prev => prev + data.content);
  });
   // In case of any error, close the event source
    // So that it attempts to connect again
    eventSource.addEventListener('error', () => {
      eventSource.close()
      setTimeout(connectToStream, 1)
    })
    // As soon as SSE API source is closed, attempt to reconnect
    // eventSource.onClose = () => {
    //   setTimeout(connectToStream, 1)
    // }
    return eventSource
},[]);

   useEffect(() => {
    // Initiate the first call to connect to SSE API
    const eventSource = connectToStream()
    // As the component unmounts, close listener to SSE API
    return () => {
      eventSource.close()
    }
  }, []);

  return {
    message,
    resetMessage,
    cancelStream,
  };
}
