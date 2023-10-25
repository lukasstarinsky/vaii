import ForumHeader from "@/components/forum/ForumHeader";
import ForumThread from "@/components/forum/ForumThread";
import Section from "@/components/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Forum({ params } : { params: { category: string }}) {
  const description: {[index: string]: string} = {
    news: "Articles about new updates on web.",
    general: "General discussion about any topic.",
    media: "Share images and videos on various topics."
  };

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header={params.category} description={description[params.category]} />

      <button className="rounded border border-1 mt-4 border-gray-900 hover:bg-gray-900 hover:text-white p-2 flex items-center">
        <FontAwesomeIcon icon={faPlus} />
        <span className="ms-2">Create Thread</span>
      </button>

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