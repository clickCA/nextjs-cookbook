// src/app/__test__/index.test.jsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock Apollo Client
jest.mock("../lib/apolloClient", () => ({
    __esModule: true,
    default: () => ({
        query: jest.fn().mockResolvedValue({
            data: {
                countries: [
                    { code: "US", name: "United States", emoji: "🇺🇸" },
                    { code: "GB", name: "United Kingdom", emoji: "🇬🇧" },
                ],
            },
        }),
    }),
}));

describe("Home", () => {
    it("renders countries list", async () => {
        const { container } = render(await Home());

        const heading = screen.getByRole("heading", {
            name: /Countries/i,
        });

        expect(heading).toBeInTheDocument();
        expect(container).toHaveTextContent("United States");
        expect(container).toHaveTextContent("United Kingdom");
    });
});
