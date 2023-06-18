import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";
import NavLink from "../components/NavLink";

function LoginScreen() {
  const { loading, userInfo, error, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (userInfo) {
      const redirectTo = searchParams.get("redirectTo") || "/habits";
      navigate(redirectTo);
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <main className="relative h-screen flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        {userToken && (
          <Alert type="warning" className="mb-10 w-full max-w-sm">
            Session expired. Please sign in again.
          </Alert>
        )}
        <form
          className="w-full max-w-sm bg-slate-300/5 rounded px-6 py-12"
          onSubmit={handleSubmit(submitForm)}
        >
          {error && <Alert>{error}</Alert>}
          <Input
            type="email"
            required
            {...register("email")}
            label="Email"
            autoComplete="username"
          />
          <Input
            type="password"
            required
            {...register("password")}
            label="Password"
            autoComplete="current-password"
          />
          <Button primary type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </div>
      <footer className="relative shrink-0">
        <div className="space-y-4 text-sm sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
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
