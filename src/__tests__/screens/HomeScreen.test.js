import React from "react";
import { renderWithProviders } from "../../utils/test-utils";
import HomeScreen from "../../screens/HomeScreen";

describe("HomeScreen", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<HomeScreen />);

    expect(asFragment()).toMatchSnapshot();
  });
});
