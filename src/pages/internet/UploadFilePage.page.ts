import { Locator, Page } from "playwright";

export class UploadFilePage {
    private readonly url = "upload";
    readonly page: Page;
    readonly chooseFileBtn: Locator;
    readonly uploadBtn: Locator;
    readonly headingUpload: Locator;
    readonly headingUploadSuccess: Locator;
    readonly fileName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseFileBtn = this.page.locator("#file-upload");
        this.uploadBtn = this.page.getByRole("button", { name: "Upload" });
        this.headingUpload = this.page.getByRole("heading", { name: "File Uploader", level: 3 });
        this.headingUploadSuccess = this.page.getByRole("heading", { name: "File Uploaded!", level: 3 });
        this.fileName = this.page.locator("#uploaded-files");
    }

    async chooseFile(filePath: string): Promise<void> {
        await this.chooseFileBtn.setInputFiles(filePath);
    }

    async clickUploadFile() {
        await this.uploadBtn.click();
    }

    async uploadFile(filePath: string) {
        await this.chooseFile(filePath);
        await this.clickUploadFile();
    }

    async goto() {
        await this.page.goto(this.url);
    }
}
