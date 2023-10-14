import Input from "@/components/Input";
import Section from "@/components/Section";
import Link from "next/link";

export default function Login() {
  return (
    <Section className="p-10 mt-28 w-6/12" shadow={true}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
        <Input id="username" type="text" placeholder="Your username..." />
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
        <Input id="password" type="password" placeholder="Your password..." />
      </div>

      <Input type="submit" value="Login" className="mt-7 bg-gray-900 text-white" />
      <h2 className="mt-4">Don't have an account? <Link href="/auth/register" className="underline">Sign up</Link>.</h2>
    </Section>
  );
}