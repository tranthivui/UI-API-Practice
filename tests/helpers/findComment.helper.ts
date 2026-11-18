import { expect } from "@playwright/test";
import { ConduitApi } from "../../src/api/conduitApi/ConduitApi";
import { getCommentRestData } from "../../src/types/conduiType/responseApi";
import { Comment } from "../../src/types/conduiType/Comment";

export async function findComment(slug:string, requestApi:ConduitApi, commentId:number):Promise<Comment|undefined> {
    const getCommentRes=await requestApi.getComments(slug);
            expect(getCommentRes.status()).toBe(200);
            const getCommentResData:getCommentRestData=await getCommentRes.json();
            const findComment=getCommentResData.comments.find(item => item.id===commentId);
            return findComment;
}