import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {ContentType, Page} from './page';

import {MessageService} from "../core/message/message.service";

import {findStringContext} from "../utilities";

import {SearchResult, SearchResults} from "../core/search/search-results";

import {apiEndpoint, dashboardBreadcrumb, rootBreadcrumb} from "../app.settings";
import {blogBreadcrumb, blogArchiveBreadcrumb} from "../blog/blog.component";
import {feedreaderBreadcrumb} from "../feedreader/feedreader.component";
import {timersBreadcrumb} from "../timers/timers.component";
import {toolsBreadcrumb, toolBreadcrumbs} from '../tools/tools.component'

export const pageUrl: string = '/page';
export const messageSource: string = 'Page';
const pagesApiUrl: string = '/pages';

@Injectable()
export class PageService {
    currentPage$: ReplaySubject<any> = new ReplaySubject(1);

    breadcrumbCache: Breadcrumb[] = [];
    breadcrumbs$: ReplaySubject<any> = new ReplaySubject(1);

    contentTypeCache: ContentType[] = [];
    contentTypes$: ReplaySubject<any> = new ReplaySubject(1);

    pageCache: Page[] = [];
    pages$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private http: Http,
        private messageService: MessageService
    ) {
        this.pages$.next([]);
        this.breadcrumbs$.next([]);
        this.contentTypes$.next([]);
        this.cacheAllPages();
        this.cacheContentTypes();
    }

    cacheAllPages(): void {
        let url: string = `${apiEndpoint}/pages/all/`;
        this.http.get(url)
            .subscribe(
                (response: Response) => {
                    this.pageCache = <Page[]>response.json();
                    this.populatePageCache();
                    this.pages$.next(this.pageCache);
                    this.populateBreadcrumbCache();
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} error: From ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    cacheContentTypes(): void {
        let url: string = `${apiEndpoint}/pages/contenttypes/`;
        this.http.get(url)
            .subscribe(
                (response: Response) => {
                    this.contentTypeCache = <ContentType[]>response.json();
                    this.contentTypes$.next(this.contentTypeCache);
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} error: From ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    getBreadcrumbs(): ReplaySubject<any> {
        return this.breadcrumbs$;
    }

    getContentTypes(): ReplaySubject<any> {
        return this.contentTypes$;
    }

    getDynamicPageBreadcrumbs(): Breadcrumb[] {
        let breadcrumbs: Breadcrumb[] = [];
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

    getPage(slug:string): Observable<Page> {
        let url: string = `${apiEndpoint}${pagesApiUrl}/read/${slug}`;
        let pages: Page[] = this.pageCache.filter(page => page.url == `${pageUrl}/${slug}`);
        if (pages.length > 0)
            this.currentPage$.next(pages[0]);
        else
            this.http.get(url)
                .subscribe(
                    (response: Response) => {
                        let page: Page = <Page>response.json();
                        this.refreshCurrentPageFromCache(page);
                    },
                    error => {
                        this.messageService.addErrorMessage(
                            messageSource,
                            `${messageSource} error: From ${url}; Status Code ${error.status}; ${error.statusText}`);
                        console.log(error);
                    }
                );
        return this.currentPage$;
    }

    getPageBreadcrumbs(slug: string): ReplaySubject<any> {
        let breadcrumbs: Breadcrumb[] = this.breadcrumbCache;
        if (slug != undefined) {
            let parent: Page = this.pageCache.filter(page => page.url == `${pageUrl}/${slug}`)[0];
            breadcrumbs = this.breadcrumbCache.filter(breadcrumb => breadcrumb.parentName == parent.title);
        }
        this.breadcrumbs$.next(breadcrumbs);
        return this.breadcrumbs$;
    }

    getPages(): ReplaySubject<any> {
        return this.pages$;
    }

    populateBreadcrumbCache(): void {
        let breadcrumbs: Breadcrumb[] = this.getDynamicPageBreadcrumbs();
        for (let page of this.pageCache)
            breadcrumbs.push(<Breadcrumb>{
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

    populatePageCache(): void {
        for (let page of this.pageCache) {
            page.url = `${pageUrl}/${page.slug}`;
            if (page.parentId) {
                let parent = this.pageCache.filter(parent => parent.id == page.parentId)[0];
                page.parentName = parent.title;
            }
        }
        for (let page of this.pageCache) {
            let children = this.pageCache.filter(child => child.parentId == page.id);
            page.children = children.map(child => <Breadcrumb>{title: child.title,
                url: child.url, parentName: child.parentName, updated: child.updated});
        }
    }

    refresh(url: string): Observable<Page> {
        this.pageCache = this.pageCache.filter(page => page.url != url);
        return this.getPage(url.replace(`${pageUrl}/`, ''));
    }

    refreshCurrentPageFromCache(currentPage: Page): void {
        let pages:Page[] = this.pageCache.filter(page => page.url == currentPage.url);
        if (pages.length > 0)
            this.currentPage$.next(pages[0]);
    }

    save(page: Page): void {
        let url: string = `${apiEndpoint}${pagesApiUrl}/save`;
        let headers: Headers = new Headers({'Content-Type': 'application/json'});
        let options: RequestOptions = new RequestOptions({ headers: headers });

        this.http.post(url, page, options)
            .subscribe(
                () => {
                    this.updateCache(page);
                    this.populateBreadcrumbCache();
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} save Page error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    search(searchString: string): SearchResults {
        let searchResults: SearchResults = new SearchResults();
        let searchStringLower: string = searchString.toLocaleLowerCase();

        for (let breadcrumb of this.breadcrumbCache) {
            let matchPosition: number = breadcrumb.title.toLocaleLowerCase().indexOf(searchStringLower);
            if (matchPosition == -1)
                continue;
            let searchResult: SearchResult = new SearchResult();
            searchResult.breadcrumb = breadcrumb;
            searchResults.titleMatches.push(searchResult);
        }

        for (let i = 0; i < this.pageCache.length; i++) {
            let page: Page = this.pageCache[i];
            let content: string = page.content;
            let matchContext: string = findStringContext(searchStringLower, content);

            if (matchContext) {
                let searchResult: SearchResult = new SearchResult();
                searchResult.match = matchContext;
                searchResult.breadcrumb = <Breadcrumb>{title: page.title, url: page.url};

                searchResults.contentMatches.push(searchResult);
            }
        }
        return searchResults;
    }

    updateCache(page: Page): void {
        page.url = `${pageUrl}/${page.slug}`;
        if (this.pageCache.length > 0) {
            if (page.parentId) {
                let parent = this.pageCache.filter(parent => parent.id == page.parentId)[0];
                page.parentName = parent.title;
            }
            let children = this.pageCache.filter(child => child.parentId == page.id);
            page.children = children.map(child => <Breadcrumb>{
                title: child.title,
                url: child.url, parentName: child.parentName, updated: child.updated
            });
        }
        let pages: Page[] = this.pageCache.filter(cachedPage => cachedPage.slug == page.slug);
        if (pages.length > 0) {
            pages[0] = page;
        }
        else
            this.pageCache.push(page);
        this.currentPage$.next(page);
    }
}
