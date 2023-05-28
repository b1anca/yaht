import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Error from "../components/Error";
import Input from "../components/Input";
import Button from "../components/Button";

function LoginScreen() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/user-profile");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <main className="relative h-screen flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        <form className="w-full max-w-sm" onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          <Input type="email" required {...register("email")} label="Email" />
          <Input
            type="password"
            required
            {...register("password")}
            label="Password"
          />
          <Button primary type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </div>
      <footer className="relative shrink-0">
        <div className="space-y-4 text-sm text-gray-700 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
          <p className="text-center sm:text-left">
            Don&apos;t have an account?
          </p>
          <NavLink
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
            to="/register"
          >
            Register
          </NavLink>
        </div>
      </footer>
    </main>
  );
}

export default LoginScreen;
