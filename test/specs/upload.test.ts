import UploadPage from "../pageobjects/upload.page";

describe('Upload page UI Layout', () => {
    before(async () => {
        await UploadPage.goto('/test/upload/');
    });

    it('should display Choose File input', async () => {
        await expect(UploadPage.chooseFile).toBeExisting();
    });

    it('should display Field title', async () => {
        await expect(UploadPage.fieldTitle).toBeExisting();
        await expect(UploadPage.fieldTitle).toHaveTextContaining('Select file to send(max 196.45 MB)')
    });

    it('should display accept Terms checkbox', async () => {
        await expect(UploadPage.termsChecbox).toBeExisting();
    });

    it('should display link to the Terms of Service', async () => {
        await expect(UploadPage.termsLink).toBeExisting();
    });

    it('should display button to Submit file', async () => {
        await expect(UploadPage.submitBtn).toBeExisting();
    });
});

describe('Upload Page functions', () => {
    before(async () => {
        await UploadPage.goto('/test/upload/');
        console.log(`***** ${process.cwd()}`);
    });

    it('should upload file of size smaller than 196.45 MB successfully', async () => {
        console.log('A. Verify the upload functionality with a valid file:');
        await UploadPage.upload(`${process.cwd()}/test/assets/fileToUpload.png`);
        expect(UploadPage.uploadResult).toBeDisplayed();
        let result = await UploadPage.uploadResult.getText();

        console.log('D. Verify that the notification message appears after a file is uploaded:')
        expect(result).toContain('1 file\nhas been successfully uploaded.')
    })

    it('should show error message when no file is selected for upload', async () => {
        console.log('B. Verify the upload functionality with an invalid file');
    })

    it('should show error message when file upload is greater than 196.45 MB', async () => {
        console.log('B. Verify the upload functionality with an invalid file');
    });

    it('should show error message when file upload is of invalid extension', async () => {
        console.log('B. Verify the upload functionality with an invalid file');
    });

    it('should show error message when terms of service checkbox is not selected', async () => {
        console.log('C. Verify that the acceptance checkbox is required before uploading a file');
    });
    
});