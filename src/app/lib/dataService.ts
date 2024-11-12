import articles from "@/mocks/articles.json";
import baking from "@/mocks/burgerSteps.json";
import users from "@/mocks/users.json";
export const getMock = {
    articles,
    baking,
    users,
};

export interface IUser {
    state: boolean;
    token: string;
}
export interface ILoginStrategy {
    login(user: string, password: string): IUser;
}

export interface ICategory {
    title: string;
    url: string;
}

export interface IArticle {
    id: number;
    title: string;
    author: string;
    content: string;
    category: ICategory;
    image: string;
    createdAt: string;
    allowComments: boolean;
    status: "public" | "draft";
}

export class ArticleDataService {
    private static instance: ArticleDataService;
    private constructor() {}
    private articles: { [key: string]: IArticle } = {};
    private navigation: Array<string> = [];

    public static getInstance(): ArticleDataService {
        if (!ArticleDataService.instance) {
            console.log("ArticleDataService new instance");
            ArticleDataService.instance = new ArticleDataService();
        }
        return ArticleDataService.instance;
    }

    getNavigation() {
        if (Array.isArray(this.navigation) && this.navigation.length === 0) {
            this.navigation = getMock.articles.map((article) =>
                article.id.toString()
            );
        }
        return this.navigation;
    }

    getArticle(id: string) {
        if (!this.articles[id]) {
            this.articles[id] = getMock.articles.find(
                (article) => article.id === Number(id)
            ) as IArticle;
        }
        return this.articles[id];
    }
}
