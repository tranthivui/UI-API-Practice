import { Article } from "../../types/conduiTypes/Article";

export function buildArticle():Article {
    return {
        title: `Test new article ${Date.now()}`,
        description: `Write new test`,
        body: `- New article\n -Test`,
        tagList: [
            "#artucle #new"
        ]
    }
}