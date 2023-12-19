import Layout from "pages/Layout";
import ForumHome from "pages/ForumHome";
import Login from "pages/Login";
import ForumThread from "pages/ForumThread";
import ForumCategory from "pages/ForumCategory";
import Register from "pages/Register";
import ProtectedRoute from "components/ProtectedRoute";
import ForumThreadCreate from "pages/ForumThreadCreate";
import UserProfile from "pages/UserProfile";
import Administration from "pages/Administration";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<ForumHome />} />
            <Route path="/forum/thread/:id" element={<ForumThread />} />
            <Route path="/forum/category/:category" element={<ForumCategory />} />
            <Route path="/forum/category/:category/create" element={<ForumThreadCreate />} />
            <Route path="/user/:userId/profile" element={<UserProfile />} />
          </Route>

          <Route path="/admin" element={<Administration />} />

          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/register" element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}