import {Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Subscription}   from 'rxjs/Subscription';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {Feed, Group} from './feedreader';
import {FeedreaderService} from './feedreader.service';
import {feedreaderTitle} from './feedreader.component';

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
            <span *ngIf="table.currentRows.length != table.allRows.length">{{table.currentRows.length}} of</span>
            {{table.allRows.length}} rows
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
                        <td>
                            <a *ngIf="row.item.feedTitle" href="{{row.item.feedUrl}}">{{row.item.feedTitle}}</a>
                            <a *ngIf="!row.item.feedTitle && row.item.feedUrl" href="{{row.item.feedUrl}}">{{row.item.feedUrl|trimurl}}</a>
                            <a *ngIf="!row.item.feedTitle && !row.item.feedUrl" href="{{row.item.feedUrl}}">No Title</a>
                         </td>
                        <td title="{{row.item.feedDescription}}">
                            <a *ngIf="row.item.siteUrl" href="{{row.item.siteUrl}}">{{row.item.siteUrl|trimurl}}</a>
                            <span *ngIf="!row.item.siteUrl">No Url</span>
                        </td>
                        <td><input type="checkbox" (click)="deleteFeed(row.item)"></td>
                    </tr>
                </tbody>
            </table>

            <div id="groups" *ngIf="showGroups">
                <span class="ad-control ad-close" (click)="toggleShowGroups()" title="Close">&times;</span>
                <h3>Groups</h3>
                <p>
                    Add Group:
                    <input [(ngModel)]="newGroupName" placeholder="Name">
                    <button (click)="addGroup()">Add</button>
                </p>
                <table>
                    <thead><tr><th>Name</th><th>Delete</th></tr></thead>
                    <tbody>
                        <tr *ngFor="let group of groups; let odd=odd; let even=even;" [ngClass]="{odd: odd, even: even}">
                            <td>{{group.name}}</td>
                            <td><input type="checkbox" (click)="deleteGroup(group)"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="controls">
            <p style="margin-top: 10px;">
                <span class="ad-control" (click)="done()">Done</span>
                <span class="ad-control" (click)="toggleShowGroups()">Groups</span>
                <ad-breadcrumb [breadcrumb]="adminBreadcrumb"></ad-breadcrumb>
            </p>
        </div>
        <ad-message></ad-message>
    `,
    styles: [`
        div#editor {
            position: fixed;
            top: 0;
            bottom: 45px;
            z-index: 10;
            width: 100%;
            background: white;
            padding: 5px 5px 45px 45px;
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
        div#groups {
            position: absolute;
            bottom: 85px;
            z-index: 12;
            background: white;
            border: solid 1px black;
            padding: 5px;
        }
        ad-message {
            position: absolute;
            z-index: 15;
            right: 10px;
            bottom: 0px;
            max-width: 50%;
            background-color: white;
            max-height: 50vh;
            overflow: auto;
        }
    `]
})
export class FeedreaderEditComponent implements OnInit {
    @Input() adminBreadcrumb: Breadcrumb;
    @Input() groups: Group[];
    @Output() onShowEdit = new EventEmitter<boolean>();

    subscription: Subscription;

    filterString: string;
    table: Table;
    showGroups: boolean = false;

    newFeedUrl: string;
    newFeedGroupId: number;

    newGroupName: string;

    constructor(
        private feedreaderService: FeedreaderService,
        private titleService: Title
    ) {
        this.subscription = feedreaderService.getFeeds().subscribe(
            feeds => {
                this.populateTable(feeds);
            }
        );
    }

    ngOnInit(): void {
        this.titleService.setTitle('Edit Feedreader');
    }

    addFeed(): void {
        let newFeed: Feed = new Feed();
        newFeed.feedUrl = this.newFeedUrl;
        newFeed.groupId = this.newFeedGroupId;
        this.feedreaderService.saveFeed(newFeed);
    }

    addGroup(): void {
        let newGroup: Group = new Group();
        newGroup.name = this.newGroupName;
        this.feedreaderService.saveGroup(newGroup);
    }

    deleteFeed(feed: Feed): void {
        this.feedreaderService.deleteFeed(feed);
    }

    deleteGroup(group: Group): void {
        this.feedreaderService.deleteGroup(group);
    }

    done(): void {
        this.titleService.setTitle(feedreaderTitle);
        this.onShowEdit.emit(false);
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }

    populateTable(feeds: Feed[]): void {
        feeds.sort(function (a, b) {
            return a.feedTitle.toLowerCase().localeCompare(b.feedTitle, 'en', {'sensitivity': 'base'});
        });

        let rows: Row[] = [];
        for (let feed of feeds)
            rows.push(<Row>{
                columns: [feed.groupName, feed.feedTitle, feed.siteUrl],
                item: feed
            });
        this.table = new Table(columnHeadings, rows);
    }

    toggleShowGroups(): void {
        this.showGroups = !this.showGroups;
    }
}
