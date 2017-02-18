import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {ContentType, Page} from './page';
import {pageUrl, PageService} from './page.service';

import {blogRootTitle} from '../blog/blog.component';
import {toDateTimeString} from '../utilities';

@Component({
    selector: 'ad-page-edit',
    template: `
        <div id="editor">
            <span (click)="cancel()" id="close" class="ad-control">&times;</span>
            <h2>
                <span *ngIf="page.id">Edit</span> 
                <span *ngIf="!page.id">Add</span> 
                Page {{page.title}}
            </h2>

            <div class="editpreview" style="left: 0;">
                <textarea [(ngModel)]="page.content" style="height: 100%; width: 100%"></textarea>
            </div>

            <div class="editpreview" style="right: 0; overflow: scroll">
                <ad-markdown-content *ngIf="page.contentType != 'gallery'" [content]="page.content"></ad-markdown-content>
                <ad-gallerycontent *ngIf="page.contentType == 'gallery'" [content]="page.content"></ad-gallerycontent>
            </div>

            <div style="clear:both"></div>

            <div id="advanced" *ngIf="showAdvanced">
                <span class="ad-control ad-close" (click)="toggleShowAdvanced()" title="Close">&times;</span>
                <h3>Advanced</h3>
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
            bottom: 86px;
            z-index: 12;
            background: white;
            border: solid 1px black;
            padding: 5px;
            margin-left: 45px;
        }
        #close {
            position: fixed;
            top: 0;
            right: 0;
            padding: 0 25px 25px 25px;
            font-size: 35px;
        }
    `]
})
export class PageEditComponent implements OnInit {
    @Input() adminBreadcrumb: Breadcrumb;
    @Input() page: Page;
    @Output() onShowEdit = new EventEmitter<boolean>();

    contentTypes: ContentType[];
    pages: Page[];
    showAdvanced: boolean = false;

    constructor(
        private pageService: PageService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.pageService.getPages()
            .subscribe(pages => this.pages = pages.sort(
                function (a, b) {return b.children.length - a.children.length}
            ));
        this.pageService.getContentTypes()
            .subscribe(contentTypes => this.contentTypes = contentTypes)
        if (this.page.id == undefined) {
            this.showAdvanced = true;
            this.titleService.setTitle('Add Page');
        }
        else
            this.titleService.setTitle('Edit Page');
    }

    cancel(): void {
        this.titleService.setTitle(this.page.title)
        this.onShowEdit.emit(false);
    }

    save(): void {
        this.page.url = `${pageUrl}/${this.page.slug}`;
        if (this.page.children == undefined)
            this.page.children = [];
        let parentPages: Page[] = this.pages.filter(parentPage => parentPage.id == this.page.parentId);
        if (parentPages.length > 0)
            this.page.parentName = parentPages[0].parentName;
        let now: Date = new Date();
        this.page.updated = toDateTimeString(now);
        this.pageService.save(this.page);
        this.titleService.setTitle(this.page.title)
        this.onShowEdit.emit(false);
    }

    titleChange(): void {
        this.page.slug = this.page.title.replace(/[^\w\s-]/g, '').trim().toLocaleLowerCase().replace(/[-\s]+/g, '-');
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
