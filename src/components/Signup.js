import React from "react";
import StyledForm from "../styles";

function Signup() {
  return (
    <StyledForm>
      <form onSubmit={() => console.log("asdf")}>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </StyledForm>
  );
}

export default Signup;
