import Image from "next/image";
import Link from "next/link";

interface ThreadProps {
  
}

export default function ForumThread(props: ThreadProps) {
  return (
    <Link href="" className={`hover:bg-gray-200 border-b px-3 py-6 grid grid-cols-4`}>
      <div className="flex flex-row col-span-2 items-center">
        <Image className="rounded" src="/avatar.png" width={48} height={48} alt="Avatar" />
        <div className="flex flex-col ms-3">
          <span className="font-bold text-md forum-category-title">Forum rules</span>
          <span className="text-gray-500 text-sm">Administrator • 5 April 2023</span>
        </div>
      </div>
      <div className="flex flex-col text-center self-center">
        <span className="font-bold text-md">300</span>
        <span className="text-gray-500 text-sm">Views</span>
      </div>
      <div className="flex flex-col text-center self-center">
        <span className="font-bold text-md">300</span>
        <span className="text-gray-500 text-sm">Replies</span>
      </div>
    </Link>
  );
}