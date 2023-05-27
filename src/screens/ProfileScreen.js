import React, { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("debug profile screen", userInfo);

  return (
    <div>
      <span>
        Welcome <strong>{userInfo?.email}!</strong> You can view this page
        because you&apos;re logged in
      </span>
    </div>
  );
};

export default ProfileScreen;
