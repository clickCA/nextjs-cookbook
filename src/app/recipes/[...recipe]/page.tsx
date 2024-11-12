"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface RecipeProps {
    initialData: string;
}

const Recipe = ({ initialData }: RecipeProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const recipes = searchParams.getAll("recipes");
    const comment_page = searchParams.get("comment_page");

    let label = "Next Recipe";
    let link = "/recipes/breakfast/HealthyBreakfast";
    const default_comment_pages_value = Number(comment_page) ?? 10;

    if (recipes && recipes[2] === "HealthyBreakfast") {
        label = "Previous Recipe";
        link = "/recipes/breakfast/AnotherHealthyBreakfast";
    }

    useEffect(() => {
        // Init some default value
        router.push(link + "?comment_page=" + default_comment_pages_value);
    }, []);

    useEffect(() => {
        console.log(comment_page, initialData);
    }, [comment_page, initialData]);

    const nextPageNumber = (page: string | string[] | undefined): number => {
        return Number(page) + 1;
    };

    return (
        <div>
            Recipe: in
            {Array.isArray(recipes) &&
                recipes.map((recipe: string, index: number) => (
                    <div key={index}>
                        <b>{recipe}</b>
                    </div>
                ))}
            <button onClick={() => router.push(link)}>{label}</button>
            <button
                onClick={() =>
                    router.push(
                        link + "?comment_page=" + nextPageNumber(comment_page),
                        undefined,
                        { shallow: true }
                    )
                }
            >
                Change comment page
            </button>
        </div>
    );
};

Recipe.getInitialProps = () => {
    const initialData = "data on load: " + Math.random();
    return { initialData };
};

export default Recipe;
