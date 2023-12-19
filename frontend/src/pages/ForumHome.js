import ForumCategory from "components/ForumCategory";
import ForumHeader from "components/ForumHeader";
import Section from "components/Section";
import Input from "components/Input";
import * as ForumService from "services/ForumService";
import { socket } from "utilities/socket";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "./ForumHome.css";

export default function ForumHome() {
  const shoutBoxDivRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [categorySummary, setCategorySummary] = useState({});

  useEffect(() => {
    ForumService.GetSummary((data) => {
      setCategorySummary(data);
    });

    socket.connect();
    socket.on("new-message", (newMessage) => {
      newMessage = {
        ...newMessage,
        posted: new Date().toLocaleDateString("sk-SK")
      };
      setMessages(curr => [...curr, newMessage]);
    });

    return function cleanup() {
      socket.disconnect();
    }
  }, []);

  const SendMessage = (event) => {
    event.preventDefault();

    if (message.length > 0) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    shoutBoxDivRef.current.scrollTo({ top: messages.length * 90, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader />

      <span className="hidden text-red-500"></span>

      <Section header="Shoutbox" className="mt-12">
        <div className="forum-shoutbox-content p-3 text-sm" ref={shoutBoxDivRef}>
          { messages && messages.length > 0 ? messages.map((inMessage, i) => (
              inMessage.author === "SYSTEM" ?
                <p key={i} className="break-words border-b-1">
                  <span className="text-xs text-gray-500">{inMessage.posted}: </span>
                  <span className={`${inMessage.color} font-bold`}>{inMessage.message}</span>
                </p>
              :
                <p key={i} className="break-words border-b-1">
                  <span className="text-xs text-gray-500">{inMessage.posted}: </span>
                  <span className="text-emerald-500 font-bold">{inMessage.author}: </span>
                  <span>{inMessage.message}</span>
                </p>
            ))
          : <></>}
        </div>
        <form onSubmit={SendMessage} className="flex border-t border-gray-900">
          <button className="bg-gray-900 text-white px-4 flex items-center" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="hidden lg:inline-block ms-2">Send</span>
          </button>
          <Input type="text" className="border-none" placeholder="Type something to communicate with other users..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}  />
        </form>
      </Section>

      <Section header="General" className="my-10" contentClassName="p-3">
        <ForumCategory data={categorySummary["news"]} style="border-l-fuchsia-500" title="news" description="Articles about new updates on web." />
        <ForumCategory data={categorySummary["general"]} style="border-l-red-500" title="general" description="General discussion about any topic." />
        <ForumCategory data={categorySummary["media"]} style="border-l-emerald-500" title="media" description="Share images and videos on various topics." />
      </Section>
    </div>
  );
}