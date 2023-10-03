import TextInput from "@/app/components/TextInput";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-6/12 rounded p-10 section-border">
      <TextInput id="username" label="Username" type="text" placeholder="Your username..." />
      <TextInput id="password" label="Password" type="password" placeholder="Your password..." className="mt-5" />
      <input type="submit" className="mt-7 p-2 rounded hover:bg-neutral-900 hover:text-white outline outline-1 outline-neutral-900 w-full" value="Login" />
      <h2 className="mt-4">Don't have an account? Go to <Link href="/auth/register" className="underline">Register</Link></h2>
    </div>
  )
}