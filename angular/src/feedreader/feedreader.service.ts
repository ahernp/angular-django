import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs';

import {Entry, Feed} from './feedreader';

import {feedreaderUrl} from "./feedreader.component";
import {apiEndpoint} from "../app.settings";

@Injectable()
export class FeedreaderService {

    constructor(private http:Http) {
    }

    getFeedsAndEntries() {
        return Observable.forkJoin([
            this.http.get(`${apiEndpoint}${feedreaderUrl}/feeds`)
                .map(res => res.json() as Feed[]),
            this.http.get(`${apiEndpoint}${feedreaderUrl}/entries`)
                .map(res => res.json() as Entry[])
        ])
    }
}
