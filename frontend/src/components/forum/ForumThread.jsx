import Image from "next/image";
import Link from "next/link";

export default function ForumThread(props) {
  if (!props.data)
    return null;

  return (
    <Link href={`/forum/${props.data.category}/${props.data._id}`} 
          className="hover:bg-gray-200 border-b px-3 py-6 grid grid-cols-4">
      <div className="flex flex-row col-span-2 items-center">
        <Image className="rounded" src="/avatar.png" width={48} height={48} alt="Avatar" />
        <div className="flex flex-col ms-3">
          <span className="font-bold text-md forum-category-title">{props.data.title}</span>
          <span className="text-gray-500 text-sm">{props.data.author.username} • {new Date(props.data.createdAt).toLocaleString("sk-SK")}</span>
        </div>
      </div>
      <div className="flex flex-col text-center self-center">
        <span className="font-bold text-md">{props.data.views}</span>
        <span className="text-gray-500 text-sm">Views</span>
      </div>
      <div className="flex flex-col text-center self-center">
        <span className="font-bold text-md">{props.data.posts.length}</span>
        <span className="text-gray-500 text-sm">Replies</span>
      </div>
    </Link>
  );
}