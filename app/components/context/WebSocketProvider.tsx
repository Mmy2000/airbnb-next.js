"use client";

import React, { createContext, useContext, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { toast } from "react-toastify";

interface WebSocketContextProps {
  sendJsonMessage: (msg: any) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

export const WebSocketProvider = ({
  children,
  token,
  userId,
}: {
  children: React.ReactNode;
  token: string | null;
  userId: string | null;
}) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_HOST}/ws/global/?token=${token}`,
    {
      share: true,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "event" in lastJsonMessage
    ) {
      const event = (lastJsonMessage as any).event;

      if (event === "chat_message") {
        const data = lastJsonMessage as any;
        const { name, body, sent_to_id } = data;

        if (sent_to_id === userId) {
          toast.info(`${name} sent you a message`);
          console.log("New message received:", data);
        }
      }
    }
  }, [lastJsonMessage, userId]);

  return (
    <WebSocketContext.Provider value={{ sendJsonMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useGlobalSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useGlobalSocket must be used within WebSocketProvider");
  }
  return context;
};
