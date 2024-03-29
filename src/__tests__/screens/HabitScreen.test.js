import React from "react";
import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import HabitScreen from "../../screens/HabitScreen";

jest.useFakeTimers().setSystemTime(new Date("2023-01-10"));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
}));

global.ResizeObserver = require("resize-observer-polyfill");

describe("HabitScreen", () => {
  it("should render correctly", async () => {
    const preloadedState = {
      habits: {
        habits: [
          {
            id: 1,
            name: "Reading",
            color: "#75ab74",
            tasks: [{ id: 11, completed_at: "2023-06-02T03:00:00.000Z" }],
            description: "Reading 10 pages",
            overall_progress: "90.0",
            created_at: "2023-06-02T03:00:00.000Z",
          },
        ],
      },
    };
    const { asFragment } = renderWithProviders(<HabitScreen />, {
      preloadedState,
    });

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
