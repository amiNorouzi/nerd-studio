"use client";
import { UserMessageCard } from "./UserMessageCard";
import { useSession } from "next-auth/react";
import { AssistMessageCard } from "@/components/pages/chat/componets/AssistMessageCard";

/**
 * List of chat messages used in chat page
 * contains user and chatbot messages
 * give list of conversition of user and bot 
 * @constructor
 */
interface Props {
  messages: {
    image: string;
    name: string;
    prompt: string[];
    timeLine: string;
    id: string;
    role: string;
  }[];
}
export function ChatList({ messages }: Props) {
  const { data: session } = useSession();
  
  return (
    <div className="col w-full max-w-[760px] flex-grow gap-6 pb-6 ">
      {messages.map(item => {
        // TODO: set the defult pic for the user
        const image = session?.user?.image ?? "";
        const name = session?.user?.name ?? "";

        return (
          <div key={item.id} className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
            {item.role === "user" && (
              <UserMessageCard
                timeLine={""}
                prompt={item.prompt}
                image={"/images/gemni.jpeg"}
                name={name}
                id={item.id}
                role="user"
              />
            )}
            {item.role === "assistance" || item.role === "assistant" && (
              <AssistMessageCard
                timeLine={""}
                prompt={item.prompt}
                image={image}
                name={name}
                id={item.id}
                role="user"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// its dumy text
const contantPropmt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n";
const constantPrompt2 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const data = Array.from({ length: 5 }, (v, i) => {
  return [
    {
      id: String(i),
      prompt: Array.from({ length: 3 }, (v, i) => `${contantPropmt} ${i}`),
      image: "/images/logo.png",
      timeLine: "5 Min ago",
      name: "kasra",
      role: "user",
    },
    {
      id: String(i) + "answer",
      prompt: Array.from({ length: 3 }, (v, i) => `${constantPrompt2} ${i}`),
      image: "/images/gemni.jpeg",
      timeLine: "5 Min ago",
      name: "kasra",
      role: "assistance",
    },
  ];
});
