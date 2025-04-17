"use client";

import { useEffect, useState, useRef } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";
import React from "react";
import { toast } from "react-toastify";
import { useNotification } from "../context/NotificationContext";
import { Send } from "lucide-react";


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
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Timer for typing timeout
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { notifyInfo,notifySuccess } = useNotification();


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
      "event" in lastJsonMessage
    ) {
      const event = (lastJsonMessage as any).event;

      if (event === "typing" && "name" in lastJsonMessage) {
        const name = (lastJsonMessage as any).name as string;

        if (name !== myUser?.name) {
          setTypingUser(name);
          setIsTyping(true);

          // Clear previous timeout
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }

          // Set new timeout to stop showing "typing"
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            setTypingUser(null);
          }, 3000);
        }
      }

      if (
        event === "chat_message" &&
        "name" in lastJsonMessage &&
        "body" in lastJsonMessage
      ) {
        const name = (lastJsonMessage as any).name as string;
        const body = (lastJsonMessage as any).body as string;

        const message: MessageType = {
          id: "",
          name,
          body,
          sent_to: otherUser as UserType,
          created_by: myUser as UserType,
          conversationId: conversation.id,
        };

        setRealtimeMessages((prev) => [...prev, message]);
        // 👉 Show notification (if message not from you)
        if (name !== myUser?.name) {
          notifyInfo(`${name} sent you a message`);
        }
        scrollToBottom();
      }
    }
    
  }, [lastJsonMessage]);

  const sendMessage = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    sendJsonMessage({
      event: "typing",
      data: {
        name: myUser?.name,
      },
    });
  };

  const typingUserData = conversation.users?.find((u) => u.name === typingUser);

  useEffect(() => {
    // Cleanup the timer when the component is unmounted
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim()) {
      sendMessage();
    }
  };


  return (
    <>
      <div
        ref={messagesDiv}
        className="max-h-[400px] overflow-auto flex flex-col space-y-3 p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
      >
        {messages.map((message, index) => (
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
                src={message.created_by.avatar_url || "/profile_pic_1.jpg"}
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

        {isTyping && typingUser && typingUserData && (
          <div className="mt-2 flex items-center space-x-3 px-5">
            <img
              src={typingUserData.avatar_url || "/profile_pic_1.jpg"}
              alt={typingUserData.name}
              className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">
                {typingUserData.name}
              </span>
              <div className="flex space-x-1 mt-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.1s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.3s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 py-3 px-5 bg-white flex border border-gray-300 rounded-lg shadow-md ">
        <input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type your message..."
          className=" p-2 w-[90%] bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb text-gray-700 transition duration-200"
          value={newMessage}
          onChange={handleInputChange}
        />
        <div className="w-[7%]">
          <CustomButton
            label={
              <div className="flex items-center justify-center space-x-2">
                <Send size={18} className="ml-1" />
              </div>
            }
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`ml-4 bg-airbnb text-white font-semibold rounded-lg 
        hover:bg-airbnb-dark active:bg-airbnb-dark transition duration-300 shadow-md 
        ${!newMessage.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
      </div>
    </>
  );
};

export default ConversationDetail;
