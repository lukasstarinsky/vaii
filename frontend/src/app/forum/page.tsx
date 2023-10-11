import Input from "@/components/Input";
import Section from "@/components/Section";
import ForumCategory from "@/components/forum/ForumCategory";
import "./forum.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Forum() {
  return (
    <div className="w-full px-2 sm:px-0 sm:w-9/12 mt-12">
      <div className="forum-background" />
      <div className="flex flex-col">
        <span className="text-4xl text-center mt-2">Forum</span>
        <span className="text-center text-xl/10 text-neutral-600">Discuss different topics, chat with others, share ideas and help others.</span>
      </div>

      <Section header="Shoutbox" className="mt-12">
        <div className="forum-shoutbox-content p-3 text-sm">
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
        <ForumCategory color="fuchsia-500" title="News" description="Articles about new updates on web." />
        <ForumCategory color="red-500" title="General" description="General discussion about any topic." />
        <ForumCategory color="emerald-500" title="Media" description="Share images and videos on various topics." />
      </Section>
      <Section header="General" className="my-10" contentClassName="p-3">
        <ForumCategory color="fuchsia-500" title="News" description="Articles about new updates on web." />
        <ForumCategory color="red-500" title="General" description="General discussion about any topic." />
        <ForumCategory color="emerald-500" title="Media" description="Share images and videos on various topics." />
      </Section>
    </div>
  );
}