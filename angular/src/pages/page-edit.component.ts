import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {Page} from './page';
import {PageService} from './page.service';

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

            <div id="advanced" *ngIf="showAdvanced">
                <p>Title: <input [(ngModel)]="page.title"></p>
            </div>
        </div>
        <div id="controls">
            <span class="ad-control" (click)="cancel()">Cancel</span>
            <span class="ad-control" (click)="toggleShowAdvanced()">Advanced</span>
            <button (click)="save()">Save</button>
            <ad-breadcrumb [breadcrumb]="adminBreadcrumb"></ad-breadcrumb>
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
            padding: 5px 5px 45px 5px;
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
            height: 40px;
            width: 100%;
            z-index: 12;
            background: white;
            border-top: solid 1px #ccc;
            padding: 5px 0 0 8px;
        }
        div#advanced {
            position: absolute;
            bottom: 85px;
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

    showAdvanced: boolean = false;

    constructor(private pageService: PageService) {}

    cancel(): void {
        this.onShowEdit.emit(false);
    }

    save(): void {
        this.pageService.save(this.page);
        this.onShowEdit.emit(false);
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
