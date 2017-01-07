import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {AuthService} from "../auth/auth.service";

import {Footer} from './footer';

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngIf="!footer.updated">Generated: {{now}}</span>
            <span *ngFor="let breadcrumb of footer.breadcrumbs">
                <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
            </span>
            <span *ngIf="loggedIn" class="ad-control" (click)="logout()">Logout</span>
            <span *ngIf="!loggedIn" class="ad-control" (click)="setShowLogin()">Login</span>
            <ad-login *ngIf="showLogin && !loggedIn"></ad-login>
            <span *ngIf="footer.sourceFlag" class="ad-control" (click)="toggleSource()">Source</span>
            <span *ngIf="footer.refreshFlag" class="ad-control" (click)="refresh()">Refresh</span>
        </p>
        <ad-message></ad-message>
    `,
    styles: [`
        ad-message {
            position: absolute;
            z-index: 2;
            right: 10px;
            bottom: 0px;
            max-width: 50%;
            background-color: white;
            max-height: 50vh;
            overflow: auto;
        }
    `]
})
export class FooterComponent implements OnInit {
    @Input() footer: Footer;
    @Output() onToggleSource = new EventEmitter<boolean>();
    @Output() onRefresh = new EventEmitter<boolean>();

    now: string;
    showLogin: boolean = false;
    showSource: boolean = false;
    loggedIn: Boolean;

    constructor(
        private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.getLoggedInStatus().subscribe(loggedInFlag => this.loggedIn = loggedInFlag);

        let leadingZero = (amount: number): string => amount < 10 ? `0${amount}` : `${amount}`;

        let toDateTimeString = (date: Date): string => '' +
            date.getFullYear() + '-' +
            leadingZero(date.getUTCMonth()) + '-' +
            leadingZero(date.getUTCDate()) + ' ' +
            leadingZero(date.getUTCHours()) + ':' +
            leadingZero(date.getUTCMinutes()) + ':' +
            leadingZero(date.getUTCSeconds());

        this.now = toDateTimeString(new Date());
    }

    setShowLogin() {
        this.showLogin = true;
    }

    logout() {
        this.authService.logout();
    }

    toggleSource() {
        this.showSource = !this.showSource;
        this.onToggleSource.emit(this.showSource);
    }

    refresh() {
        this.onRefresh.emit();
    }
}
