'use client'
import CustomButton from "../forms/CustomButton";
import { useEffect, useState, useRef } from "react";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";


interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
}

const ConversationDetails: React.FC<ConversationDetailProps> = ({
  conversation,
  token,
  userId
}) => {
  const myUser = conversation.users?.find((user) => user.id == userId);
  const otherUser = conversation.users?.find((user) => user.id != userId);

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
  return (
    <>
      <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
        <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200 ">
          <p className="font-bold text-gray-500">name</p>
          <p>body jfjgjgj</p>
        </div>
        <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200 ">
          <p className="font-bold text-gray-500">recdc</p>
          <p>body jfjgjgj</p>
        </div>
      </div>
      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-3/4 p-2 bg-gray-200 rounded-xl"
        />

        <CustomButton
          label="Send"
          onClick={() => console.log("clicked")}
          className="w-1/4"
        />
      </div>
    </>
  );
};

export default ConversationDetails;
