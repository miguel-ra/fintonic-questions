import React from "react";
import { render, screen } from "@testing-library/react";
import App, { menuItems } from "../App";

describe("<App />", () => {
  it("Should render header components", () => {
    render(<App />);

    menuItems.forEach((item) => {
      expect(
        screen.getByRole("listitem", { name: item.label })
      ).toBeInTheDocument();
    });
  });

  it("Should render question components", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /browse questions/i })
    ).toBeInTheDocument();
  });
});
