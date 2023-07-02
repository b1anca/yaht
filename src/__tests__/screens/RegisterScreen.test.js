import React from "react";
import { rest } from "msw";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { server } from "../../mocks/server";
import RegisterScreen from "../../screens/RegisterScreen";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("RegisterScreen", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<RegisterScreen />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should navigate to login after form submit", async () => {
    const { user } = renderWithProviders(<RegisterScreen />);
    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const passwordConfirmInput = screen.getByLabelText("password_confirmation");

    fireEvent.change(nameInput, { target: { value: "username" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "examplePassword" } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: "examplePassword" },
    });
    await user.click(
      screen.getByRole("button", { name: "Create account", type: "submit" })
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });

  it("should show error message on server error", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_YAHT_API_URL}/users`,
        (_, res, ctx) => {
          return res(ctx.json({ error: "unauthorized" }), ctx.status(401));
        }
      )
    );
    const { user } = renderWithProviders(<RegisterScreen />);

    user.click(screen.getByRole("button", { name: "Create account" }));
    await screen.findByRole("alert");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Request failed with status code 401"
    );
  });
});
