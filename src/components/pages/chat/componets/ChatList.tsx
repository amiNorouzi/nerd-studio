"use client";
import { UserMessageCard } from "./UserMessageCard";
import { useSession } from "next-auth/react";
import { AssistMessageCard } from "@/components/pages/chat/componets/AssistMessageCard";

/**
 * List of chat messages used in chat page
 * contains user and chatbot messages
 * TODO: replace with real data from api and map through it
 * @constructor
 */

export async function ChatList() {
  const { data: session } = useSession();
  return (
    <div className="col  w-full max-w-4xl flex-grow gap-6 pb-6 ">
      {data.map(item => {
        const image = session?.user?.image ?? item[0].image;
        const name = session?.user?.name ?? item[0].name;
        return (
          <>
            <UserMessageCard
              key={item[0].id}
              {...item[0]}
              image={image}
              name={name}
            />

            <AssistMessageCard key={item[1].id} {...item[1]} />
          </>
        );
      })}
    </div>
  );
}

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
