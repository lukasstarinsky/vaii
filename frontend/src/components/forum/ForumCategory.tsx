import Link from "next/link";
interface CategoryProps {
  title: string,
  description?: string,
  style?: string
}

export default function ForumCategory(props: CategoryProps) {
  return (
    <Link href={`/forum/${props.title}`} className={`border-b border-l-4 ${props.style} hover:bg-gray-200 px-3 py-6 grid grid-cols-4`}>
      <div className="flex flex-col col-span-2 self-center">
        <span className="font-bold text-md text-capitalize">{props.title}</span>
        <span className="text-gray-500 text-sm">{props.description}</span>
      </div>
      <div className="hidden md:flex md:flex-col text-center">
        <span className="font-bold text-md">300</span>
        <span className="text-gray-500 text-sm">Threads</span>
      </div>
      <div className="flex flex-col text-xs self-center ms-4 md:ms-0 col-span-2 md:col-span-1">
        <span className="font-bold truncate">How to innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnt in lol [MEGATHREAD]</span>
        <span className="text-gray-500">5 April 2023 • Miat</span>
      </div>
    </Link>
  );
}