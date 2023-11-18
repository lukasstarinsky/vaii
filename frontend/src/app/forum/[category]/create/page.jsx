'use client';

import AuthSecure from "@/components/AuthSecure";
import Section from "@/components/Section";
import Input from "@/components/Input";
import ForumHeader from "@/components/forum/ForumHeader";
import TextEditor from "@/components/TextEditor";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ForumThreadCreate = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const params = useParams();

  const categories = {
    news: "Articles about new updates on web.",
    general: "General discussion about any topic.",
    media: "Share images and videos on various topics."
  };
  
  const Test = (event) => {
    event.preventDefault();
    console.log(description);
  };

  useEffect(() => {
    if (!categories[params.category]) {
      router.push("/forum");
    }
  }, []);

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header="Forum" description="Discuss different topics, chat with others, share ideas and help others." />

      <Section className="p-10 my-12" shadow={true}>
        <form onSubmit={Test}>
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
            <Input id="title" type="text" placeholder="Title of your thread..." required minLength="4" autoComplete="off" />
          </div>
          <div className="mt-3">
            <label htmlFor="category" className="block mb-2 text-sm font-medium">Category</label>
            <select id="category" disabled className="bg-neutral-200 text-capitalize focus:outline-none border p-2.5 border-neutral-600 text-black text-sm rounded w-full">
              <option value={params.category}>{params.category}</option>
            </select>
          </div>
          <div className="mt-3">
            <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
            <TextEditor className="bg-white" value={description} onChange={setDescription} />
          </div>
          <div className="mt-2">
            <Input type="submit" value="Create thread" className="mt-3 bg-gray-900 text-white" />
          </div>
        </form>
      </Section>
    </div>
  );
}

export default AuthSecure(ForumThreadCreate);