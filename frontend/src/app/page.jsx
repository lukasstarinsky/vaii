'use client';

import Input from "@/components/Input";
import Section from "@/components/Section";
import ForumCategory from "@/components/forum/ForumCategory";
import ForumHeader from "@/components/forum/ForumHeader";
import AuthSecure from "@/components/AuthSecure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { socket } from "@/utilities/socket";
import "./forum.css";

const Forum = () => {
  const divRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("new-message", (newMessage) => {
      newMessage = {
        ...newMessage,
        posted: new Date().toLocaleString("sk-SK")
      };
      setMessages(curr => [...curr, newMessage]);
    });
    
    return () => {
      socket.disconnect();
    }
  }, []);
  
  useEffect(() => {    
    divRef.current.scrollTo({ top: messages.length * 90, behavior: "smooth" });
  }, [messages]);

  const SendMessage = (event) => {
    event.preventDefault();

    if (message.length > 0) {
      socket.emit("message", message);
      setMessage("");
    }
  }

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header="Forum" description="Discuss different topics, chat with others, share ideas and help others." />

      <Section header="Shoutbox" className="mt-12">
        <div className="forum-shoutbox-content p-3 text-sm" ref={divRef}>
          { messages && messages.length > 0 ? messages.map((inMessage, i) => (
              inMessage.author == "SYSTEM" ?
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

export default AuthSecure(Forum); 