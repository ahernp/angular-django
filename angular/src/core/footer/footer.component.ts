import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Footer} from './footer';

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngIf="!footer.updated">Generated: {{now}}</span>
            <span *ngIf="footer.sourceFlag" class="ad-control" (click)="toggleSource()">Source</span>
            <span *ngFor="let breadcrumb of footer.breadcrumbs">
                <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
            </span>
            <span *ngIf="footer.refreshFlag" class="ad-control" (click)="refresh()">Refresh</span>
        </p>
    `
})
export class FooterComponent implements OnInit {
    @Input() footer: Footer;
    @Output() onToggleSource = new EventEmitter<boolean>();
    @Output() onRefresh = new EventEmitter<boolean>();

    now: string;
    showSource: boolean = false;

    ngOnInit(): void {
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

    toggleSource() {
        this.showSource = !this.showSource;
        this.onToggleSource.emit(this.showSource);
    }

    refresh() {
        this.onRefresh.emit();
    }
}
