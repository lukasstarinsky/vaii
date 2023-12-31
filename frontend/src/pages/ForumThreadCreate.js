import Section from "components/Section";
import Input from "components/Input";
import ForumHeader from "components/ForumHeader";
import ErrorsBar from "components/ErrorsBar";
import TextEditor from "components/TextEditor";
import * as ForumService from "services/ForumService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ForumThreadCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

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
    } else if (description.length < 16) {
      setErrors(["Description must be atleast 16 characters long."]);
      return;
    }

    ForumService.CreateThread({ description, title, category: category }, (threadId) => {
      navigate(`/forum/thread/${threadId}`);
    }, (errors) => {
      setErrors(errors);
    });
  };

  useEffect(() => {
    if (!categories[category]) {
      navigate("/forum");
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
              <option value={category}>{category}</option>
            </select>
          </div>
          <div className="mt-3">
            <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
            <TextEditor className="bg-white" value={description} onChange={setDescription} />
          </div>
          <ErrorsBar errors={errors} />
          <div className="mt-2">
            <Input type="submit" value="Create thread" className="mt-3 bg-gray-900 text-white" />
          </div>
        </form>
      </Section>
    </div>
  );
}