import TextInput from "@/components/TextInput";
import Link from "next/link";

export default function Register() {
  return (
    <div className="w-6/12 rounded p-10 section-border mt-28">
      <TextInput id="username" label="Username" type="text" placeholder="Your username..." />
      <TextInput id="email" label="E-Mail" type="text" placeholder="Your e-mail..." className="mt-5" />
      <TextInput id="password" label="Password" type="password" placeholder="Your password..." className="mt-5" />
      <TextInput id="password-repeat" label="Repeat Password" type="password" placeholder="Repeat your password..." className="mt-5" />
      <input type="submit" className="mt-7 p-2 rounded hover:bg-neutral-900 hover:text-white outline outline-1 outline-neutral-900 w-full" value="Register" />
      <h2 className="mt-4">Already have an account? Go to <Link href="/auth/login" className="underline">Login</Link>.</h2>
    </div>
  );
}