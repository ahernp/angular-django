import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {SearchResult, SearchResults} from "../core/search/search-results";

import {MessageService} from "../core/message/message.service";

import {SchedulerService} from "../core/scheduler/scheduler.service";

import {Entry, Feed, Group} from './feedreader';

import {feedreaderUrl} from "./feedreader.component";
import {apiEndpoint} from "../app.settings";

import {findStringContext} from "../utilities";

export const feedreaderPollMinute: number = 18;
const messageSource: string = 'Feedreader';

@Injectable()
export class FeedreaderService {

    feedCache: Feed[] = [];
    feeds$: ReplaySubject<any> = new ReplaySubject(1);

    groupCache: Group[] = [];
    groups$: ReplaySubject<any> = new ReplaySubject(1);

    recentEntryCache: Entry[] = [];
    recentEntries$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private http: Http,
        private messageService: MessageService,
        private schedulerService: SchedulerService
    ) {
        this.feeds$.next([]);
        this.recentEntries$.next([]);
        this.initialCheckForUpdates();
    }

    getFeeds(): ReplaySubject<any> {
        return this.feeds$;
    }

    getEntries(): ReplaySubject<any> {
        return this.recentEntries$;
    }

    getGroups(): ReplaySubject<any> {
        return this.groups$;
    }

    toggleRead(entryId: number): void {
        let headers: Headers = new Headers({'Content-Type': 'application/json'});
        let options: RequestOptions = new RequestOptions({headers: headers});
        let url: string = `${apiEndpoint}${feedreaderUrl}/toggleread`;
        this.http.post(url, {entry_id: entryId}, options)
            .subscribe(
                () => {
                    let entry = this.recentEntryCache.filter(entry => entry.id == entryId)[0];
                    entry.readFlag = !entry.readFlag;
                    this.recentEntries$.next(this.recentEntryCache);
                    this.messageUnread();
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} error: From ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    markAllRead(): void {
        let headers: Headers = new Headers({'Content-Type': 'application/json'});
        let options: RequestOptions = new RequestOptions({headers: headers});
        let url: string = `${apiEndpoint}${feedreaderUrl}/markallread`;
        this.http.post(url, {}, options)
            .subscribe(
                () => {
                    for (let entry of this.recentEntryCache.filter(entry => !entry.readFlag))
                        entry.readFlag = true;
                    this.recentEntries$.next(this.recentEntryCache);
                    this.messageUnread();
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} error: From ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    refreshCaches(): void {
        Observable.forkJoin([
            this.http.get(`${apiEndpoint}${feedreaderUrl}/groups`)
                .map(response => {
                    this.groupCache = <Group[]>response.json();
                    this.groups$.next(this.groupCache);
                }),
            this.http.get(`${apiEndpoint}${feedreaderUrl}/feeds`)
                .map(response => {
                    this.feedCache = <Feed[]>response.json();
                    this.feeds$.next(this.feedCache);
                }),
            this.http.get(`${apiEndpoint}${feedreaderUrl}/recententries`)
                .map(response => {
                    this.recentEntryCache = <Entry[]>response.json();
                    this.recentEntries$.next(this.recentEntryCache);
                    this.messageUnread();
                })
        ]).subscribe(
            () => {},
            error => {
                this.messageService.addErrorMessage(
                    messageSource,
                    `${messageSource} error; Status Code ${error.status}; ${error.statusText}`);
                console.log(error);
            }
        )
    }

    initialCheckForUpdates(): void {
        this.refreshCaches();
        var boundRefreshCaches = this.refreshCaches.bind(this);
        this.schedulerService.hourly(feedreaderPollMinute, boundRefreshCaches);
    }

    messageUnread() {
        this.messageService.clearMessagesBySource(messageSource);
        let unread: Entry[] = this.recentEntryCache.filter(entry => !entry.readFlag);
        if (unread.length > 0)
            this.messageService.addInfoMessage(
                messageSource,
                unread.length == 1
                    ? '1 unread Feedreader entry'
                    : `${unread.length} unread Feedreader entries`);
    }

    deleteFeed(feed: Feed): void {
        let url = `${apiEndpoint}${feedreaderUrl}/deletefeed`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        this.http.post(url, feed, options)
            .subscribe(
                (response) => {
                    this.deleteFeedFromCache(feed);
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} delete Feed error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    deleteGroup(group: Group): void {
        let url = `${apiEndpoint}${feedreaderUrl}/deletegroup`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        this.http.post(url, group, options)
            .subscribe(
                () => {},
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} delete Group error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    saveFeed(feed: Feed): void {
        let url = `${apiEndpoint}${feedreaderUrl}/savefeed`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        this.http.post(url, feed, options)
            .subscribe(
                (response) => {
                    this.updateFeedCache(<Feed>response.json());
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} save Feed error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    saveGroup(group: Group): void {
        let url = `${apiEndpoint}${feedreaderUrl}/savegroup`;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        this.http.post(url, group, options)
            .subscribe(
                (response) => {
                    this.updateGroupCache(<Group>response.json());
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} save Group error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    deleteFeedFromCache(feed: Feed): void {
        for (let i = 0; i < this.feedCache.length; i++) {
            this.feedCache.splice(i, 1);
            break;
        }
    }

    updateFeedCache(feed: Feed): void {
        let feeds = this.feedCache.filter(cachedFeed => cachedFeed.feedUrl == feed.feedUrl);
        if (feeds.length > 0)
            feeds[0] = feed;
        else
            this.feedCache.push(feed);
    }

    updateGroupCache(group: Group): void {
        let groups = this.groupCache.filter(cachedFeed => cachedFeed.id == group.id);
        if (groups.length > 0)
            groups[0] = group;
        else
            this.groupCache.push(group);
    }

    search(searchString: string): SearchResults {
        let searchResults: SearchResults = new SearchResults();
        let searchStringLower: string = searchString.toLocaleLowerCase();

        for (let i = 0; i < this.recentEntryCache.length; i++) {
            let entry: Entry = this.recentEntryCache[i];

            let matchPosition = entry.title.toLocaleLowerCase().indexOf(searchStringLower);
            if (matchPosition > -1) {
                let searchResult: SearchResult = new SearchResult();
                searchResult.breadcrumb = <Breadcrumb>{
                    title: entry.title, url: entry.link, externalLinkFlag: true};
                searchResults.titleMatches.push(searchResult);
            }

            let matchContext: string = findStringContext(searchString, entry.description);

            if (matchContext) {
                let searchResult = new SearchResult();
                searchResult.match = matchContext;
                searchResult.breadcrumb = <Breadcrumb>
                    {title: entry.title, url: entry.link, externalLinkFlag: true};

                searchResults.contentMatches.push(searchResult);
            }
        }

        return searchResults;
    }

}
