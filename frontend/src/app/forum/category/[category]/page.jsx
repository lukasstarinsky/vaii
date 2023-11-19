'use client';

import ForumHeader from "@/components/forum/ForumHeader";
import ForumThread from "@/components/forum/ForumThread";
import Section from "@/components/Section";
import AuthSecure from "@/components/AuthSecure";
import Link from "next/link";
import * as ForumService from "@/services/ForumService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ForumCategory = () => {
  const [threads, setThreads] = useState([]);
  const params = useParams();
  const router = useRouter();

  const categories = {
    news: "Articles about new updates on web.",
    general: "General discussion about any topic.",
    media: "Share images and videos on various topics."
  };

  useEffect(() => {
    if (!categories[params.category]) {
      router.push("/forum");
    }

    ForumService.GetThreads(params.category, (data) => {
      setThreads(data);
    });
  }, []);

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header={params.category} description={categories[params.category]} />

      <Link href={`/forum/category/${params.category}/create`}>
        <button className="rounded border border-1 mt-4 border-gray-900 hover:bg-gray-900 hover:text-white p-2 flex items-center">
          <FontAwesomeIcon icon={faPlus} />
          <span className="ms-2">Create Thread</span>
        </button>
      </Link>

      <Section empty={threads.length === 0} header="Threads" className="mb-10 mt-4" contentClassName="p-3">
        { threads.map((thread, i) => (
          <ForumThread key={i} data={thread} />
        ))}
      </Section>
    </div>
  );
}

export default AuthSecure(ForumCategory);