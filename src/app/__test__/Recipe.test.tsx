import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeList from "@/app/recipe-list/page";

describe("RecipeList", () => {
    it("renders a heading", () => {
        render(<RecipeList />);

        const heading = screen.getByRole("heading", {
            name: /Recipe list/i,
        });

        expect(heading).toBeInTheDocument();
    });
});
