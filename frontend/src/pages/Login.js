import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/UserStore";
import Input from "components/Input";
import Section from "components/Section";
import * as AuthService from "services/AuthService";

export default function Login() {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [errors, setErrors] = useState([]);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const Login = (event) => {
    event.preventDefault();

    AuthService.LoginUser(formData, (user) => {
      setUser(user.id, user.username);
      navigate("/");
    }, (errors) => {
      setFormData({ ...formData, password: "" });
      setErrors(errors);
    });
  };

  return (
    <div className="w-full px-4 md:w-9/12 md:px-0 xl:w-6/12">
      <Section className="p-10 mt-28" shadow={true}>
        <form onSubmit={Login}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
            <Input id="username" type="text" placeholder="Your username..." required autoComplete="off"
                  value={formData.username}
                  onChange={(e) => setFormData(formData => ({...formData, username: e.target.value}))} />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <Input id="password" type="password" placeholder="Your password..." required autoComplete="off"
                  value={formData.password}
                  onChange={(e) => setFormData(formData => ({...formData, password: e.target.value}))} />
          </div>

          { errors && errors.length > 0 ?
            <div className="bg-red-100 border border-red-400 text-red-700 mt-3 px-4 py-3 rounded relative" role="alert">
              {errors.map((error, i) => (
                <span key={i} className="block sm:inline">{error}<br /></span>
              ))}
            </div>
          : <></>}

          <Input type="submit" value="Login" className="mt-3 bg-gray-900 text-white" />
          <h2 className="mt-4">Don't have an account? <Link to="/auth/register" className="underline">Sign up</Link>.</h2>
        </form>
      </Section>
    </div>
  );
}