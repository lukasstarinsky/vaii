import Input from "@/components/Input";
import Section from "@/components/Section";
import Link from "next/link";

export default function Register() {
  return (
    <Section className="p-10 mt-28 w-6/12" shadow={true}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
        <Input id="username" type="text" placeholder="Your username..." />
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">E-Mail</label>
        <Input id="email" type="text" placeholder="Your e-mail..." />
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
        <Input id="password" type="password" placeholder="Your password..." />
      </div>

      <div className="mt-4">
        <label htmlFor="password-repeat" className="block mb-2 text-sm font-medium">Repeat Password</label>
        <Input id="password-repeat" type="password" placeholder="Repeat your password..." />
      </div>

      <Input type="submit" value="Create an account" className="mt-7 hover:bg-neutral-900 hover:text-white" />
      <h2 className="mt-4">Have an account? <Link href="/auth/login" className="underline">Sign in</Link>.</h2>
    </Section>
  );
}