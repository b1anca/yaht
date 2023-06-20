import React from "react";
import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import EditHabitScreen from "../../screens/EditHabitScreen";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1 }),
}));

describe("EditHabitScreen", () => {
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
          },
        ],
      },
    };
    const { asFragment } = renderWithProviders(<EditHabitScreen />, {
      preloadedState,
    });

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
