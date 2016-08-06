import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Page} from './page';

@Injectable()
export class PageService {
    private pagesUrl = '/pages/list';

    constructor(private http:Http) {
    }

    getPages() {
        return this.http.get(this.pagesUrl)
            .toPromise()
            .then(response => response.json() as Page[])
            .catch(this.handleError);
    }

    // Add new Page
    private post(page:Page):Promise<Page> {
        let headers = new Headers({'Content-Type': 'application/json'});

        return this.http
            .post(this.pagesUrl, JSON.stringify(page), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Page
    private put(page:Page) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.pagesUrl}/${page.id}`;

        return this.http
            .put(url, JSON.stringify(page), {headers: headers})
            .toPromise()
            .then(() => page)
            .catch(this.handleError);
    }

    save(page:Page):Promise<Page> {
        if (page.id) {
            return this.put(page);
        }
        return this.post(page);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}