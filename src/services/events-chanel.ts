import {useCallback, useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {fetchEventSource} from '@microsoft/fetch-event-source';

const EventListenerBaseApi = "http://5.78.55.161:8000/events";

type EventChanelParams = {
  eventName: EventName;
};

let eventSource: any | undefined;
let flag = true;
export default function useEventChanel({ eventName }: EventChanelParams) {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const uuid = session?.user.sub;
  const cancelStream = useCallback(() => {
    // if (eventSource) {
    //   eventSource.close();
    //   eventSource = null;
    // }
  }, []);

  const resetMessage = useCallback(() => {
    setMessage("");
  }, []);

  // useEffect(() => {
  //   if (uuid) {
  //     fetchEventSource(`${EventListenerBaseApi}/${uuid}/`, {
  //       onmessage(msg) {
  //         const message = (JSON.parse(msg.data).content);
  //         if (msg.event === eventName && message) {
  //           setMessage(prev => prev + message);
  //         }

  //       },
  //     });
  //   }
  // }, [eventName, uuid]);

  return {
    message,
    resetMessage,
    cancelStream,
  };
}
