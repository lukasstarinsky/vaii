import Link from "next/link";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";

export default function Navbar() {
  return (
    <nav className="navbar flex justify-between w-full sticky top-0">
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" height="22" role="img" viewBox="0 0 74 64">
          <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="#606060"></path>
        </svg>
        <Link href="/auth/login" className="ms-5 text-neutral-500 hover:text-white">
          <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
          Login
        </Link>
        <Link href="/auth/register" className="ms-5 text-neutral-500 hover:text-white">
          <FontAwesomeIcon icon={faUserPlus} className="me-1" />
          Register
        </Link>
      </div>
      <div className="me-5">
        <Link href="/auth/login" className="outline p-2 rounded hover:bg-neutral-900 outline-1 outline-neutral-900">Login</Link>
      </div>
    </nav>
  )
}