import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appName'})
export class AppNamePipe implements PipeTransform {
    transform (apps,searchQuery){
        console.log(apps,searchQuery)
        return apps.filter((app)=>{
            return app.appName == searchQuery
        })
    }
}