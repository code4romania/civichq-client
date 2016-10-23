import { AuthService } from './auth.service';
import { CivicFileValidationResult } from './../shared/models/file-validation-result.model';
import { CivicFile } from './../shared/models/civic-file.model';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

//https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/

@Injectable()
export class UploadService extends BaseService {
    constructor(private http: Http, private auth: AuthService) {
        super(http);
    }
      uploadLogo(logo: CivicFile) : Promise<any>
      {
          const url = `${this.rootAddress + 'uploadlogo'}`;
  
           
          var files = new Array<CivicFile>();
          files.push(logo);
  
          return this.makeFileRequest(url, [], files);
      }
  
     private makeFileRequest(url: string, params: Array<string>, files: Array<CivicFile>) {
         return this.auth.loginSentinel()
         .toPromise()
            .then(() => {
                 return new Promise((resolve, reject) => {
                 var formData: any = new FormData();
                 var xhr = new XMLHttpRequest();
                 
                 for (var i = 0; i < files.length; i++) {
                     formData.append("uploads[]", files[i].TheFile, files[i].NewFileName);
                 }
                 xhr.onreadystatechange = function () {
                     if (xhr.readyState == 4) {
                         if (xhr.status == 200) {
                             resolve(JSON.parse(xhr.response));
                         } else {
                             reject(xhr.response);
                         }
                     }
                 }
                 xhr.open("POST", url, true);
                 xhr.setRequestHeader(this.auth.authHeaderName, this.auth.sentinelToken);
                 xhr.send(formData);
             });
            });
      }


       IsFileAllowed(theFile: CivicFile): CivicFileValidationResult{
        var extensionResult = this.isFileExtensionAllowed(theFile.NewFileName);
        var sizeResult = this.isSizeAllowed(theFile);
        var resolutionResult = this.isResolutionAllowed(theFile);

        var result = new CivicFileValidationResult();
        result.IsValid = (extensionResult.IsValid && sizeResult.IsValid && resolutionResult.IsValid);

        result.ErrorMessage = '';
        if (extensionResult.ErrorMessage) {
            result.ErrorMessage += extensionResult.ErrorMessage + '; ';
        }
        if (sizeResult.ErrorMessage) {
            result.ErrorMessage += sizeResult.ErrorMessage + '; '
        }
        if (resolutionResult.ErrorMessage) {
            result.ErrorMessage += resolutionResult.ErrorMessage; 
        } 

        return result;
    }

    private isSizeAllowed(theFile: CivicFile): CivicFileValidationResult{
        var result = new CivicFileValidationResult();
        result.IsValid = true;
        if (theFile.TheFile.size > 500000) {
            result.IsValid = false;
            result.ErrorMessage ='Fisierul ' + theFile.TheFile.name + ' este prea mare! Dimensiunea maxima admisa este de 500KB.';
        }
        return result;
    }

    private isResolutionAllowed(theFile: CivicFile): CivicFileValidationResult{
        var result = new CivicFileValidationResult();
        result.IsValid = true;
        
        var img = new Image();
        img.src = window.URL.createObjectURL(theFile.TheFile);
        img.onload = (ev: Event) => {
            var width = img.naturalWidth;
            var height = img.naturalHeight;
            window.URL.revokeObjectURL(img.src);
            if (width > 1000 || height > 1000) {
                result.IsValid = false;
                result.ErrorMessage = 'Rezolutia pentru fisierul ' + theFile.TheFile + ' nu poate depasi 1000x1000.';
            }
        }
        return result;
    }

    private isFileExtensionAllowed(filename: string): CivicFileValidationResult {
        var ext = filename.match(/\.([^\.]+)$/)[1];
        console.log('extensia este ' + ext);
        var result = new CivicFileValidationResult();
               
        switch (ext) {
            case 'jpg':
            case 'png':
                result.IsValid =  true;
                break;
            default:
                result.IsValid =  false;
                result.ErrorMessage = 'Extensie invalida (' + filename +'). Fisierul poate fi .jpg sau .png';
        }
        return result;
    }

     GetNewLogoName(originalName: string): string {
        var prefix = this.randomstring(8);
        var newName = prefix + originalName;
        return newName;
    }

    private randomstring(L) {
        var s = '';
        while (s.length < L) s += this.getRandomChar();
        return s;
    }

    private getRandomChar(): string {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n.toString(); //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    }

}