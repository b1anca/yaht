import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import ProfileScreen from "../../screens/ProfileScreen";

describe("ProfileScreen", () => {
  it("should render correctly", async () => {
    const preloadedState = { auth: { userInfo: { name: "User name" } } };
    const { asFragment } = renderWithProviders(<ProfileScreen />, {
      preloadedState,
    });

    await waitFor(() => {
      screen.getByText(/user name/i);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
