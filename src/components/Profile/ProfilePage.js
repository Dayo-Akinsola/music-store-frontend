/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getRequest } from "../../sevices/service";
import ProfileHeader from "./Header/ProfileHeader";
import { Outlet, useParams } from "react-router-dom";

const ProfilePage = ({ userInfo, setUserInfo }) => {
  const urlParams = useParams();
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getRequest(`https://albumphoria.herokuapp.com/users/user/${urlParams.userId}`);
      const user = await response.json();
      setUserInfo(user);
    }
    getUserInfo();
  }, [urlParams.userId])


  return (
    <div className="profile-page">
      <ProfileHeader userInfo={userInfo} />
      <Outlet />
  </div>
  )
}

export default ProfilePage;