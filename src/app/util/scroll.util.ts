import {ElementRef} from '@angular/core';

export function scrollToElementRef(elem: ElementRef) {
    elem.nativeElement.scrollIntoView({behavior: "smooth", block:"start"});
}
