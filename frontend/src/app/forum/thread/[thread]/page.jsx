
'use client';

import AuthSecure from "@/components/AuthSecure";
import Section from "@/components/Section";
import ForumHeader from "@/components/forum/ForumHeader";
import Image from "next/image";
import Link from "next/link";
import TextEditor from "@/components/TextEditor";
import * as ForumService from "@/services/ForumService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ForumThread = () => {
  const [thread, setThread] = useState({});
  const params = useParams();

  useEffect(() => {
    ForumService.GetThread(params.thread, (data) => {
      setThread(data);
    });
  }, []);

  return (
    <div className="w-full px-2 xl:w-9/12 xl:px-0 mt-12">
      <ForumHeader header="How to code in c++" />

      <Section header="Thread" className="mt-12">
        <div className="flex flex-row p-4 hover:bg-gray-200 hover:rounded">
          <Link href="#" className="w-2/12 flex flex-col items-center text-center border-r">
            <span className="text-gray-900 font-bold mb-1">LSk</span>
            <Image className="rounded" src="/avatar2.png" width={96} height={96} alt="Avatar" />
            <div className="bg-red-500 px-4 py-1 rounded text-white font-semibold mt-2">
              <span className="text-sm">Administrator</span>
            </div>
          </Link>
          <div className="ql-container ql-snow !border-0">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: thread.description }}>
            </div>
          </div>
        </div>
      </Section>
      <Section header="Replies" className="mt-5">
        <div className="flex flex-row p-4 hover:bg-gray-200 hover:rounded">
          <Link href="#" className="w-2/12 flex flex-col items-center text-center border-r">
            <span className="text-gray-900 font-bold mb-1">LSk</span>
            <Image className="rounded" src="/avatar2.png" width={96} height={96} alt="Avatar" />
            <div className="bg-red-500 px-4 py-1 rounded text-white font-semibold mt-2">
              <span className="text-sm">Administrator</span>
            </div>
          </Link>
          <div className="ql-container ql-snow !border-0">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: thread.description }}>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-row p-4 hover:bg-gray-200 hover:rounded">
          <Link href="#" className="w-2/12 flex flex-col items-center text-center border-r">
            <span className="text-gray-900 font-bold mb-1">LSk</span>
            <Image className="rounded" src="/avatar2.png" width={96} height={96} alt="Avatar" />
            <div className="bg-red-500 px-4 py-1 rounded text-white font-semibold mt-2">
              <span className="text-sm">Administrator</span>
            </div>
          </Link>
          <div className="ql-container ql-snow !border-0">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: thread.description }}>
            </div>
          </div>
        </div>
      </Section>
      <Section header="Reply" className="mb-12 mt-5">
        <TextEditor className="rounded" />
      </Section>
    </div>
  );
}

export default AuthSecure(ForumThread);