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
        className="max-h-[400px] overflow-auto flex flex-col space-y-3 p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
      >
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`w-[75%] py-3 px-5 rounded-xl transition-transform duration-200 ease-in-out ${
              message.created_by.name === myUser?.name
                ? "ml-[25%] bg-blue-100 hover:bg-blue-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={message?.created_by?.avatar_url || "/profile_pic_1.jpg"}
                alt={message.created_by.name}
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              />
              <div>
                <p className="font-semibold text-gray-600">
                  {message.created_by.name === myUser?.name
                    ? "You"
                    : message.created_by.name}
                </p>
                <p className="text-gray-700 text-sm">{message.body}</p>
              </div>
            </div>
          </div>
        ))}

        {realtimeMessages.map((message, index) => (
          <div
            key={index}
            className={`w-[75%] py-3 px-5 rounded-xl transition-all duration-200 ease-in-out ${
              message.name === myUser?.name
                ? "ml-[25%] bg-blue-100 hover:bg-blue-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={
                  message.name === myUser?.name
                    ? message.created_by.avatar_url
                    : message.sent_to.avatar_url || "/profile_pic_1.jpg"
                }
                alt={message.name}
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              />
              <div>
                <p className="font-semibold text-gray-600">
                  {message.name === myUser?.name ? "You" : message.name}
                </p>
                <p className="text-gray-700 text-sm">{message.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 py-3 px-5 flex border border-gray-300 rounded-lg shadow-md bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb text-gray-700 transition duration-200"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <CustomButton
          label="Send"
          onClick={sendMessage}
          className="ml-4 w-[80px] bg-airbnb text-white font-semibold rounded-lg hover:bg-airbnb-dark active:bg-airbnb-dark transition duration-300 shadow-md"
        />
      </div>
    </>
  );
};

export default ConversationDetail;
