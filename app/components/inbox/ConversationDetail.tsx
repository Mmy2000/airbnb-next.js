"use client";

import { useEffect, useState, useRef } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";
import React from "react";


interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
  messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  userId,
  token,
  messages,
  conversation,
}) => {
  const messagesDiv = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const myUser = conversation.users?.find((user) => user.id == userId);
  const otherUser = conversation.users?.find((user) => user.id != userId);
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("Connection state changed", readyState);
  }, [readyState]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage
    ) {
      const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
        conversationId: conversation.id,
      };

      setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
    }

    scrollToBottom();
  }, [lastJsonMessage]);

  const sendMessage = async () => {
    console.log("sendMessage"),
      sendJsonMessage({
        event: "chat_message",
        data: {
          body: newMessage,
          name: myUser?.name,
          sent_to_id: otherUser?.id,
          conversation_id: conversation.id,
        },
      });

    setNewMessage("");


    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };

  return (
    <>
      <div
        ref={messagesDiv}
        className="max-h-[400px] overflow-auto flex flex-col space-y-4"
      >
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] py-2 px-6 rounded-xl ${
              message.created_by.name == myUser?.name
                ? "ml-[20%] bg-blue-200"
                : "bg-gray-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={message?.created_by?.avatar_url || "/profile_pic_1.jpg"} // Ensure the image URL is available in the message data
                alt={message.created_by.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-bold text-gray-500">
                  {message.created_by.name == myUser?.name
                    ? "You"
                    : message.created_by.name}
                </p>
                <p>{message.body}</p>
              </div>
            </div>
          </div>
        ))}

        {realtimeMessages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] py-2 px-6 rounded-xl ${
              message.name == myUser?.name
                ? "ml-[20%] bg-blue-200"
                : "bg-gray-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={message.name == myUser?.name?message.created_by.avatar_url:message.sent_to.avatar_url || "/profile_pic_1.jpg"} // Use the avatar_url from the realtimeMessages
                alt={message.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-bold text-gray-500">
                  {message.name === myUser?.name ? "You" : message.name}
                </p>
                <p>{message.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 bg-gray-200 rounded-xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <CustomButton label="Send" onClick={sendMessage} className="w-[80px]" />
      </div>
    </>
  );
};

export default ConversationDetail;
