import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';

import * as showdown from 'showdown';

var converter = new showdown.Converter({'tables': true});

@Pipe({name: 'markdown'})
export class MarkdownToHtmlPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer){}

    transform(markdown: string): SafeHtml {
      return this._sanitizer.bypassSecurityTrustHtml(converter.makeHtml(markdown));
    }
}
