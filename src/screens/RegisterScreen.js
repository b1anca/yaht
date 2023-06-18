import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { registerUser } from "../features/auth/authActions";
import Input from "../components/Input";
import Button from "../components/Button";
import NavLink from "../components/NavLink";

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/user-profile"); // TODO: check this
    if (success) navigate("/login");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    if (data.password !== data.password_confirmation) {
      setCustomError("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };

  return (
    <main className="relative h-screen flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        <form className="w-full max-w-sm" onSubmit={handleSubmit(submitForm)}>
          {error && <Alert>{error}</Alert>}
          {customError && <Alert>{customError}</Alert>}
          <Input type="text" required {...register("name")} label="Name" />
          <Input type="email" required {...register("email")} label="Email" />
          <Input
            type="password"
            required
            {...register("password")}
            label="Password"
          />
          <Input
            type="password"
            required
            {...register("password_confirmation")}
            label="Confirm password"
          />
          <Button primary type="sumit" loading={loading} className="w-full">
            Register
          </Button>
        </form>
      </div>
      <footer className="relative shrink-0">
        <div className="space-y-4 text-sm sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
          <p className="text-center sm:text-left">Already have an account?</p>
          <NavLink secondary to="/login">
            Sign in
          </NavLink>
        </div>
      </footer>
    </main>
  );
};

export default RegisterScreen;
