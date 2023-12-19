import ForumHeader from "components/ForumHeader";
import Section from "components/Section";
import RoleBadge from "components/RoleBadge";
import Input from "components/Input";
import * as UserService from "services/UserService";
import * as AdminService from "services/AdminService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "store/UserStore";
import ErrorsBar from "components/ErrorsBar";

export default function UserProfile() {
  const navigate = useNavigate();
  const { IsAdmin } = useUserStore();
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  const [banLength, setBanLength] = useState(0);
  const [banReason, setBanReason] = useState("");
  const [banErrors, setBanErrors] = useState([]);
  
  useEffect(() => {
    UserService.GetUserProfile(userId, (data) => {
      setUserProfile(data);
    }, () => {
      navigate("/");
    });
  }, []);

  const BanUser = (event) => {
    event.preventDefault();

    AdminService.BanUser(userId, { reason: banReason, hours: banLength }, (data) => {
      setBanLength(0);
      setBanReason("");
      setBanErrors([data]);
    }, (errors) => {
      setBanErrors(errors);
    });
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div className="w-full px-2 md:w-9/12 md:px-0 mt-12">
      <ForumHeader header={userProfile.username} description="" />
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center">
          <img src={userProfile.avatar} width={128} height={128} />
          <RoleBadge role={userProfile.role} />
        </div>
      </div>
      <Section header="User information" className="mt-12" contentClassName="p-8">
        <div className="flex flex-row">
          <div className="w-1/2 me-4">
            <div>
              <label htmlFor="username" className="font-semibold">Username</label>
              <Input id="username" type="text" placeholder={userProfile.username} disabled />
            </div>
            <div className="mt-3">
              <label htmlFor="role" className="font-semibold">Role</label>
              <Input id="role" type="text" placeholder={userProfile.role == 0 ? "User": "Staff"} disabled />
            </div>
            <div className="mt-3">
              <label htmlFor="registered" className="font-semibold">Registered</label>
              <Input id="registered" type="text" placeholder={new Date(userProfile.createdAt).toLocaleString()} disabled />
            </div>
          </div>
          <div className="w-1/2 ms-4">
            <div>
              <label htmlFor="threads" className="font-semibold">Threads started</label>
              <Input id="threads" type="number" placeholder={userProfile.threadCount} disabled />
            </div>
            <div className="mt-3">
              <label htmlFor="threads" className="font-semibold">Replies posted</label>
              <Input id="threads" type="number" placeholder={userProfile.postCount} disabled />
            </div>
            <div className="mt-3">
              <label htmlFor="bans" className="font-semibold">Banned # times</label>
              <Input id="bans" type="number" placeholder={userProfile.banCount} disabled />
            </div>
          </div>
        </div>
      </Section>
      { IsAdmin() &&
        <Section header="Danger zone" className="my-10" contentClassName="p-8">
          <Input type="submit" value="Promote to moderator" className="font-semibold mb-2 hover:bg-gray-900 outline outline-1 outline-gray-900 text-gray-900 hover:text-white" />
          <Input type="submit" value="Delete account" className="font-semibold mb-2 hover:bg-red-500 outline outline-1 outline-red-500 text-red-500 hover:text-white" />
          <hr />
          <form onSubmit={BanUser} className="mt-4">
            <label htmlFor="banLength" className="font-semibold">Length of the ban in hours</label>
            <Input type="number" placeholder="Number of hours to ban this user for" className="mt-2" required min={1}
                  value={banLength} onChange={(e) => setBanLength(e.target.value)} />
            <Input type="text" placeholder="Reason for ban" className="mt-2" required minLength={8}
                  value={banReason} onChange={(e) => setBanReason(e.target.value)} />
            <ErrorsBar errors={banErrors} />
            <Input type="submit" value="Ban user" className="font-semibold my-2 bg-red-500 text-white" />
          </form>
        </Section>
      }
    </div>
  );
}