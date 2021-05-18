// test/pages/index.test.js

import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "../test-utils";
import HomePage from "../../pages/index";

describe("HomePage", () => {
  it("should render the heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Welcome to Elmonds Kreslins Application",
      })
    ).toBeInTheDocument();
  });
});
