import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs';
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {SearchResult, SearchResults} from "../core/search/search-results";

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

    constructor(private http:Http) {
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

    refreshCaches(): void {
        Observable.forkJoin([
            this.http.get(`${apiEndpoint}${feedreaderUrl}/feeds`)
                .map(res => {
                    this.feedCache = res.json() as Feed[];
                    this.feeds$.next(this.feedCache);
                }),
            this.http.get(`${apiEndpoint}${feedreaderUrl}/entries`)
                .map(res => {
                    this.entryCache = res.json() as Entry[];
                    this.entries$.next(this.entryCache);
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

    search(searchString: string): SearchResults {
        let searchResults: SearchResults = new SearchResults();
        let searchStringLower: string = searchString.toLocaleLowerCase();

        for (let i = 0; i < this.entryCache.length; i++) {
            let entry: Entry = this.entryCache[i];

            let matchPosition = entry.title.toLocaleLowerCase().indexOf(searchStringLower);
            if (matchPosition > -1) {
                let searchResult: SearchResult = new SearchResult();
                searchResult.breadcrumb = new Breadcrumb({
                    title: entry.title, url: entry.link, externalLinkFlag: true});
                searchResults.titleMatches.push(searchResult);
            }

            let matchContext: string = findStringContext(searchString, entry.description);

            if (matchContext) {
                let searchResult = new SearchResult();
                searchResult.match = matchContext;
                searchResult.breadcrumb = new Breadcrumb({
                    title: entry.title, url: entry.link, externalLinkFlag: true});

                searchResults.contentMatches.push(searchResult);
            }
        }

        return searchResults;
    }

}
