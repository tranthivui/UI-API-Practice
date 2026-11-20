import { APIRequestContext, APIResponse } from "@playwright/test";
import { ConduitUser } from "../../types/conduiType/NewUser";
import { CONDUIT_ARTICLE, CONDUIT_GET_USER_API, CONDUIT_LOGIN_API, CONDUIT_PROFILE, CONDUIT_REGISTER_API } from "../../config/conduitPaths/paths";
import { Article } from "../../types/conduiType/Article";

export class ConduitApi {
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async registerUser(user: ConduitUser): Promise<APIResponse> {
        const regRes = await this.request.post(CONDUIT_REGISTER_API, {
            data: {
                user: {
                    email: user.email,
                    password: user.password,
                    username: user.username
                }
            }
        });
        return regRes;
    }

    async login(user: Pick<ConduitUser, "email" | "password">): Promise<APIResponse> {
        const loginRes = await this.request.post(CONDUIT_LOGIN_API, {
            data: {
                user: {
                    email: user.email,
                    password: user.password
                }
            }
        });
        return loginRes;
    }

    async getCurrentUser(): Promise<APIResponse> {
        const getCurrentUserRes = await this.request.get(CONDUIT_GET_USER_API);
        return getCurrentUserRes;
    }

    async createArticle(article: Article) {
        const createArticleRes = await this.request.post(CONDUIT_ARTICLE, {
            data: {
                article: article
            }
        });
        return createArticleRes;
    }

    async getArticle(slug: string) {
        const getArticleRes = await this.request.get(`${CONDUIT_ARTICLE}/${slug}`);
        return getArticleRes;
    }

    async deleteArticle(slug: string) {
        const deleteArticleRes = await this.request.delete(`${CONDUIT_ARTICLE}/${slug}`);
        return deleteArticleRes;
    }

    async editArticle(article: Article, oldslug: string) {
        const editPath = `${CONDUIT_ARTICLE}/${oldslug}`;
        const editRes = await this.request.put(editPath, {
            data: {
                article: article
            }
        });
        return editRes;
    }

    async writeComment(slug: string, comment: string) {
        const writeComemntPath = `${CONDUIT_ARTICLE}/${slug}/comments`;
        const writeCommentRes = await this.request.post(writeComemntPath, {
            data: {
                comment: {
                    body: comment
                }
            }
        });
        return writeCommentRes;
    }

    async deleteComment(slug: string, id: number) {
        const deleteComemntPath = `${CONDUIT_ARTICLE}/${slug}/comments/${id}`;
        const deleteCommentRes = await this.request.delete(deleteComemntPath);
        return deleteCommentRes;
    }

    async getComments(slug: string) {
        const getComemntPath = `${CONDUIT_ARTICLE}/${slug}/comments`;
        const getCommentRes = await this.request.get(getComemntPath);
        return getCommentRes;
    }

    async followAuthor(username: string) {
        const followPath = `${CONDUIT_PROFILE}/${username}/follow`;
        const followRes = await this.request.post(followPath, {
            data: {}
        });
        return followRes;
    }

    async unFollowAuthor(username: string, bio: string, image: string) {
        const unFollowPath = `${CONDUIT_PROFILE}/${username}/follow`;
        const unFollowRes = await this.request.delete(unFollowPath, {
            data: {
                username: username,
                bio: bio,
                image: image,
                following: false
            }
        });
        return unFollowRes;
    }
}