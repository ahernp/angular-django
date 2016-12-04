import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Page} from './page';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {apiEndpoint, blogRootTitle, pageUrl} from "../app.settings";

@Injectable()
export class PageService {

    pageCache: Page[] = [];
    breadcrumbCache: Breadcrumb[] = [];
    breadcrumbs$: ReplaySubject<any> = new ReplaySubject(1);
    allCached: boolean = false;

    constructor(private http:Http) {
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

    getPageBreadcrumbs(slug: string) {
        let breadcrumbs = this.breadcrumbCache.slice(0);
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

    getRecentBlogPages(limit:number) {
        let pages = this.pageCache.filter(page => page.parentName == blogRootTitle);
        pages.sort((pageA: Page, pageB: Page): number => {
            if (pageA.published == pageB.published)
                return 0;
            else
                return (pageA.published > pageB.published) ? -1 : 1;
        });
        return pages.slice(0, limit);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
