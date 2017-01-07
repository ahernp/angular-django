import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {apiEndpoint} from "../../app.settings";

const checkLoggedInUrl: string = '/core/checkloggedin';

@Injectable()
export class AuthService {

    loggedInStatus$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private http: Http
    ) {
        this.loggedInStatus$.next(false);
        this.checkLoggedIn();
    }

    getLoggedInStatus(): ReplaySubject<any> {
        return this.loggedInStatus$;
    }

    checkLoggedIn() {
        let url = `${apiEndpoint}${checkLoggedInUrl}/`;
        this.http.get(url)
            .subscribe(
                response => {
                    this.loggedInStatus$.next(true);
                },
                error => {
                    this.loggedInStatus$.next(false);
                }
            );
    }
}
