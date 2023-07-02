import React, { useSelector } from "react-redux";
import { Heading, P } from "../components/Typography";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Heading level="h2">Your profile</Heading>
      <P>
        Welcome <strong>{userInfo.name}!</strong> You can view this page because
        you&apos;re logged in
      </P>
    </>
  );
};

export default ProfileScreen;
