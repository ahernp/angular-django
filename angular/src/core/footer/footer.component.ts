import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Footer} from './footer';

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngIf="footer.sourceFlag" class="ad_control" (click)="toggleSource()">Source</span>
            <span *ngFor="let breadcrumb of footer.breadcrumbs">
                <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
            </span>
            <span *ngIf="footer.refreshFlag" class="ad_control" (click)="refresh()">Refresh</span>
        </p>
    `
})
export class FooterComponent {
    @Input() footer: Footer;
    @Output() onToggleSource = new EventEmitter<boolean>();
    @Output() onRefresh = new EventEmitter<boolean>();

    showSource: boolean = false;

    toggleSource() {
        this.showSource = !this.showSource;
        this.onToggleSource.emit(this.showSource);
    }

    refresh() {
        this.onRefresh.emit();
    }
}
