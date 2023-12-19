import Section from "components/Section";
import ForumHeader from "components/ForumHeader";
import Input from "components/Input";
import TextEditor from "components/TextEditor";
import ForumThreadPost from "components/ForumThreadPost";
import * as ForumService from "services/ForumService";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "store/UserStore";

export default function ForumThread() {
  const [thread, setThread] = useState();
  const [errors, setErrors] = useState([]);
  const [replyText, setReplyText] = useState("");
  const { id } = useParams();
  const { user, IsModerator } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    ForumService.GetThread(id, (data) => {
      setThread(data);
    }, () => {
      navigate("/");
    });
  }, []);

  const DeleteThread = () => {
    ForumService.DeleteThread(thread._id, () => {
      navigate("/");
    });
  };

  const CreatePost = () => {
    if (replyText.length < 16) {
      setErrors(["Text of the post must be atleast 16 characters long."]);
      return;
    }

    ForumService.CreatePost(thread._id, replyText, () => {
      navigate(0);
    }, (errors) => {
      setErrors(errors);
    });
  };

  if (!thread)
    return null;

  return (
    <div className="w-full px-2 xl:w-9/12 xl:px-0 mt-12">
      <ForumHeader header="How to code in c++" />
      <style>{`
        .ql-container {
          border: 0 !important;
        }
      `}</style>

      <div className="mt-12">
        { (user.id == thread.author._id || IsModerator()) &&
          <Input type="submit" onClick={DeleteThread} value="Delete thread" className="font-semibold mb-2 hover:bg-red-500 outline outline-1 outline-red-500 text-red-500 hover:text-white" />
        }
        <Section header="Thread">
          <ForumThreadPost data={thread.posts[0]} excludeDelete />
        </Section>
      </div>
      <Section empty={thread.posts.slice(1).length === 0} header="Replies" className="mt-5">
        {thread.posts.slice(1).map((post, i) => (
          <div key={i}>
            <ForumThreadPost data={post} />
            <hr />
          </div>
        ))}
      </Section>
      
      <Section header="Reply" className="mb-12 mt-5">
        <TextEditor value={replyText} onChange={setReplyText} />
        { (errors && errors.length > 0) &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {errors.map((error, i) => (
              <span key={i} className="block sm:inline">{error}<br /></span>
            ))}
          </div>
        }
        <Input onClick={CreatePost} type="submit" value="Reply" className="bg-gray-900 text-white rounded-t-none" />
      </Section>
    </div>
  );
}