import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Entry, Feed, FeedCounts, GroupCounts} from './feedreader';
import {FeedreaderService} from './feedreader.service';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootTitle, adminBreadcrumb} from "../app.settings";
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
                <h3 (click)="showAll()">Show All</h3>
                <div *ngFor="let group of groupCounts">
                    <h3 *ngIf="group.name" (click)="showGroup(group.name)">{{group.name}} ({{group.count}})</h3>
                    <p *ngFor="let feed of group.feeds" (click)="showFeed(feed.name)">{{feed.name}} ({{feed.count}})</p>
                </div>
            </div>
            <div id="feedreader-entry-list">
                <div *ngFor="let entry of shownEntries" class="feed_entry">
                    <h3 class="feed_entry_subtitle">From {{entry.feedTitle}} on {{entry.publishedTime}}</h3>
                    <p><a href="{{entry.link}}">{{entry.title}}</a></p>
                    <p>{{entry.description}}</p>
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
            breadcrumbs: [adminBreadcrumb],
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
                    this.countEntries();
                    this.shownEntries = this.entries;
                    this.showSpinner = false;
                },
                err => console.error(err)
            );
    }

    countEntries() {
        let groupCounts: GroupCounts = new GroupCounts();
        for (let i = 0; i < this.feeds.length; i++) {
            if (groupCounts[this.feeds[i].groupName] == undefined)
                groupCounts[this.feeds[i].groupName] = {count: 0, feeds: new FeedCounts()};
            groupCounts[this.feeds[i].groupName].feeds[this.feeds[i].feedTitle] = 0;
        }
        for (let i = 0; i < this.entries.length; i++) {
            groupCounts[this.entries[i].groupName].count++;
            groupCounts[this.entries[i].groupName].feeds[this.entries[i].feedTitle]++;
        }
        let groups = [];
        let groupNames = Object.keys(groupCounts);
        for (let i = 0; i < groupNames.length; i++)
            if (groupCounts[groupNames[i]].count > 0) {
                let feeds = [];
                let feedTitles = Object.keys(groupCounts[groupNames[i]].feeds)
                for (let j = 0; j < feedTitles.length; j++)
                    if (groupCounts[groupNames[i]].feeds[feedTitles[j]] > 0)
                        feeds.push({name: feedTitles[j], count: groupCounts[groupNames[i]].feeds[feedTitles[j]]});
                groups.push({
                    name: groupNames[i],
                    count: groupCounts[groupNames[i]].count,
                    feeds: feeds})
            }
        this.groupCounts = groups;
    }

    showAll() {
        this.shownEntries = this.entries;
    }

    showGroup(groupName) {
        let matchingGroupName = (value) => value.groupName == groupName;
        this.shownEntries = this.entries.filter(
            (value) => value.groupName == groupName);
    }

    showFeed(feedTitle) {
        this.shownEntries = this.entries.filter(
            (value) => value.feedTitle == feedTitle);
    }
}
