
'use client';

import AuthSecure from "@/components/AuthSecure";
import Section from "@/components/Section";
import ForumHeader from "@/components/forum/ForumHeader";
import Input from "@/components/Input";
import TextEditor from "@/components/TextEditor";
import ThreadPost from "@/components/forum/ThreadPost";
import * as ForumService from "@/services/ForumService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ForumThread = () => {
  const [thread, setThread] = useState();
  const params = useParams();

  useEffect(() => {
    ForumService.GetThread(params.thread, (data) => {
      setThread(data);
    });
  }, []);

  return (
    <div className="w-full px-2 xl:w-9/12 xl:px-0 mt-12">
      <ForumHeader header="How to code in c++" />
      <style>{`
        .ql-container {
          border: 0 !important;
        }
      `}</style>

      <Section header="Thread" className="mt-12">
        { thread && <ThreadPost data={thread.post} /> }
      </Section>
      <Section header="Replies" className="mt-5">
      </Section>
      
      <Section header="Reply" className="mb-12 mt-5">
        <TextEditor />
        <Input type="submit" value="Reply" className="mt-3 bg-gray-900 text-white rounded-t-none" />
      </Section>
    </div>
  );
}

export default AuthSecure(ForumThread);