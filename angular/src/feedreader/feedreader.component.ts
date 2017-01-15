import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Observable} from 'rxjs';

import {AuthService} from "../core/auth/auth.service";

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
                <div *ngFor="let groupCount of groupCounts">
                    <h3 *ngIf="groupCount.name" [class.selected]="groupCount.selected" (click)="showGroup(groupCount.name)">
                        {{groupCount.name}} ({{groupCount.count}})
                    </h3>
                    <p *ngFor="let feedCount of groupCount.feedCounts" [class.selected]="feedCount.selected" (click)="showFeed(feedCount.name)">
                        <span [innerHtml]="feedCount.name"></span> ({{feedCount.count}})
                    </p>
                </div>
                <p *ngIf="unreadEntriesFound && loggedIn" class="ad-control" (click)="markAllRead()">Mark All Read</p>
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
        .selected {
            text-decoration: underline;
        }
    `],
    providers: []
})
export class FeedreaderComponent implements OnInit {
    loggedIn: Boolean;
    feeds: Feed[];
    entries: Entry[];
    showReadEntries: Boolean;
    unreadEntriesFound: Boolean = false;
    unreadEntries: Entry[];
    shownEntries: Entry[];
    totalEntryCount: number;
    groupCounts: GroupCount[];
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSpinner: Boolean = false;

    constructor(
        private feedreaderService: FeedreaderService,
        private authService: AuthService,
        private breadcrumbService: BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.authService.getLoggedInStatus().subscribe(loggedInFlag => this.loggedIn = loggedInFlag);
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
                externalLinkFlag: true,
                loggedInRequiredFlag: true}],
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
        if (this.loggedIn) {
            this.showSpinner = true;
            this.feedreaderService.toggleRead(entryId);
        }
    }

    markAllRead(): void {
        if (this.loggedIn) {
            this.showSpinner = true;
            this.feedreaderService.markAllRead();
        }
    }

    countEntries(entries: Entry[]) {
        let groupCountDictionary: GroupCountDictionary = new GroupCountDictionary();
        for (let i = 0; i < this.feeds.length; i++) {
            if (groupCountDictionary[this.feeds[i].groupName] == undefined)
                groupCountDictionary[this.feeds[i].groupName] = {count: 0, feedCounts: new FeedCountDictionary()};
            groupCountDictionary[this.feeds[i].groupName].feedCounts[this.feeds[i].feedTitle] = 0;
        }
        for (let i = 0; i < entries.length; i++) {
            groupCountDictionary[entries[i].groupName].count++;
            groupCountDictionary[entries[i].groupName].feedCounts[entries[i].feedTitle]++;
        }
        let groupCounts: GroupCount[] = [];
        let groupNames = Object.keys(groupCountDictionary);
        for (let i = 0; i < groupNames.length; i++)
            if (groupCountDictionary[groupNames[i]].count > 0) {
                let feedCounts: FeedCount[] = [];
                let feedTitles = Object.keys(groupCountDictionary[groupNames[i]].feedCounts)
                for (let j = 0; j < feedTitles.length; j++)
                    if (groupCountDictionary[groupNames[i]].feedCounts[feedTitles[j]] > 0)
                        feedCounts.push(<FeedCount>{
                            name: feedTitles[j],
                            count: groupCountDictionary[groupNames[i]].feedCounts[feedTitles[j]],
                            selected: false
                        });
                groupCounts.push(<GroupCount>{
                    name: groupNames[i],
                    count: groupCountDictionary[groupNames[i]].count,
                    selected: false,
                    feedCounts: feedCounts})
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

    showGroup(groupName: string): void {
        if (this.showReadEntries)
            this.shownEntries = this.entries.filter(
                (value) => value.groupName == groupName);
        else
            this.shownEntries = this.unreadEntries.filter(
                (value) => value.groupName == groupName);
        for (let groupPos = 0; groupPos < this.groupCounts.length; groupPos++) {
            if (this.groupCounts[groupPos].name == groupName)
                this.groupCounts[groupPos].selected = true;
            else
                this.groupCounts[groupPos].selected = false;
            for (let feedPos = 0; feedPos < this.groupCounts[groupPos].feedCounts.length; feedPos++)
                this.groupCounts[groupPos].feedCounts[feedPos].selected = false;
        }
    }

    showFeed(feedName: string): void {
        if (this.showReadEntries)
            this.shownEntries = this.entries.filter(
                (value) => value.feedTitle == feedName);
        else
            this.shownEntries = this.unreadEntries.filter(
                (value) => value.feedTitle == feedName);
        for (let groupPos = 0; groupPos < this.groupCounts.length; groupPos++) {
            this.groupCounts[groupPos].selected = false;
            for (let feedPos = 0; feedPos < this.groupCounts[groupPos].feedCounts.length; feedPos++)
                if (this.groupCounts[groupPos].feedCounts[feedPos].name == feedName)
                    this.groupCounts[groupPos].feedCounts[feedPos].selected = true;
                else
                    this.groupCounts[groupPos].feedCounts[feedPos].selected = false;
        }
    }

    onRefresh(): void {
        this.showSpinner = true;
        this.feedreaderService.refreshCaches();
    }
}
