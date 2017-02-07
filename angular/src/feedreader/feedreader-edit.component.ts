import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Feed, Group} from './feedreader';
import {FeedreaderService} from './feedreader.service';
import {feedreaderTitle} from './feedreader.component';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {Table, Row} from "../core/table/table";

const columnHeadings: string[] = ['Group', 'Feed', 'Site'];

@Component({
    selector: 'ad-feedreader-edit',
    template: `
        <div id="editor">
            <h2>Edit Feeds and Groups</h2>
            <p>
                Add Feed:
                <input [(ngModel)]="newFeedUrl" placeholder="Url">
                <select [(ngModel)]="newFeedGroupId">
                    <option [ngValue]="">None</option>
                    <option *ngFor="let group of groups" [ngValue]="group.id">{{group.name}}</option>
                </select>
                <button (click)="addFeed()">Add</button>
            </p>
            <input [(ngModel)]="filterString" (ngModelChange)="filterRows()" placeholder="Filter" tabindex="2">
            <span *ngIf="table.currentRows.length != table.rows.length">{{table.currentRows.length}} of</span>
            {{table.rows.length}} rows
            <table>
                <thead>
                    <tr>
                        <th *ngFor="let columnHeading of table.columnHeadings; let i = index" (click)="table.sortRows(i)">
                            {{columnHeading}}
                        </th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let row of table.currentRows; let odd=odd; let even=even;" [ngClass]="{odd: odd, even: even}">
                        <td>{{row.item.groupName}}</td>
                        <td><a href="{{row.item.feedUrl}}">{{row.item.feedTitle}}</a></td>
                        <td title="{{row.item.feedDescription}}">
                            <a href="{{row.item.siteUrl}}">{{row.item.siteUrl|trimurl}}</a>
                        </td>
                        <td><input type="checkbox" (click)="deleteFeed(row.item)"></td>
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
    @Input() groups: Group[];
    @Input() adminBreadcrumb: Breadcrumb;
    @Output() onShowEdit = new EventEmitter<boolean>();

    filterString: string;
    table: Table;
    showAdvanced: boolean = false;

    newFeedUrl: string;
    newFeedGroupId: number;

    constructor(
        private feedreaderService: FeedreaderService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Edit Feedreader');
        this.populateTable();
    }

    done(): void {
        this.titleService.setTitle(feedreaderTitle);
        this.onShowEdit.emit(false);
    }

    addFeed(): void {
        let newFeed: Feed = new Feed();
        newFeed.feedUrl = this.newFeedUrl;
        newFeed.groupId = this.newFeedGroupId;
        this.feedreaderService.saveFeed(newFeed);
    }

    deleteFeed(feed: Feed): void {
        this.feedreaderService.deleteFeed(feed);
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }

    populateTable(): void {
        this.feeds.sort(function (a, b) {
            return a.feedTitle.toLowerCase().localeCompare(b.feedTitle, 'en', {'sensitivity': 'base'});
        });

        let rows: Row[] = [];
        for (let feed of this.feeds)
            rows.push(<Row>{
                columns: [feed.groupName, feed.feedTitle, feed.siteUrl],
                item: feed
            });
        this.table = new Table(columnHeadings, rows);
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
