import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'trimurl'})
export class TrimUrlPipe implements PipeTransform {
    transform(url: string): string {
        if (url == undefined)
            return '';
        return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
}
