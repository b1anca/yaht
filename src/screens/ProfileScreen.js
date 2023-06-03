import React, { useSelector } from "react-redux";
import { H1, P } from "../components/Typography";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <H1>Your profile</H1>
      <P>
        Welcome <strong>{userInfo.name}!</strong> You can view this page because
        you&apos;re logged in
      </P>
    </>
  );
};

export default ProfileScreen;
