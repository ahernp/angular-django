import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Page} from './page';

import {SearchResult, SearchResults} from "../core/search/search-results";

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {adminBreadcrumb, blogArchiveBreadcrumb, blogBreadcrumb, dashboardBreadcrumb,
    feedreaderBreadcrumb, rootBreadcrumb, rootTitle, timersBreadcrumb,
    toolsBreadcrumb} from '../app.settings';
import {toolBreadcrumbs} from '../tools/tools.component'

import {apiEndpoint, pageUrl} from "../app.settings";
import {findStringContext} from "../utilities";

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

    getBreadcrumbs(): ReplaySubject<any> {
        return this.breadcrumbs$;
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

    refresh(url: string): Observable<Page> {
        this.pageCache = this.pageCache.filter(page => page.url != url);
        return this.getPage(url.replace(`${pageUrl}/`, ''));
    }

    cacheAllPages(): void {
        this.http.get(`${apiEndpoint}/pages/all/`)
            .subscribe((response: Response) => {
                this.pageCache = response.json() as Page[];
                this.pages$.next(this.pageCache);
                this.populateBreadcrumbCache();
            });
    }

    getDynamicPageBreadcrumbs(): Breadcrumb[] {
        let breadcrumbs = [];
        breadcrumbs.push(blogBreadcrumb);
        breadcrumbs.push(blogArchiveBreadcrumb);
        breadcrumbs.push(dashboardBreadcrumb);
        breadcrumbs.push(feedreaderBreadcrumb);
        breadcrumbs.push(rootBreadcrumb);
        breadcrumbs.push(timersBreadcrumb);
        breadcrumbs.push(toolsBreadcrumb);

        for (let toolBreadcrumb of toolBreadcrumbs) {
            toolBreadcrumb.parentName = 'Tools';
            breadcrumbs.push(toolBreadcrumb);
        }

        return breadcrumbs;
    }

    populateBreadcrumbCache() {
        let breadcrumbs: Breadcrumb[] = this.getDynamicPageBreadcrumbs();
        for (let page of this.pageCache)
            breadcrumbs.push({
                title: page.title,
                url: page.url,
                published: page.published,
                updated: page.updated,
                parentName: page.parentName,
                externalLinkFlag: false
            })
        this.breadcrumbCache = breadcrumbs;
        this.breadcrumbs$.next(breadcrumbs);
    }

    search(searchString: string): SearchResults {
        let searchResults: SearchResults = new SearchResults();
        let searchStringLower = searchString.toLocaleLowerCase();

        for (let breadcrumb of this.breadcrumbCache) {
            let matchPosition = breadcrumb.title.toLocaleLowerCase().indexOf(searchStringLower);
            if (matchPosition == -1)
                continue;
            let searchResult: SearchResult = new SearchResult();
            searchResult.breadcrumb = breadcrumb;
            searchResults.titleMatches.push(searchResult);
        }

        for (let i = 0; i < this.pageCache.length; i++) {
            let content = this.pageCache[i].content;
            let matchContext: string = findStringContext(searchStringLower, content);

            if (matchContext) {
                let searchResult: SearchResult = new SearchResult();
                searchResult.match = matchContext;
                searchResult.breadcrumb = this.breadcrumbCache[i];

                searchResults.contentMatches.push(searchResult);
            }
        }

        return searchResults;
    }
}
