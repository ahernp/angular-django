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
            <table>
                <thead>
                    <tr><th>Group</th><th>Feed</th><th>Site</th><th>Delete</th></tr>
                </thead>
                <tbody>
                    <tr *ngFor="let feed of feeds; let odd=odd; let even=even;" [ngClass]="{odd: odd, even: even}">
                        <td>{{feed.groupName}}</td>
                        <td><a href="{{feed.feedUrl}}">{{feed.feedTitle}}</a></td>
                        <td title="{{feed.feedDescription}}"><a href="{{feed.siteUrl}}">{{feed.siteUrl|trimurl}}</a></td>
                        <td><input type="checkbox" (click)="delete(feed.id)"></td>
                    </tr>
                </tbody>
            </table>

            <div id="advanced" *ngIf="showAdvanced">
                <span id="close" class="ad-control" (click)="toggleShowAdvanced()" title="Close">&times;</span>
                <h3>Advanced</h3>
            </div>
        </div>
        <div id="controls">
            <span class="ad-control" (click)="done()">Done</span>
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

    filterString: string;
    showAdvanced: boolean = false;

    constructor(
        private feedreaderService: FeedreaderService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Edit Feedreader');
    }

    done(): void {
        this.titleService.setTitle(feedreaderTitle);
        this.onShowEdit.emit(false);
    }

    delete(): void {
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
