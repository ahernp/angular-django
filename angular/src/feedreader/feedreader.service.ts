import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Entry} from './feedreader';

import {feedreaderUrl} from "./feedreader.component";
import {apiEndpoint} from "../app.settings";

@Injectable()
export class FeedreaderService {

    constructor(private http:Http) {
    }

    getEntries() {
        return this.http.get(`${apiEndpoint}${feedreaderUrl}/`)
            .toPromise()
            .then(response => response.json() as Entry[])
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
