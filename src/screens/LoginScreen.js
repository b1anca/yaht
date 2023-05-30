import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Error from "../components/Error";
import Input from "../components/Input";
import Button from "../components/Button";
import NavLink from "../components/NavLink";

function LoginScreen() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
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
          <NavLink secondary to="/register">
            Register
          </NavLink>
        </div>
      </footer>
    </main>
  );
}

export default LoginScreen;
