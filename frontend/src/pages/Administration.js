import ForumHeader from "components/ForumHeader";
import Section from "components/Section";
import * as AdminService from "services/AdminService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import Input from "components/Input";

export default function Administration() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [banEditTarget, setBanEditTarget] = useState(null);
  const [banEditReason, setBanEditReason] = useState("");

  useEffect(() => {
    AdminService.GetAdminData((data) => {
      setAdminData(data);
    });
  }, []);

  const SubmitBanEdit = () => {
    AdminService.EditBan(banEditTarget._id, banEditReason, () => {
      navigate(0);
    });
  }

  const RevokeBan = (ban) => {
    AdminService.RevokeBan(ban._id, () => {
      navigate(0);
    });
  }

  const StartBanEdit = (ban) => {
    setBanEditTarget(ban);
    setBanEditReason(ban.reason);
  }

  const StopBanEdit = () => {
    setBanEditTarget(null);
    setBanEditReason("");
  }

  if (!adminData) {
    return null;
  }

  return (
    <div className="w-full mt-12">
      <ForumHeader header="Administration" description="" />

      <Section header="Bans" className="mt-8">
        <table className="table-auto w-full text-left border-gray-900 border-x">
          <thead className="text-xs uppercase bg-gray-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">#</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">From</th>
              <th scope="col" className="px-6 py-3">To</th>
              <th scope="col" className="px-6 py-3">Reason</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">End</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            { adminData.bans.map((ban, i) => (
              <tr key={i} className="bg-white border-gray-900 border-b">
                <td className="px-6 py-3 hidden lg:table-cell">{ban._id}</td>
                <td className="px-6 py-3 underline hidden lg:table-cell underline-offset-2"><Link to={`/user/${ban.from._id}/profile`}>{ban.from.username}</Link></td>
                <td className="px-6 py-3 underline underline-offset-2"><Link to={`/user/${ban.user._id}/profile`}>{ban.user.username}</Link></td>
                { banEditTarget ?
                  <Input className="py-3 mt-1" value={banEditReason} onChange={(e) => setBanEditReason(e.target.value)} />
                :
                  <td className="px-6 py-3">{ban.reason}</td>
                }
                <td className="px-6 py-3 hidden lg:table-cell">{ban.dateTo}</td>
                <td className="px-6 py-3 cursor-pointer">
                  { banEditTarget ?
                    <>
                    <FontAwesomeIcon onClick={StopBanEdit} icon={faX} className="!h-6 me-2" title="Cancel edit" />
                    <FontAwesomeIcon onClick={SubmitBanEdit} icon={faCheck} className="!h-6" title="Confirm edit" />
                    </>
                  :
                    <>
                    { new Date(ban.dateTo) > new Date() &&
                      <FontAwesomeIcon onClick={() => RevokeBan(ban)} icon={faX} className="!h-6 me-2" title="Revoke ban" />
                    }
                    <FontAwesomeIcon onClick={() => StartBanEdit(ban)} icon={faPencil} className="!h-6" title="Edit ban" />
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <Section header="Users" className="mt-8">
        <table className="table-auto w-full text-left border-gray-900 border-x">
          <thead className="text-xs uppercase bg-gray-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">#</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            { adminData.users.map((user, i) => (
              <tr key={i} className="bg-white border-gray-900 border-b">
                <td className="px-6 py-3 hidden md:table-cell">{user._id}</td>
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