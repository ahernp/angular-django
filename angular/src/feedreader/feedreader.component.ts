import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Observable} from 'rxjs';

import {Entry, Feed, FeedCount, FeedCountDictionary,
    GroupCount, GroupCountDictionary} from './feedreader';
import {FeedreaderService} from './feedreader.service';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootTitle} from "../app.settings";

const feedreaderTitle: string = 'Feedreader';
export const feedreaderUrl: string = '/feedreader';
export const feedreaderBreadcrumb = <Breadcrumb>{title: feedreaderTitle, url: feedreaderUrl, parentName: rootTitle};

@Component({
    selector: 'ad-feedreader',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>Feedreader</h1>
            <div id="feedreader-entry-counts">
                <p *ngIf="unreadEntriesFound" (click)="toggleShowReadEntries()">
                    <span *ngIf="!showReadEntries" class="ad-control" title="Show all entries">Unread</span>
                    <span *ngIf="showReadEntries" class="ad-control" title="Show unread entries">Recent</span>
                    Entries:
                </p>
                <p *ngIf="!unreadEntriesFound">Recent Entries:</p>
                <h2 *ngIf="entries" (click)="showAll()">All ({{totalEntryCount}})</h2>
                <div *ngFor="let group of groupCounts">
                    <h3 *ngIf="group.name" (click)="showGroup(group.name)">{{group.name}} ({{group.count}})</h3>
                    <p *ngFor="let feed of group.feeds" (click)="showFeed(feed.name)">
                        <span [innerHtml]="feed.name"></span> ({{feed.count}})
                    </p>
                </div>
                <p class="ad-control" (click)="markAllRead()">Mark All Read</p>
            </div>
            <div id="feedreader-entry-list">
                <div *ngFor="let entry of shownEntries" class="feed_entry" (click)="toggleRead(entry.id)">
                    <h3 class="feed_entry_subtitle">
                        From <span [innerHtml]="entry.feedTitle"></span> on {{entry.publishedTime}}
                        <span *ngIf="!entry.readFlag">(unread)</span>
                    </h3>
                    <p><a href="{{entry.link}}"><span [innerHtml]="entry.title"></span></a></p>
                    <p [innerHtml]="entry.description"></p>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onRefresh)="onRefresh()"></ad-footer>
        <ad-spinner *ngIf="showSpinner"></ad-spinner>
        `,
    styles: [`
        #feedreader-entry-counts {
            width:20%;
            float:left;
        }
        #feedreader-entry-list {
            width:75%;
            float:left;
            padding-left:1em;
        }
        .feed_entry {
            padding: 0.2em 0.5em;
            margin: 0.5em;
            border: 1px solid #046;
            border-radius: 1em;
        }
        p.feed_entry_subtitle {
            font-size: small;
        }
    `],
    providers: []
})
export class FeedreaderComponent implements OnInit {
    feeds: Feed[];
    entries: Entry[];
    showReadEntries: Boolean;
    unreadEntriesFound: Boolean = false;
    unreadEntries: Entry[];
    shownEntries: Entry[];
    totalEntryCount: number;
    groupCounts: any[];
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSpinner: Boolean = false;

    constructor(
        private feedreaderService: FeedreaderService,
        private breadcrumbService: BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(feedreaderTitle);
        this.populateHeader();
        this.populateFooter();
        this.getFeedsAndEntries();
    }

    populateHeader() {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(feedreaderBreadcrumb);
    }

    populatePage() {
        this.shownEntries = this.showReadEntries ? this.entries : this.unreadEntries;
        this.totalEntryCount = this.shownEntries.length;
        this.countEntries(this.shownEntries);
    }

    populateFooter() {
        this.footer = <Footer>{
            breadcrumbs: [<Breadcrumb>{
                title: 'Admin',
                url: `/admin${feedreaderUrl}/`,
                externalLinkFlag: true}],
            refreshFlag: true,
        };
    }

    getFeedsAndEntries() {
        this.showSpinner = true;
        this.showReadEntries = false;
        Observable.combineLatest(
            this.feedreaderService.getFeeds().map(feeds => this.feeds = <Feed[]>feeds),
            this.feedreaderService.getEntries().map(entries => this.entries = <Entry[]>entries))
            .subscribe(
                data => {
                    this.unreadEntries = this.entries.filter(entry => !entry.readFlag);
                    if (this.unreadEntries.length == 0) {
                        this.showReadEntries = true;
                        this.unreadEntriesFound = false;
                    }
                    else {
                        this.showReadEntries = false;
                        this.unreadEntriesFound = true;
                    }
                    this.populatePage();
                    this.showSpinner = false;
                },
                err => console.error(err)
            );
    }

    toggleRead(entryId: number): void {
        this.showSpinner = true;
        this.feedreaderService.toggleRead(entryId);
    }

    markAllRead(): void {
        this.showSpinner = true;
        this.feedreaderService.markAllRead();
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
        this.populatePage();
    }
    showAll() {
        this.shownEntries = this.showReadEntries ? this.entries : this.unreadEntries;
    }

    showGroup(groupName) {
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

    onRefresh() {
        this.showSpinner = true;
        this.feedreaderService.refreshCaches();
    }
}
