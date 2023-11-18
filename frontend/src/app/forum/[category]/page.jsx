'use client';

import ForumHeader from "@/components/forum/ForumHeader";
import ForumThread from "@/components/forum/ForumThread";
import Section from "@/components/Section";
import AuthSecure from "@/components/AuthSecure";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ForumCategory = () => {
  const params = useParams();
  const router = useRouter();

  const description = {
    news: "Articles about new updates on web.",
    general: "General discussion about any topic.",
    media: "Share images and videos on various topics."
  };

  useEffect(() => {
    if (!description[params.category]) {
      router.push("/forum");
    }
  }, []);

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header={params.category} description={description[params.category]} />

      <Link href={`/forum/${params.category}/create`}>
        <button className="rounded border border-1 mt-4 border-gray-900 hover:bg-gray-900 hover:text-white p-2 flex items-center">
          <FontAwesomeIcon icon={faPlus} />
          <span className="ms-2">Create Thread</span>
        </button>
      </Link>

      <Section header="Threads" className="mb-10 mt-4" contentClassName="p-3">
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
        <ForumThread />
      </Section>
    </div>
  );
}

export default AuthSecure(ForumCategory);