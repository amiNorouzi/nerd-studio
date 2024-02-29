import { getServerSession } from "next-auth";

import ChatCard from "@/components/pages/chat/componets/ChatCard";

/**
 * List of chat messages used in chat page
 * contains user and chatbot messages
 * TODO: replace with real data from api and map through it
 * @constructor
 */

export async function ChatList() {
  const bot = "Chat Gpt";
  const session = await getServerSession();

  return (
    <div className="col flex-grow gap-6 pb-6">
      <ChatCard
        chatItem={{
          name: session?.user?.name || "",
          image: session?.user?.image || "",
          message: "Tell me about your Iran",
          isBot: false,
          id: "1",
        }}
      />
      <ChatCard
        chatItem={{
          name: bot,
          image: "/images/gpt.jpeg",
          message:
            "Iran, officially known as the Islamic Republic of Iran, is a country located in Western Asia. It is bordered by Armenia, Azerbaijan, Turkmenistan, and the Caspian Sea to the north, Afghanistan and Pakistan to the east, Turkey and Iraq to the west, and the Persian Gulf and the Gulf of Oman to the south.\n" +
            "\n" +
            "Iran has a rich history dating back thousands of years, with a significant influence on global culture, art, and science. The country is known for its ancient Persian Empire, which was one of the largest empires in history. Iran is also home to a diverse population, with a majority of the population being Persian, but also including significant ethnic minorities such as Azeris, Kurds, Arabs, and Balochs.\n" +
            "\n" +
            "The capital of Iran is Tehran, which is the largest city in the country and serves as its political and cultural center. Iran is a predominantly Muslim country, with the majority of the population practicing Shia Islam.\n" +
            "\n" +
            "Iran is known for its beautiful architecture, stunning landscapes, and rich cultural heritage. The country is also a major player in the global oil industry, with significant reserves of oil and natural gas. However, Iran has faced economic challenges due to international sanctions and political tensions with other countries.",
          isBot: true,
          id: "1",
        }}
      />

      <ChatCard
        chatItem={{
          name: session?.user?.name || "",
          image: session?.user?.image || "",
          message: "About iran food",
          isBot: false,
          id: "1",
        }}
      />
      <ChatCard
        chatItem={{
          name: bot,
          image: "/images/gpt.jpeg",
          message:
            "Iranian cuisine is a blend of various culinary traditions that have developed over centuries within the cultural sphere of Iran. It is known for its use of fresh herbs, fruits, vegetables, and spices, as well as its intricate cooking techniques.",
          isBot: true,
          id: "1",
        }}
      />
    </div>
  );
}
