import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {MarkdownPage} from './markdown-page';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {apiEndpoint} from "../app.settings";

@Injectable()
export class MarkdownPageService {

    constructor(private http:Http) {
    }

    getAllPageBreadcrumbs() {
    }

    getPageBreadcrumbs(slug:string) {
        if (slug == undefined)
            return this.http.get(`${apiEndpoint}/pages/list/`)
                .toPromise()
                .then(response => response.json() as Breadcrumb[])
                .catch(this.handleError);
        else
            return this.http.get(`${apiEndpoint}/pages/list/?parent_slug=${slug}`)
                .toPromise()
                .then(response => response.json() as Breadcrumb[])
                .catch(this.handleError);
    }

    getPage(slug:string) {
        return this.http.get(`${apiEndpoint}/pages/read/${slug}`)
            .toPromise()
            .then(response => response.json() as MarkdownPage)
            .catch(this.handleError);
    }

    getChildPages(slug:string) {
        return this.http.get(`${apiEndpoint}/pages/childpages/${slug}`)
            .toPromise()
            .then(response => response.json() as MarkdownPage[])
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
