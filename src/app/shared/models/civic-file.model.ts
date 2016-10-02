export class CivicFile {

    constructor(theFile: File, newFileName: string) {
        this.TheFile = theFile;
        this.NewFileName = newFileName;
    }
    TheFile: File;
    NewFileName: string;
}