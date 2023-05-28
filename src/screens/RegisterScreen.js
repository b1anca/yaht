import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import Error from "../components/Error";
import { registerUser } from "../features/auth/authActions";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/user-profile");
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
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
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
        <div className="space-y-4 text-sm text-gray-700 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
          <p className="text-center sm:text-left">Already have an account?</p>
          <NavLink
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
            to="/login"
          >
            Sign in
          </NavLink>
        </div>
      </footer>
    </main>
  );
};

export default RegisterScreen;
