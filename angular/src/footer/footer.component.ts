import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Footer} from './footer';

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngIf="footer.sourceFlag" id="source_label" (click)="toggleSource()">Source</span>
            <span *ngFor="let breadcrumb of footer.breadcrumbs">
                <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
            </span>
        </p>
    `
})
export class FooterComponent {
    @Input() footer: Footer;
    @Output() onToggleSource = new EventEmitter<boolean>();

    showSource: boolean = false;

    toggleSource() {
        this.showSource = !this.showSource;
        this.onToggleSource.emit(this.showSource);
    }

}
