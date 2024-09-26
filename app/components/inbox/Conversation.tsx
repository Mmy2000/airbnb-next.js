"use client";

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}
const Conversations: React.FC<ConversationProps> = ({
  conversation,
  userId,
}) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id != userId);
  return (
    <div className="px-6 py-4 cursor-pointer border flex items-center space-x-4 border-gray-300 rounded-xl">
      <img
        src={otherUser?.avatar_url} // Ensure the image URL is available in the message data
        alt={otherUser?.name}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <p className="mb-6 text-xl">{otherUser?.name}</p>

        <p
          onClick={() => router.push(`/inbox/${conversation.id}`)}
          className="text-airbnb-dark"
        >
          Go to conversation
        </p>
      </div>
    </div>
  );
};

export default Conversations;
