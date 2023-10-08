import Input from "@/components/Input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-6/12 rounded section-border mt-28">
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
        <Input id="username" type="text" placeholder="Your username..." />
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
        <Input id="password" type="password" placeholder="Your password..." />
      </div>

      <Input type="submit" value="Login" className="mt-7 hover:bg-neutral-900 hover:text-white" />
      <h2 className="mt-4">Don't have an account? Go to <Link href="/auth/register" className="underline">Register</Link>.</h2>
    </div>
  );
}