import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
    it("renders a heading", () => {
        render(<Home />);

        const heading = screen.getByRole("heading", {
            name: /Hello there! This is the main page of CookBook/,
        });

        expect(heading).toBeInTheDocument();
    });
});
