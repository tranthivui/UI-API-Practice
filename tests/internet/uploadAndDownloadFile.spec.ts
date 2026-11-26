import {expect, test} from "../../src/fixtures/internet/internet.fixture";
import fs from "fs";

test.describe("Verify upload file",()=>{
    test("AE08-01: Verify upload file",{tag: ["@ui","@smoke"]}, async({tempFile,uploadFilePage})=>{
        await uploadFilePage.goto();
        await expect(uploadFilePage.headingUpload).toBeVisible();
        await uploadFilePage.uploadFile(tempFile.path);
        await expect(uploadFilePage.headingUploadSuccess).toBeVisible();
        await expect(uploadFilePage.fileName).toHaveText(tempFile.name);
    })

    test("AE08-02: Verify upload file then download",{tag: ["@ui"]}, async({tempFile,uploadFilePage,downloadPage},testInfo)=>{
        await uploadFilePage.goto();
        await expect(uploadFilePage.headingUpload).toBeVisible();
        await uploadFilePage.uploadFile(tempFile.path);
        await expect(uploadFilePage.headingUploadSuccess).toBeVisible();
        await downloadPage.goto();
        await expect(downloadPage.headingTitle).toBeVisible();
        const download=await downloadPage.downloadFile(tempFile.name);
        expect(download.suggestedFilename()).toBe(tempFile.name);
        const downloadFilePath=testInfo.outputPath(download.suggestedFilename());
        await download.saveAs(downloadFilePath);
        const uploadFileContent=fs.readFileSync(tempFile.path);
        const downloadContent=fs.readFileSync(downloadFilePath);
        expect(downloadContent.equals(uploadFileContent)).toBeTruthy();
    })
})