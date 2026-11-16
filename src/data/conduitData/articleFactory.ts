import { CONDUIT_ENV } from "../../config/env";
import { Article } from "../../types/conduiType/Article";
import { ConduitUser } from "../../types/conduiType/NewUser";

export function buildArticle():Article {
    return {
        title: `Test new article ${Date.now()}`,
        description: `Write new test`,
        body: `- New article\n -Test`,
        tagList: [
            "#artucle#new"
        ]
    }
}