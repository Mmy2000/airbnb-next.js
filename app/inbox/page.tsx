import React, { useState, useEffect } from "react";
import Conversations from "../components/inbox/Conversation";
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
};

const MyInbox = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }
  const conversations = await apiService.get("/api/chat/");
  
  return (
    <main className="max-w-[800px] mx-auto px-6 space-y-4">
      <h1 className="my-6 text-2xl">My Inbox</h1>
      {conversations?.map((conversation: ConversationType) => {
        return (
          <Conversations
            userId={userId}
            key={conversation.id}
            conversation={conversation}
          />
        );
      })}
    </main>
  );
};

export default MyInbox;
