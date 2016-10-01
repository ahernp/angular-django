import { Pipe, PipeTransform } from '@angular/core';

import * as showdown from 'showdown';

var converter = new showdown.Converter({'tables': true});

@Pipe({name: 'markdown'})
export class MarkdownToHtmlPipe implements PipeTransform {
  transform(markdown: string): string {
    return converter.makeHtml(markdown);
  }
}
