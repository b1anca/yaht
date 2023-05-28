import React, { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <div>profile</div>
      <span>
        Welcome <strong>{userInfo?.name}!</strong> You can view this page
        because you&apos;re logged in
      </span>
    </div>
  );
};

export default ProfileScreen;
