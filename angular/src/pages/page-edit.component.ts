import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {Page} from './page';

@Component({
    selector: 'ad-page-edit',
    template: `
        <div id="editor">
            <h2>Edit Page {{page.title}}</h2>

            <div class="editpreview" style="left: 0;">
                <textarea [(ngModel)]="page.content" style="height: 100%; width: 100%"></textarea>
            </div>

            <div class="editpreview" style="right: 0; overflow: scroll">
                <ad-markdown-content *ngIf="page.contentType != 'gallery'" [content]="page.content"></ad-markdown-content>
                <ad-gallerycontent *ngIf="page.contentType == 'gallery'" [content]="page.content"></ad-gallerycontent>
            </div>

            <div style="clear:both"></div>

            <div id="controls">
                <span class="ad-control" (click)="hideEdit()">Done</span>
                <ad-breadcrumb [breadcrumb]="adminBreadcrumb"></ad-breadcrumb>
            </div>
        </div>
    `,
    styles: [`
        div#editor {
            position: fixed;
            top: 0;
            z-index: 10;
            height: 100%;
            width: 100%;
            background: white;
            padding: 0;
            overflow: scroll;
        }
        div.editpreview {
             position: fixed;
             height: 80%;
             width: 49%;
             padding: 5px;
        }
        div#controls {
            position: fixed;
            bottom: 0px;
            z-index: 12;
            background: white;
            border: solid 1px black;
            padding: 5px;
        }
    `]
})
export class PageEditComponent {
    @Input() page: Page;
    @Input() adminBreadcrumb: Breadcrumb;
    @Output() onShowEdit = new EventEmitter<boolean>();

    hideEdit() {
        this.onShowEdit.emit(false);
    }
}
