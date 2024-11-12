"use client";
import { useEffect, useState } from "react";
import { BurgerBuilder, BurgerDirector } from "../lib/burgerBuilder";
import { IArticle, ArticleDataService } from "@/app/lib/dataService";

const burgerBuilder = new BurgerBuilder();
const burgerDirector = new BurgerDirector();
burgerDirector.setBuilder(burgerBuilder);

const MockingPage = () => {
    const [content, setContent] = useState<IArticle | null>(null);
    const [recipes, setRecipes] = useState<{ id: number; name: string }[]>([]);
    const pid = 1; // Mocked pid

    useEffect(() => {
        // Mock fetching recipes
        setRecipes([
            { id: 1, name: "Recipe 1" },
            { id: 2, name: "Recipe 2" },
        ]);
    }, []);

    useEffect(() => {
        if (pid) {
            setContent({
                ...ArticleDataService.getInstance().getArticle("1"),
            });
            burgerDirector.buildHamburger();
        }
        console.log("getting the recipe", burgerBuilder.getRecipe());
    }, [recipes]);

    return (
        <div>
            {content && (
                <div>
                    <h2>{content.title}</h2>
                    <p>{content.content}</p>
                </div>
            )}
        </div>
    );
};

export default MockingPage;
