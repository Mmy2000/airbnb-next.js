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
      <main className="max-w-[1500px] mx-auto px-6 py-12">
        <p className="text-center text-red-500">
          You need to be authenticated to view your inbox.
        </p>
      </main>
    );
  }

  const conversations = await apiService.get("/api/chat/");

  return (
    <main className="max-w-[800px] mx-auto px-6 pb-12">
      {/* Navigation (Breadcrumb) */}
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="text-blue-600 hover:underline transition-colors">
          Home
        </a>
        <span className="mx-2 text-gray-400">/</span>
        <span>My Inbox</span>
      </nav>

      {/* Title */}
      <h1 className="my-6 text-4xl font-bold text-gray-900">My Inbox</h1>

      {/* Conversation List */}
      {conversations && conversations.length > 0 ? (
        <div className="space-y-6">
          {conversations.map((conversation: ConversationType) => (
            <Conversations
              userId={userId}
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          You don't have any conversations yet.
        </p>
      )}

      
    </main>
  );
};

export default MyInbox;
