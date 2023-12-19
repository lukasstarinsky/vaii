import { Link } from "react-router-dom";

export default function ForumCategory(props) {
  if (!props.data)
    return null;

  return (
    <Link to={`/forum/category/${props.title}`} className={`border-b border-l-4 ${props.style} hover:bg-gray-200 px-3 py-6 grid grid-cols-4`}>
      <div className="flex flex-col col-span-2 self-center">
        <span className="font-bold text-md text-capitalize">{props.title}</span>
        <span className="text-gray-500 text-sm">{props.description}</span>
      </div>
      <div className="hidden md:flex md:flex-col text-center">
        <span className="font-bold text-md">{props.data.threadCount}</span>
        <span className="text-gray-500 text-sm">Threads</span>
      </div>
      { props.data.threadCount > 0 && 
        <div className="flex flex-col text-xs self-center ms-4 md:ms-0 col-span-2 md:col-span-1">
          <span className="font-bold truncate">{props.data.lastThread.title}</span>
          <span className="text-gray-500">{new Date(props.data.lastThread.createdAt).toLocaleString("sk-SK")} • {props.data.lastThread.author.username}</span>
        </div>
      }
    </Link>
  );
}