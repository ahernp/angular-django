import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Entry, Feed, FeedCount, FeedCountDictionary,
    GroupCount, GroupCountDictionary} from './feedreader';
import {FeedreaderService} from './feedreader.service';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootTitle} from "../app.settings";
import {toDateTimeString} from "../utilities";

export const feedreaderTitle: string = 'Feedreader';
export const feedreaderUrl: string = '/feedreader';

@Component({
    selector: 'ad-feedreader',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>Feedreader</h1>
            <div id="feedreader-entry-counts">
                <p (click)="toggleShowReadEntries()">Recent Entries:</p>
                <h2 *ngIf="entries" (click)="showAll()">All ({{shownEntries.length}})</h2>
                <div *ngFor="let group of groupCounts">
                    <h3 *ngIf="group.name" (click)="showGroup(group.name)">{{group.name}} ({{group.count}})</h3>
                    <p *ngFor="let feed of group.feeds" (click)="showFeed(feed.name)">
                        <span [innerHtml]="feed.name"></span> ({{feed.count}})
                    </p>
                </div>
            </div>
            <div id="feedreader-entry-list">
                <div *ngFor="let entry of shownEntries" class="feed_entry">
                    <h3 class="feed_entry_subtitle">
                        From <span [innerHtml]="entry.feedTitle"></span> on {{entry.publishedTime}}
                    </h3>
                    <p><a href="{{entry.link}}"><span [innerHtml]="entry.title"></span></a></p>
                    <p [innerHtml]="entry.description"></p>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        <ad-spinner *ngIf="showSpinner"></ad-spinner>
        `,
    providers: []
})
export class FeedreaderComponent implements OnInit {
    now: string;
    feeds: Feed[];
    entries: Entry[];
    showReadEntries: Boolean;
    unreadEntries: Entry[];
    shownEntries: Entry[];
    groupCounts: any[];
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSpinner: Boolean = false;
    error: any;

    constructor(
        private feedreaderService: FeedreaderService,
        private breadcrumbService: BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.showReadEntries = false;
        this.titleService.setTitle(feedreaderTitle);
        this.now = toDateTimeString(new Date());
        this.populateHeader();
        this.populateFooter();
        this.getFeedsAndEntries();
    }

    populateHeader() {
        var dashboardBreadcrumb = new Breadcrumb({
            title: feedreaderTitle,
            url: feedreaderUrl,
            updated: this.now,
            parentName: rootTitle});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(dashboardBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [
                new Breadcrumb({title: 'Admin',
                                url: `/admin${feedreaderUrl}/`,
                                linkFlag: true})
            ],
        });
    }

    getFeedsAndEntries() {
        this.showSpinner = true;
        this.feedreaderService
            .getFeedsAndEntries()
            .subscribe(
                data => {
                    this.feeds = <Feed[]>data[0];
                    this.entries = <Entry[]>data[1];
                    this.unreadEntries = this.entries.filter(entry => !entry.readFlag);
                    this.shownEntries = this.showReadEntries ? this.entries : this.unreadEntries;
                    this.countEntries(this.shownEntries);
                    this.showSpinner = false;
                },
                err => console.error(err)
            );
    }

    countEntries(entries: Entry[]) {
        let groupCountDictionary: GroupCountDictionary = new GroupCountDictionary();
        for (let i = 0; i < this.feeds.length; i++) {
            if (groupCountDictionary[this.feeds[i].groupName] == undefined)
                groupCountDictionary[this.feeds[i].groupName] = {count: 0, feeds: new FeedCountDictionary()};
            groupCountDictionary[this.feeds[i].groupName].feeds[this.feeds[i].feedTitle] = 0;
        }
        for (let i = 0; i < entries.length; i++) {
            groupCountDictionary[entries[i].groupName].count++;
            groupCountDictionary[entries[i].groupName].feeds[entries[i].feedTitle]++;
        }
        let groupCounts: GroupCount[] = [];
        let groupNames = Object.keys(groupCountDictionary);
        for (let i = 0; i < groupNames.length; i++)
            if (groupCountDictionary[groupNames[i]].count > 0) {
                let feedCounts: FeedCount[] = [];
                let feedTitles = Object.keys(groupCountDictionary[groupNames[i]].feeds)
                for (let j = 0; j < feedTitles.length; j++)
                    if (groupCountDictionary[groupNames[i]].feeds[feedTitles[j]] > 0)
                        feedCounts.push({name: feedTitles[j], count: groupCountDictionary[groupNames[i]].feeds[feedTitles[j]]});
                groupCounts.push({
                    name: groupNames[i],
                    count: groupCountDictionary[groupNames[i]].count,
                    feeds: feedCounts})
            }
        this.groupCounts = groupCounts;
    }

    toggleShowReadEntries() {
        this.showReadEntries = !this.showReadEntries;
        this.shownEntries = this.showReadEntries ? this.entries : this.unreadEntries;
        this.countEntries(this.shownEntries);
    }
    showAll() {
        this.shownEntries = this.showReadEntries ? this.entries : this.unreadEntries;
    }

    showGroup(groupName) {
        let matchingGroupName = (value) => value.groupName == groupName;
        if (this.showReadEntries)
            this.shownEntries = this.entries.filter(
                (value) => value.groupName == groupName);
        else
            this.shownEntries = this.unreadEntries.filter(
                (value) => value.groupName == groupName);
    }

    showFeed(feedTitle) {
        if (this.showReadEntries)
            this.shownEntries = this.entries.filter(
                (value) => value.feedTitle == feedTitle);
        else
            this.shownEntries = this.unreadEntries.filter(
                (value) => value.feedTitle == feedTitle);
    }
}
