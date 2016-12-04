import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Page} from './page';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {apiEndpoint, pageUrl} from "../app.settings";

@Injectable()
export class PageService {

    pageCache: Page[] = [];
    pages$: ReplaySubject<any> = new ReplaySubject(1);

    breadcrumbCache: Breadcrumb[] = [];
    breadcrumbs$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(private http:Http) {
        this.pages$.next([]);
        this.breadcrumbs$.next([]);
        this.cacheAllPages();
    }

    getPage(slug:string): Observable<Page> {
        let pages = this.pageCache.filter(page => page.url == `${pageUrl}/${slug}`);
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

    getPages(): ReplaySubject<any> {
        return this.pages$;
    }

    getPageBreadcrumbs(slug: string): ReplaySubject<any> {
        let breadcrumbs = this.breadcrumbCache;
        if (slug != undefined) {
            var parent = this.pageCache.filter(page => page.url == `${pageUrl}/${slug}`)[0];
            breadcrumbs = this.breadcrumbCache.filter(breadcrumb => breadcrumb.parentName == parent.title);
        }
        this.breadcrumbs$.next(breadcrumbs);
        return this.breadcrumbs$;
    }

    cacheAllPages(): void {
        this.http.get(`${apiEndpoint}/pages/all/`)
            .subscribe((response: Response) => {
                this.pageCache = response.json() as Page[];
                this.pages$.next(this.pageCache);
                this.populateBreadcrumbCache();
            });
    }

    populateBreadcrumbCache() {
        let breadcrumbs = [];
        for (let page of this.pageCache)
            breadcrumbs.push({
                title: page.title,
                url: page.url,
                updated: page.updated,
                parentName: page.parentName,
                linkFlag: true
            })
        this.breadcrumbCache = breadcrumbs;
        this.breadcrumbs$.next(breadcrumbs);
    }
}
