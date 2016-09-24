import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Page} from './page';

import appSettings = require('../app.settings');
import {Breadcrumb} from "../breadcrumbs/breadcrumb";

@Injectable()
export class PageService {

    constructor(private http:Http) {
    }

    getBreadcrumbs() {
        return this.http.get(`${appSettings.apiEndpoint}/pages/list`)
            .toPromise()
            .then(response => response.json() as Breadcrumb[])
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
