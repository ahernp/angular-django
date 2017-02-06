import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Feed} from './feedreader';
import {FeedreaderService} from './feedreader.service';
import {feedreaderTitle} from './feedreader.component';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

@Component({
    selector: 'ad-feedreader-edit',
    template: `
        <div id="editor">
            <h2>Edit Feeds and Groups</h2>
            <p *ngFor="let feed of feeds">{{feed.feedTitle}}</p>

            <div id="advanced" *ngIf="showAdvanced">
                <span id="close" class="ad-control" (click)="toggleShowAdvanced()" title="Close">&times;</span>
                <h3>Advanced</h3>
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
        span#close {
            position: absolute;
            top: -5px;
            right: 0px;
            padding: 5px;
        }
    `]
})
export class FeedreaderEditComponent implements OnInit {
    @Input() feeds: Feed[];
    @Input() adminBreadcrumb: Breadcrumb;
    @Output() onShowEdit = new EventEmitter<boolean>();

    showAdvanced: boolean = false;

    constructor(
        private feedreaderService: FeedreaderService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Edit Feedreader');
    }

    cancel(): void {
        this.titleService.setTitle(feedreaderTitle);
        this.onShowEdit.emit(false);
    }

    save(): void {
    this.titleService.setTitle(feedreaderTitle);
        this.onShowEdit.emit(false);
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
