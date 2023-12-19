import ForumHeader from "components/ForumHeader";
import ForumThread from "components/ForumThread";
import Section from "components/Section";
import * as ForumService from "services/ForumService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ForumCategory() {
  const { category } = useParams();
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  const categories = {
    news: "Articles about new updates on web.",
    general: "General discussion about any topic.",
    media: "Share images and videos on various topics."
  };

  useEffect(() => {
    if (!categories[category]) {
      navigate("/");
    }

    ForumService.GetThreads(category, (data) => {
      setThreads(data);
    });
  }, []);

  if (!threads) {
    return null;
  }

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header={category} description={categories[category]} />

      <button onClick={() => navigate(`/forum/category/${category}/create`)} className="rounded border border-1 mt-4 border-gray-900 hover:bg-gray-900 hover:text-white p-2 flex items-center">
        <FontAwesomeIcon icon={faPlus} />
        <span className="ms-2">Create Thread</span>
      </button>

      <Section empty={threads.length === 0} header="Threads" className="mb-10 mt-4" contentClassName="p-3">
        { threads.map((thread, i) => (
          <ForumThread key={i} data={thread} />
        ))}
      </Section>
    </div>
  );
}