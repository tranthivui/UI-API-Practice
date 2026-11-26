import {test as base} from "@playwright/test";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import { UploadFilePage } from "../../pages/internet/UploadFilePage.page";
import { DownloadPage } from "../../pages/internet/DownloadPage.page";

export type TempFile={
    path: string,
    name: string,
    content: string
};

type InternetFixture={
    tempFile: TempFile;
    uploadFilePage: UploadFilePage;
    downloadPage: DownloadPage
}

 export const test=base.extend<InternetFixture>({
    tempFile: async({},use,testInfo)=>{
        const id=randomUUID();
        const name=`ae08-${id}.txt`;
        const content=`AE08 upload test ${id}`;
        const path=testInfo.outputPath(name);
        await fs.writeFile(path,content,"utf-8");
        await use({path,name,content});
    },

    uploadFilePage: async({page},use)=>{
        const uploadFilePage=new UploadFilePage(page);
        await use(uploadFilePage);
    },

    downloadPage: async({page},use)=>{
        const downloadPage=new DownloadPage(page);
        await use(downloadPage);
    }
});

export {expect} from "@playwright/test"