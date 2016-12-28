import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {SearchResult, SearchResults} from "../core/search/search-results";

import {Message} from "../core/message/message";
import {MessageService} from "../core/message/message.service";

import {Entry, Feed} from './feedreader';

import {feedreaderUrl} from "./feedreader.component";
import {apiEndpoint} from "../app.settings";

import {findStringContext} from "../utilities";

const feedreaderPollMinute: number = 18;
const microsecondsPerMinute: number = 1000 * 60;
const microsecondsPerHour: number = microsecondsPerMinute * 60;

@Injectable()
export class FeedreaderService {

    feedCache: Feed[] = [];
    feeds$: ReplaySubject<any> = new ReplaySubject(1);

    entryCache: Entry[] = [];
    entries$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(private http: Http, private messageService: MessageService) {
        this.feeds$.next([]);
        this.entries$.next([]);
        this.checkForUpdates();
    }

    getFeeds(): ReplaySubject<any> {
        return this.feeds$;
    }

    getEntries(): ReplaySubject<any> {
        return this.entries$;
    }

    toggleRead(entryId: number): void {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        this.http.post(`${apiEndpoint}${feedreaderUrl}/toggleread`, {entry_id: entryId}, options)
            .subscribe(() => {
                let entry = this.entryCache.filter(entry => entry.id == entryId)[0];
                entry.readFlag = !entry.readFlag;
                this.entries$.next(this.entryCache);
                this.messageUnread();
            });
    }

    markAllRead(): void {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        this.http.post(`${apiEndpoint}${feedreaderUrl}/markallread`, {}, options)
            .subscribe(() => {
                for (let entry of this.entryCache.filter(entry => !entry.readFlag))
                    entry.readFlag = true;
                this.entries$.next(this.entryCache);
                this.messageUnread();
            });
    }

    refreshCaches(): void {
        Observable.forkJoin([
            this.http.get(`${apiEndpoint}${feedreaderUrl}/feeds`)
                .map(res => {
                    this.feedCache = <Feed[]>res.json();
                    this.feeds$.next(this.feedCache);
                }),
            this.http.get(`${apiEndpoint}${feedreaderUrl}/entries`)
                .map(res => {
                    this.entryCache = <Entry[]>res.json();
                    this.entries$.next(this.entryCache);
                    this.messageUnread();
                })
        ]).subscribe()
    }

    checkForUpdates(): void {
        this.refreshCaches();

        let now: Date = new Date();
        let currentMinute: number = now.getUTCMinutes();
        let initialTimeout = (currentMinute >= feedreaderPollMinute) ?
            ((60 - (currentMinute - feedreaderPollMinute)) * microsecondsPerMinute) :
            ((feedreaderPollMinute - currentMinute) * microsecondsPerMinute)

        setTimeout(() => {
            this.refreshCaches();
            setInterval(() => this.refreshCaches(), microsecondsPerHour)
        }, initialTimeout);
    }

    messageUnread() {
        this.messageService.clearMessagesBySource('feedreader');
        let unread: Entry[] = this.entryCache.filter(entry => !entry.readFlag);
        if (unread.length > 0)
            this.messageService.addMessage(<Message>{type: 'info', source: 'feedreader',
                text: unread.length == 1
                    ? '1 unread Feedreader entry'
                    : `${unread.length} unread Feedreader entries`});
    }

    search(searchString: string): SearchResults {
        let searchResults: SearchResults = new SearchResults();
        let searchStringLower: string = searchString.toLocaleLowerCase();

        for (let i = 0; i < this.entryCache.length; i++) {
            let entry: Entry = this.entryCache[i];

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
