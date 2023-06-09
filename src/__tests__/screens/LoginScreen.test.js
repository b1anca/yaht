import React from "react";
import { rest } from "msw";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { server } from "../../mocks/server";
import LoginScreen from "../../screens/LoginScreen";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("LoginScreen", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<LoginScreen />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should navigate to habits after form submit", async () => {
    const { user } = renderWithProviders(<LoginScreen />);
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "examplePassword" } });
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(mockedNavigate).toHaveBeenCalledWith("/habits");
  });

  it("should be able to submit form and save token to local storage", async () => {
    const { user } = renderWithProviders(<LoginScreen />);
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const email = "user@example.com";

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: "examplePassword" } });
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(window.localStorage.getItem("userToken")).toEqual(`token-${email}`);
  });

  it("should show error message on server error", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_YAHT_API_URL}/auth/login`,
        (_, res, ctx) => {
          return res(ctx.json({ error: "unauthorized" }), ctx.status(401));
        }
      )
    );
    const { user } = renderWithProviders(<LoginScreen />);

    user.click(screen.getByRole("button", { name: "Sign in" }));
    await screen.findByRole("alert");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Request failed with status code 401"
    );
  });
});
