import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import HabitsScreen from "../../../screens/HabitsScreen";

jest.useFakeTimers().setSystemTime(new Date("2023-01-10"));

global.ResizeObserver = require("resize-observer-polyfill");

describe("HabitsScreen", () => {
  it("should render correctly", async () => {
    const { asFragment } = renderWithProviders(<HabitsScreen />);

    await waitFor(() => {
      screen.getAllByText(/reading/i);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
