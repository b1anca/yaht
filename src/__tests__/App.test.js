import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";

describe("App", () => {
  it("should render/navigate correctly", async () => {
    const { user } = renderWithProviders(<App />);

    expect(screen.getByText(/yet another habits tracker/i)).toBeInTheDocument();

    await user.click(screen.getByText(/sign in/i));
    expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();
  });

  it("should redirect when on a bad page", () => {
    renderWithProviders(<App />, { route: "/something-that-does-not-match" });

    expect(screen.getByText(/yet another habits tracker/i)).toBeInTheDocument();
  });
});
