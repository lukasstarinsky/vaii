"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faComments, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useUserStore } from "@/store/user";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { user } = useUserStore();

  return (
    <nav className="bg-neutral-900 py-3 px-4 flex justify-between z-40 w-full sticky top-0">
      <div className="flex">
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="22" role="img" viewBox="0 0 74 64">
            <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="#606060"></path>
          </svg>
        </Link>

        { !user.id ? 
          <>
          <Link href="/auth/login" className="ms-5 text-neutral-500 hover:text-white">
            <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
            Sign in
          </Link>
          <Link href="/auth/register" className="ms-5 text-neutral-500 hover:text-white">
            <FontAwesomeIcon icon={faUserPlus} className="me-1" />
            Sign up
          </Link>
          </>
        :
          <Link href="/" className="ms-5 text-neutral-500 hover:text-white">
            <FontAwesomeIcon icon={faComments} className="me-1" />
            Forum
          </Link>
        }
      </div>

      { user.id &&
        <div onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
          <button className="text-neutral-500 hover:text-white flex">
            <span className="text-sm">{user.username}</span>
            <FontAwesomeIcon icon={faCaretDown} className="ms-2 self-center" />
          </button>
          <div id="dropdown" className={`${dropdown ? "": "hidden"} right-3 absolute top-9 rounded w-44 bg-neutral-700`}>
            <ul className="py-2 text-sm text-gray-200">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-neutral-900">Profile</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-neutral-900">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-neutral-900">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      }
    </nav>
  );
}