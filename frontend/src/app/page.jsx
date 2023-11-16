'use client';

import Input from "@/components/Input";
import Section from "@/components/Section";
import ForumCategory from "@/components/forum/ForumCategory";
import ForumHeader from "@/components/forum/ForumHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";
import "./forum.css";

export default function Forum() {
  const userStore = useUserStore();

  if (!userStore.user) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header="Forum" description="Discuss different topics, chat with others, share ideas and help others." />

      <Section header="Shoutbox" className="mt-12">
        <div className="forum-shoutbox-content p-3 text-sm">
          <p>
            <span className="text-emerald-500">peto123451: </span>test<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
          <p>
            <span className="text-emerald-500">lukas: </span>test2<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
          <p>
            <span className="text-emerald-500">peto123451: </span>test3<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
          <p>
            <span className="text-emerald-500">lukas: </span>test4<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
        </div>
        <div className="flex border-t border-gray-900">
          <button className="bg-gray-900 text-white px-4 flex items-center">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="hidden lg:inline-block ms-2">Send</span>
          </button>
          <Input type="text" className="border-none" placeholder="Type something to communicate with other users..." />
        </div>
      </Section>

      <Section header="General" className="my-10" contentClassName="p-3">
        <ForumCategory style="border-l-fuchsia-500" title="news" description="Articles about new updates on web." />
        <ForumCategory style="border-l-red-500" title="general" description="General discussion about any topic." />
        <ForumCategory style="border-l-emerald-500" title="media" description="Share images and videos on various topics." />
      </Section>
      <Section header="General" className="my-10" contentClassName="p-3">
        <ForumCategory style="border-l-fuchsia-500" title="news" description="Articles about new updates on web." />
        <ForumCategory style="border-l-red-500" title="general" description="General discussion about any topic." />
        <ForumCategory style="border-l-emerald-500" title="media" description="Share images and videos on various topics." />
      </Section>
    </div>
  );
}