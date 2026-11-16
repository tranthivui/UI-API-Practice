import { Article } from "./Article"

export type UserResponse = {
    user: ConduitUserData
}

export type UserRegisterFail = {
    errors: {
        email: string[]
    }
}

export type GetUserRes = {
    email: string,
    password: string,
}

export type GetUserFail = {
    status: string,
    message: string
}

export type ConduitUserData = {
    id?: number,
    email: string,
    username: string,
    bio: string|null,
    image: string|null,
    token: string
}

export type ArticleDataRes = {
    article: {
        slug: string,
        title: string,
        description: string,
        body: string,
        tagList: string[],
        createdAt: string,
        updateAt: string,
        favoritesCount: number,
        author: {
            username: string,
            bio: string,
            image: string,
            following: boolean
        }
    }
}
