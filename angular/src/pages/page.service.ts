import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

import {Page} from './page';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {apiEndpoint} from "../app.settings";

@Injectable()
export class PageService {

    pageCache: Page[] = [];
    allCached: boolean = false;

    constructor(private http:Http) {
        this.cacheAllPages();
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

    getPage(slug:string): Observable<Page> {
        let pages = this.pageCache.filter(page => page.url == `/page/${slug}`);
        if (pages.length > 0)
            return Observable.of(pages[0]);
        else
            return this.http.get(`${apiEndpoint}/pages/read/${slug}`)
                .map((response: Response) => {
                    let page: Page = response.json() as Page;
                    this.pageCache.push(page);
                    return page;
                });
    }

    cacheAllPages(): void {
        this.http.get(`${apiEndpoint}/pages/all/`)
            .subscribe((response: Response) => this.pageCache = response.json() as Page[]);
    }

    getRecentBlogPages() {
        return this.http.get(`${apiEndpoint}/pages/blogpages/`)
            .toPromise()
            .then(response => response.json() as Page[])
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
