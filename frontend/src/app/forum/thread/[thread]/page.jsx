
'use client';

import AuthSecure from "@/components/AuthSecure";
import Section from "@/components/Section";
import ForumHeader from "@/components/forum/ForumHeader";
import Input from "@/components/Input";
import TextEditor from "@/components/TextEditor";
import ThreadPost from "@/components/forum/ThreadPost";
import * as ForumService from "@/services/ForumService";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";

const ForumThread = () => {
  const [thread, setThread] = useState();
  const [errors, setErrors] = useState([]);
  const [replyText, setReplyText] = useState("");
  const params = useParams();
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    ForumService.GetThread(params.thread, (data) => {
      setThread(data);
    }, () => {
      router.push("/forum");
    });
  }, []);

  const DeleteThread = () => {
    ForumService.DeleteThread(thread._id, () => {
      router.push("/forum");
    });
  };

  const CreatePost = () => {
    if (replyText.length < 16) {
      setErrors(["Text of the post must be atleast 16 characters long."]);
      return;
    }

    ForumService.CreatePost(thread._id, replyText, (newPost) => {
      setThread((oldThread) => ({...oldThread, posts: [...oldThread.posts, newPost]}));
    }, (errors) => {
      setErrors(errors);
    });
  };

  return (
    <div className="w-full px-2 xl:w-9/12 xl:px-0 mt-12">
      <ForumHeader header="How to code in c++" />
      <style>{`
        .ql-container {
          border: 0 !important;
        }
      `}</style>

      <div className="mt-12">
        { thread && user.id == thread.author._id &&
          <Input type="submit" onClick={DeleteThread} value="Delete thread" className="font-semibold mb-2 hover:bg-red-500 outline outline-1 outline-red-500 text-red-500 hover:text-white" />
        }
        <Section header="Thread">
          { thread && <ThreadPost data={thread.post} excludeDelete /> }
        </Section>
      </div>
      <Section header="Replies" className="mt-5">
        { thread &&
          <>
          {thread.posts.map((post, i) => (
            <ThreadPost data={post} />
          ))}
          </>
        }
      </Section>
      
      <Section header="Reply" className="mb-12 mt-5">
        <TextEditor value={replyText} onChange={setReplyText} />
        { errors && errors.length > 0 ?
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {errors.map((error, i) => (
              <span key={i} className="block sm:inline">{error}<br /></span>
            ))}
          </div>
        : <></>}
        <Input onClick={CreatePost} type="submit" value="Reply" className="bg-gray-900 text-white rounded-t-none" />
      </Section>
    </div>
  );
}

export default AuthSecure(ForumThread);