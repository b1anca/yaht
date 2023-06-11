import React from "react";
import { rest } from "msw";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { server } from "../../mocks/server";
import LoginScreen from "../../screens/LoginScreen";

describe("LoginScreen", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<LoginScreen />);

    expect(asFragment(<LoginScreen />)).toMatchSnapshot();
  });

  it("shows error message on server error", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_YAHT_API_URL}/auth/login`,
        (_, res, ctx) => {
          return res(ctx.json({ error: "unauthorized" }), ctx.status(401));
        }
      )
    );
    renderWithProviders(<LoginScreen />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await screen.findByRole("alert");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Request failed with status code 401"
    );
  });
});
