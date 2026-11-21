import { Comment } from "./Comment"

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
    bio: string | null,
    image: string | null,
    token: string
}

export type ArticleDataRes = {
    article: ArticleRes
}

export type ArticlesListRes = {
    articles: ArticleRes[];
}

export type getCommentRestData = {
    comments: Comment[];
}

export type writeCommentRestData = {
    comment: Comment;
}

export type ErrorRegisterResponse = {
    errors: Record<string, string[]>;
};

export type ArticleRes = {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updateAt: string,
    favorited: boolean;
    favoritesCount: number,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}

export type FollowResData = {
    profile: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}