import ConversationDetails from "@/app/components/inbox/ConversationDetail";
import { getAccessToken, getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import React, { useState, useEffect } from "react";
import { UserType } from "../page";


export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
};

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();
  if (!userId || !token) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }
  
  const conversation = await apiService.get(`/api/chat/${params.id}/`);
  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-6">
      <ConversationDetails
        token={token}
        userId={userId}
        conversation={conversation.conversation}
      />
    </main>
  );
};


export default ConversationPage;