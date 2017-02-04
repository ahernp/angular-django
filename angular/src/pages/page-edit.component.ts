import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Page} from './page';

@Component({
    selector: 'ad-page-edit',
    template: `
        <div>
            <h2>Edit Page</h2>
            <span class="ad-control" (click)="hideEdit()">Cancel</span>
        </div>
    `,
    styles: [`
        div {
            position: fixed;
            top: 0;
            z-index: 10;
            height: 100%;
            width: 100%;
            background: white;
        }
    `]
})
export class PageEditComponent {
    @Input() page: Page;
    @Output() onShowEdit = new EventEmitter<boolean>();

    hideEdit() {
        this.onShowEdit.emit(false);
    }
}
