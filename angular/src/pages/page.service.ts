import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Page} from './page';

import appSettings = require('../app.settings');

@Injectable()
export class PageService {

    constructor(private http:Http) {
    }

    getPages() {
        return this.http.get('/api/pages/list')
            .toPromise()
            .then(response => response.json() as Page[])
            .catch(this.handleError);
    }

    getPage(slug:string) {
        return this.http.get(`${appSettings.apiEndpoint}/pages/read/${slug}`)
            .toPromise()
            .then(response => response.json() as Page)
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
