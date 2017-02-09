import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {AuthService} from "../auth/auth.service";

import {Footer} from './footer';

import {toDateTimeString} from '../../utilities';

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngIf="!footer.updated">Generated: {{now}}</span>
            <span *ngFor="let breadcrumb of footer.breadcrumbs">
                <ad-breadcrumb *ngIf="!breadcrumb.loggedInRequiredFlag || (breadcrumb.loggedInRequiredFlag && loggedIn)"
                    [breadcrumb]="breadcrumb"></ad-breadcrumb>
            </span>
            <span *ngIf="loggedIn && footer.editFlag" class="ad-control" (click)="showEdit()">Edit</span>
            <span *ngIf="footer.sourceFlag" class="ad-control" (click)="toggleSource()">Source</span>
            <span *ngIf="footer.refreshFlag" class="ad-control" (click)="refresh()">Refresh</span>
            <span *ngIf="loggedIn" class="ad-control" (click)="logout()">Logout</span>
            <span *ngIf="!loggedIn" class="ad-control" (click)="toggleShowLogin()">Login</span>
            <ad-login *ngIf="showLogin && !loggedIn" (onHideLogin)="onHideLogin()"></ad-login>
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
    @Output() onRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onShowEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onToggleSource: EventEmitter<boolean> = new EventEmitter<boolean>();

    loggedIn: Boolean;
    now: string;
    showLogin: boolean = false;
    showSource: boolean = false;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.getLoggedInStatus()
            .subscribe(loggedInFlag => this.loggedIn = loggedInFlag);
        this.now = toDateTimeString(new Date());
    }

    logout(): void {
        this.authService.logout();
    }

    onHideLogin(): void {
        this.showLogin = false;
    }

    refresh(): void {
        this.onRefresh.emit();
    }

    showEdit(): void {
        this.onShowEdit.emit(true);
    }

    toggleShowLogin(): void {
        this.showLogin = !this.showLogin;
    }

    toggleSource(): void {
        this.showSource = !this.showSource;
        this.onToggleSource.emit(this.showSource);
    }
}
