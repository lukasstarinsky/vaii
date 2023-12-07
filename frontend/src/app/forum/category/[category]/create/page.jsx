'use client';

import AuthSecure from "@/components/AuthSecure";
import Section from "@/components/Section";
import Input from "@/components/Input";
import ForumHeader from "@/components/forum/ForumHeader";
import TextEditor from "@/components/TextEditor";
import * as ForumService from "@/services/ForumService";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ForumThreadCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const params = useParams();

  const categories = {
    news: "Articles about new updates on web.",
    general: "General discussion about any topic.",
    media: "Share images and videos on various topics."
  };
  
  const CreateThread = (event) => {
    event.preventDefault();

    if (description.length === 0) {
      setErrors(["Description is required."]);
      return
    } else if (description.length < 32) {
      setErrors(["Description must be atleast 16 characters long."]);
      return;
    }

    ForumService.CreateThread({ description, title, category: params.category }, (threadId) => {
      router.push(`/forum/thread/${threadId}`);
    }, (errors) => {
      setErrors(errors);
    });
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
        <form onSubmit={CreateThread}>
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
            <Input id="title" type="text" placeholder="Title of your thread..." required minLength="4" autoComplete="off"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)} />
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
          { errors && errors.length > 0 ?
            <div className="bg-red-100 border border-red-400 text-red-700 mt-3 px-4 py-3 rounded relative" role="alert">
              {errors.map((error, i) => (
                <span key={i} className="block sm:inline">{error}<br /></span>
              ))}
            </div>
          : <></>}
          <div className="mt-2">
            <Input type="submit" value="Create thread" className="mt-3 bg-gray-900 text-white" />
          </div>
        </form>
      </Section>
    </div>
  );
}

export default AuthSecure(ForumThreadCreate);