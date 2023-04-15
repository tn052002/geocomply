import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

class UploadPage extends Page {
    public get chooseFile () {
        return $('#uploadfile_0');
    }

    public get fieldTitle () {
        return $('#uploadwindow > span > b');
    }

    public get termsChecbox () {
        return $('#terms');
    }

    public get termsLink () {
        return $('=terms of service');
    }

    public get submitBtn () {
        return $('#submitbutton');
    }

    public get uploadResult () {
        return $('#res')
    }

    public async upload (filePath:string) {
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.chooseFile.setValue(remoteFilePath);
        await this.termsChecbox.click();
        await this.submitBtn.click();
        await browser.pause(3000);
    }
}

export default new UploadPage();