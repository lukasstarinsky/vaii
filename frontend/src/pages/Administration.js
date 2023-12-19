import ForumHeader from "components/ForumHeader";
import Section from "components/Section";
import * as AdminService from "services/AdminService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHammer, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Administration() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    AdminService.GetAdminData((data) => {
      setAdminData(data);
    });
  }, []);

  if (!adminData) {
    return null;
  }

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header="Administration" description="" />

      <Section header="Bans" className="mt-8">

      </Section>
      <Section header="Users" className="mt-8" contentClassName="p-6">
        <table className="w-full text-left border-gray-900 border-x">
          <thead className="text-xs uppercase bg-gray-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            { adminData.users.map((user, i) => (
              <tr key={i} className="bg-white border-gray-900 border-b">
                <td className="px-6 py-3">{user._id}</td>
                <td className="px-6 py-3 underline underline-offset-2"><Link to={`/user/${user._id}/profile`}>{user.username}</Link></td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3 cursor-pointer">
                  <FontAwesomeIcon icon={faEye} className="!h-6" title="View profile" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}