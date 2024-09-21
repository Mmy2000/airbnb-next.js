import Image from "next/image";
import Link from "next/link";
import Conversations from "../components/inbox/Conversation";

const MyInbox = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 space-y-4">
      <h1 className="my-6 text-2xl">My Inbox</h1>
      <Conversations/>
      <Conversations/>
      <Conversations/>
      
    </main>
  );
};

export default MyInbox;
