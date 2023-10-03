import "./navbar.css";

export default function Navbar() {
  return (
    <header className="header flex justify-center w-full sticky top-0 h-16">
      <nav className="container flex justify-between items-center">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" height="22" role="img" viewBox="0 0 74 64">
            <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="#fff"></path>
          </svg>
          <a href="#" className="ms-4 text-neutral-700 hover:text-white">Home</a>
        </div>
        <div>
          <button className="outline p-2 rounded hover:bg-neutral-900 outline-1 me-3 outline-neutral-900">Register</button>
          <button className="outline p-2 rounded hover:bg-neutral-900 outline-1 outline-neutral-900">Login</button>
        </div>
      </nav>
    </header>
  )
}