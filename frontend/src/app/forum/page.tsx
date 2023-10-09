import Input from "@/components/Input";
import Link from "next/link";
import Section from "@/components/Section";
import "./forum.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Forum() {
  return (
    <div className="w-9/12 mt-12">
      <div className="forum-background" />
      <div className="flex flex-col">
        <span className="text-4xl text-center mt-2">Forum</span>
        <span className="text-center text-xl/10 text-neutral-600">Discuss different topics, chat with others, share ideas and help others.</span>
      </div>

      <Section header="Shoutbox" className="mt-12">
        <div className="forum-shoutbox-content p-3">
          <p>
            <span className="text-emerald-500">peto123451: </span>su zli<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
          <p>
            <span className="text-emerald-500">peto123451: </span>su zli<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
          <p>
            <span className="text-emerald-500">peto123451: </span>su zli<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
          </p>
          <p>
            <span className="text-emerald-500">peto123451: </span>su zli<span className="ms-1 text-xs italic text-gray-300">• 5 seconds ago</span>
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
        <Link href="#" className="hover:bg-gray-200 border-l-4 border-l-fuchsia-500 border-b px-3 py-6 grid grid-cols-4">
          <div className="flex flex-col col-span-2">
            <span className="font-bold">News</span>
            <span className="text-gray-500">Articles about new updates on web.</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="font-bold">300</span>
            <span className="text-gray-500">Threads</span>
          </div>
          <div className="flex flex-col self-center">
            <span className="font-bold text-xs">How to int in lol [MEGATHREAD]</span>
            <span>
              <span className="text-gray-500 text-sm">5 April 2023 • Miat</span>
            </span>
          </div>
        </Link>
        <Link href="#" className="hover:bg-gray-200 border-l-4 border-l-red-500 border-b px-3 py-6 grid grid-cols-4">
          <div className="flex flex-col col-span-2">
            <span className="font-bold">General</span>
            <span className="text-gray-500">General discussion about any topic.</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="font-bold">300</span>
            <span className="text-gray-500">Threads</span>
          </div>
          <div className="flex flex-col self-center">
            <span className="font-bold text-xs">How to int in lol [MEGATHREAD]</span>
            <span>
              <span className="text-gray-500 text-sm">5 April 2023 • Miat</span>
            </span>
          </div>
        </Link>
        <Link href="#" className="hover:bg-gray-200 border-l-4 border-l-emerald-500 px-3 py-6 grid grid-cols-4">
          <div className="flex flex-col col-span-2">
            <span className="font-bold">Media</span>
            <span className="text-gray-500">Share images and videos on various topics.</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="font-bold">300</span>
            <span className="text-gray-500">Threads</span>
          </div>
          <div className="flex flex-col self-center">
            <span className="font-bold text-xs">How to int in lol [MEGATHREAD]</span>
            <span>
              <span className="text-gray-500 text-sm">5 April 2023 • Miat</span>
            </span>
          </div>
        </Link>
      </Section>
    </div>
  );
}