import { CivicFile } from './../shared/models/civic-file.model';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

//https://www.thepolyglotdeveloper.com/2016/02/upload-files-to-node-js-using-angular-2/

@Injectable()
export class UploadService extends BaseService {
    constructor(private http: Http) {
        super(http);
    }
      uploadLogo(logo: CivicFile)
      {
          const url = `${this.rootAddress + 'uploadlogo'}`;
  
           
          var files = new Array<CivicFile>();
          files.push(logo);
  
          return this.makeFileRequest(url, [], files);
      }
  
     private makeFileRequest(url: string, params: Array<string>, files: Array<CivicFile>) {
          return new Promise((resolve, reject) => {
              var formData: any = new FormData();
              var xhr = new XMLHttpRequest();
              for(var i = 0; i < files.length; i++) {
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
              xhr.send(formData);
          });
      }

}