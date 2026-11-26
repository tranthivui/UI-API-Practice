import { Download, Locator, Page } from "@playwright/test";

export class DownloadPage{
    private readonly url="download";
    readonly page:Page;
    readonly headingTitle: Locator;

    constructor(page:Page){
        this.page=page;
        this.headingTitle=this.page.getByRole("heading",{name:"File Downloader"});
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async downloadFile(fileName:string):Promise<Download>{
        const downloadPromise = this.page.waitForEvent("download");
        await this.page.getByRole("link",{name:`${fileName}`}).click();
        const download=await downloadPromise;
        return download;
    }
}