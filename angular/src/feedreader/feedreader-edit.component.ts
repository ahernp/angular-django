import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Feed} from './feedreader';
import {FeedreaderService} from './feedreader.service';
import {feedreaderTitle} from './feedreader.component';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {Table} from "../core/table/table";

const columnHeadings: string[] = ['Group', 'Feed', 'Site'];

@Component({
    selector: 'ad-feedreader-edit',
    template: `
        <div id="editor">
            <h2>Edit Feeds and Groups</h2>
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
                        <td>{{row[3].groupName}}</td>
                        <td><a href="{{row[3].feedUrl}}">{{row[3].feedTitle}}</a></td>
                        <td title="{{row[3].feedDescription}}"><a href="{{row[3].siteUrl}}">{{row[3].siteUrl|trimurl}}</a></td>
                        <td><input type="checkbox" (click)="delete(row[3].id)"></td>
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
    table: Table;
    showAdvanced: boolean = false;

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

    delete(): void {
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }

    populateTable(): void {
        this.feeds.sort(function (a, b) {
            return a.feedTitle.toLowerCase().localeCompare(b.feedTitle, 'en', {'sensitivity': 'base'});
        });

        let rows: any[][] = [];
        for (let feed of this.feeds)
            rows.push([feed.groupName, feed.feedTitle, feed.siteUrl, feed]);
        this.table = new Table(columnHeadings, rows);
    }

    toggleShowAdvanced(): void {
        this.showAdvanced = !this.showAdvanced;
    }
}
