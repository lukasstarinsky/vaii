import Input from "components/Input";
import Section from "components/Section";
import ErrorsBar from "components/ErrorsBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as AuthService from "services/AuthService";

export default function Register() {
  const [formData, setFormData] = useState({username: "", email: "", password: "", passwordRepeat: ""});
  const [errors, setErrors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const Register = (event) => {
    event.preventDefault();

    if (formData.password !== formData.passwordRepeat) {
      setErrors([...errors, "Passwords do not match."]);
      setFormData({ ...formData, password: "", passwordRepeat: "" });
      return;
    }

    AuthService.RegisterUser(formData, () => {
      setFormData({ username: "", email: "", password: "", passwordRepeat: "" });
      setIsSuccess(true);
      setErrors([]);
    }, (errors) => {
      setFormData({ ...formData, password: "", passwordRepeat: "" });
      setErrors(errors);
    });
  }

  return (
    <div className="w-full px-4 md:w-9/12 md:px-0 xl:w-6/12">
      <Section className="p-10 mt-28" shadow={true}>
        <form onSubmit={Register}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
            <Input id="username" type="text" placeholder="Your username..." required minLength={4} autoComplete="off"
                    value={formData.username} 
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">E-Mail</label>
            <Input id="email" type="email" placeholder="Your e-mail..." required autoComplete="off"
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <Input id="password" type="password" placeholder="Your password..." required minLength={6} autoComplete="off"
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>

          <div className="mt-4">
            <label htmlFor="password-repeat" className="block mb-2 text-sm font-medium">Repeat Password</label>
            <Input id="password-repeat" type="password" placeholder="Repeat your password..." required minLength={6} autoComplete="off"
                    value={formData.passwordRepeat} 
                    onChange={(e) => setFormData({ ...formData, passwordRepeat: e.target.value })} />
          </div>

          <ErrorsBar errors={errors} />
          { isSuccess && 
            <div className="bg-green-100 border border-green-400 text-green-700 mt-3 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Account created.</span>
            </div>
          }

          <Input type="submit" value="Create an account" className="mt-3 bg-gray-900 text-white" />
          <h2 className="mt-4">Have an account? <Link to="/auth/login" className="underline">Sign in</Link>.</h2>
        </form>
      </Section>
    </div>
  );
}