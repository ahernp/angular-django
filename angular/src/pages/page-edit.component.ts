import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {ContentType, Page} from './page';
import {pageUrl, PageService} from './page.service';
import {blogRootTitle} from '../blog/blog.component';

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
                <h3>Other Editable Fields</h3>
                <p>Title: <input [(ngModel)]="page.title" (keyup)="titleChange()"></p>
                <p>Slug: <input [(ngModel)]="page.slug"></p>
                <p>
                    Parent:
                    <select [(ngModel)]="page.parentId">
                        <option *ngFor="let page of pages" [ngValue]="page.id">{{page.title}}</option>
                    </select>
                </p>
                <p>
                    Content Type:
                    <select [(ngModel)]="page.contentType">
                        <option *ngFor="let contentType of contentTypes" [ngValue]="contentType.value">{{contentType.label}}</option>
                    </select>
                </p>
                <p *ngIf="page.parentName == blogRootTitle">
                    Published Date:
                    <input [(ngModel)]="page.published" placeholder="yyyy-mm-dd">
                </p>
            </div>
        </div>
        <div id="controls">
            <button (click)="save()">Save</button>
            <span class="ad-control" (click)="cancel()">Cancel</span>
            <span class="ad-control" (click)="toggleShowAdvanced()">Advanced</span>
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
export class PageEditComponent implements OnInit {
    @Input() page: Page;
    @Input() adminBreadcrumb: Breadcrumb;
    @Output() onShowEdit = new EventEmitter<boolean>();

    contentTypes: ContentType[];
    blogRootTitle: string = blogRootTitle;
    pages: Page[];
    showAdvanced: boolean = false;

    constructor(private pageService: PageService) {}

    ngOnInit(): void {
        this.pageService.getPages()
            .subscribe(pages => this.pages = pages.sort(
                function (a, b) {return b.children.length - a.children.length}
            ));
        this.pageService.getContentTypes()
            .subscribe(contentTypes => this.contentTypes = contentTypes)
    }

    cancel(): void {
        this.onShowEdit.emit(false);
    }

    save(): void {
        this.page.url = `${pageUrl}/${this.page.slug}`;
        this.pageService.save(this.page);
        this.onShowEdit.emit(false);
    }

    titleChange(): void {
        this.page.slug = this.page.title.replace(/[^\w\s-]/g, '').trim().toLocaleLowerCase().replace(/[-\s]+/g, '-');
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
