'use client';

import Input from "@/components/Input";
import Section from "@/components/Section";
import * as AuthService from "@/services/AuthService";
import { useUserStore } from "@/store/user";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [errors, setErrors] = useState([]);
  const userStore = useUserStore();

  const Login = () => {
    AuthService.LoginUser(formData)
      .then((response) => userStore.setUser(response.id, response.username))
      .catch((response) => setErrors(response.errors));
  };

  useEffect(() => {
    if (userStore.user.id) {
      redirect("/") 
    }
  }, []);

  return (
    <div className="w-full px-4 md:w-9/12 md:px-0 xl:w-6/12">
      <Section className="p-10 mt-28" shadow={true}>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
          <Input id="username" type="text" placeholder="Your username..."
                 value={formData.username}
                 onChange={(e) => setFormData(formData => ({...formData, username: e.target.value}))} />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
          <Input id="password" type="password" placeholder="Your password..."
                 value={formData.password}
                 onChange={(e) => setFormData(formData => ({...formData, password: e.target.value}))} />
        </div>

        { errors.length > 0 ?
          <div className="bg-red-100 border border-red-400 text-red-700 mt-3 px-4 py-3 rounded relative" role="alert">
            {errors.map((error, i) => (
              <span className="block sm:inline">{error}<br /></span>
            ))}
          </div>
        : <></>}

        <Input onClick={() => Login()} type="submit" value="Login" className="mt-3 bg-gray-900 text-white" />
      </Section>
    </div>
  );
}