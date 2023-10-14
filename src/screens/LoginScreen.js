import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";
import NavLink from "../components/NavLink";
import Header from "../components/Header";
import { Heading, P } from "../components/Typography";

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
    <>
      <div className="relative h-screen flex flex-1 flex-col overflow-hidden">
        <Header />
        <div className="relative flex flex-1 flex-col items-center justify-center">
          {!loading && userToken && (
            <Alert type="warning" className="mb-10 w-full max-w-sm">
              Session expired. Please sign in again.
            </Alert>
          )}
          <form
            className="w-full max-w-md p-6"
            onSubmit={handleSubmit(submitForm)}
          >
            <Heading level="h2" className="text-center">
              Sign in
            </Heading>
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
            <Button primary type="submit" loading={loading} className="w-full">
              Sign in
            </Button>
          </form>
        </div>
        <footer className="relative my-8">
          <div className="flex justify-center items-center">
            <P className="text-center mr-4 !mb-0">
              Don&apos;t have an account?
            </P>
            <NavLink secondary to="/register">
              Register
            </NavLink>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LoginScreen;
