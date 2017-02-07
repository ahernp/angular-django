import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'trimurl'})
export class TrimUrlPipe implements PipeTransform {
    transform(url: string): string {
      return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
}
