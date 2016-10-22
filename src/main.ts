import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Override  ng2-select pipe, because of known issue with component,
// this should be removed after upgrading to a stable version of the package

import {escapeRegexp} from 'ng2-select/components/select/common';
import {HighlightPipe} from 'ng2-select/components/select/select-pipes';


HighlightPipe.prototype.transform = (value: any, args: any) => {
    if (args.length < 1) {
        return value;
    }

    let query = args[0];

    if ( query ) {
        value = value.changingThisBreaksApplicationSecurity || value;

        let tagRE    = new RegExp('<[^<>]*>', 'ig');

        // get ist of tags
        let tagList  = value.match( tagRE );

        // Replace tags with token
        let tmpValue = value.replace( tagRE, '$!$');

        // Replace search words
        value = tmpValue.replace(
            new RegExp(escapeRegexp(query), 'gi'),
            '<strong>$&</strong>'
        );

        // Reinsert HTML
        for (let i = 0; value.indexOf('$!$') > -1; i++) {
            value = value.replace('$!$', tagList[i]);
        }
    }

    return value;
};
// End of override

platformBrowserDynamic().bootstrapModule(AppModule);
