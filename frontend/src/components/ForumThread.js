import { Link } from "react-router-dom";
import "./ForumThread.css";

export default function ForumThread(props) {
  return (
    <Link to={`/forum/thread/${props.data._id}`} 
          className="hover:bg-gray-200 border-b px-3 py-6 grid grid-cols-4">
      <div className="flex flex-row col-span-2 items-center">
        <img className="rounded forum-thread-author-avatar" src={props.data.author.avatar} alt="Avatar" />
        <div className="flex flex-col ms-3 overflow-hidden">
          <span className="font-bold text-md forum-category-title truncate">{props.data.title}</span>
          <span className="text-gray-500 text-sm">{props.data.author.username} • {new Date(props.data.createdAt).toLocaleString("sk-SK")}</span>
        </div>
      </div>
      <div className="text-center self-center hidden md:flex md:flex-col">
        <span className="font-bold text-md">{props.data.views}</span>
        <span className="text-gray-500 text-sm">Views</span>
      </div>
      <div className="flex flex-col text-center self-center col-span-2 md:col-span-1">
        <span className="font-bold text-md">{props.data.posts.length}</span>
        <span className="text-gray-500 text-sm">Replies</span>
      </div>
    </Link>
  );
}