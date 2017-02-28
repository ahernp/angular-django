import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {MessageService} from "../message/message.service";

import {apiEndpoint} from "../../app.settings";

const coreUrl: string = '/core';
const messageSource: string = 'Auth';

@Injectable()
export class AuthService {
    loggedInStatus$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private http: Http,
        private messageService: MessageService
    ) {
        this.setNotLoggedIn();
        this.checkLoggedIn();
    }

    getLoggedInStatus(): ReplaySubject<any> {
        return this.loggedInStatus$;
    }

    checkLoggedIn(): void {
        let url: string = `${apiEndpoint}${coreUrl}/checkloggedin`;
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

    login(username: string, password: string): void {
        let url: string = `${apiEndpoint}${coreUrl}/login`;
        let headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options: RequestOptions = new RequestOptions({headers: headers});
        let credentials: string = 'username=' + username + '&password=' + encodeURIComponent(password);

        this.http.post(url, credentials, options)
            .subscribe(
                () => this.checkLoggedIn(),
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} login error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    logout(): void {
        let url: string = `${apiEndpoint}${coreUrl}/logout`;
        let headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options: RequestOptions = new RequestOptions({headers: headers});

        this.http.post(url, {}, options)
            .subscribe(
                () => this.checkLoggedIn(),
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} logout error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    }

    setNotLoggedIn(): void {
        this.loggedInStatus$.next(false);
    }
}
