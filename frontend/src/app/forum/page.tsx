import Input from "@/components/Input";
import "./forum.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Forum() {
  return (
    <div className="w-9/12 mt-28">
      <div className="forum-background" />
      <div className="flex flex-col">
        <span className="text-4xl text-center mt-2">Forum</span>
        <span className="text-center text-xl/10 text-neutral-600">Discuss different topics, chat with others, share ideas and help others.</span>
      </div>

      <div className="border border-1 mt-12">
        <div className="px-3 py-1 bg-gray-900 text-white font-semibold">
          <span>Shoutbox</span>
        </div>
        <div className="forum-shoutbox-content p-3">
          <p><span className="text-emerald-500">peto123451: </span>su zli</p>
          <p><span className="text-emerald-500">miat: </span>suhlasim</p>
          <p><span className="text-emerald-500">LSk: </span>ja nesuhlasim</p>
        </div>
        <div className="flex border-t">
          <button className="bg-gray-900 text-white px-4 flex items-center">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="hidden lg:inline-block ms-2">Send</span>
          </button>
          <Input type="text" className="border-none" placeholder="Type something to communicate with other users..." />
        </div>
      </div>
    </div>
  );
}