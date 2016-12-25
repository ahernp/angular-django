import {Component} from '@angular/core';

import {PageService} from "../../pages/page.service";
import {FeedreaderService} from "../../feedreader/feedreader.service";

import {SearchResults} from "./search-results";

@Component({
    selector: 'ad-page-search',
    template: `
        <input [(ngModel)]="searchString" (ngModelChange)="search()" placeholder="Search" tabindex="1" style="position: absolute; top: 0; right: 0;">
        <div *ngIf="showResults"  (click)="clear()" style="float:right; background-color: white; border: 1px solid #046; margin-top: 30px; padding-left: 5px; width: 100%; max-height: 90vh; overflow: scroll;">
            <p *ngIf="pageSearchResults.titleMatches.length == 0 && pageSearchResults.contentMatches.length == 0">No matches found</p>
            <p *ngIf="pageSearchResults.titleMatches.length > 0">
                <span class="label">Page title matches:</span>
                <span *ngFor="let searchResult of pageSearchResults.titleMatches;">
                    <ad-breadcrumb [breadcrumb]="searchResult.breadcrumb"></ad-breadcrumb>
                </span>
            </p>
            <p *ngIf="pageSearchResults.contentMatches.length > 0" class="label">Page content matches:</p>
            <p *ngFor="let searchResult of pageSearchResults.contentMatches;">
                <ad-breadcrumb [breadcrumb]="searchResult.breadcrumb"></ad-breadcrumb>
                <span [innerHTML]=searchResult.match></span>
            </p>
            <p *ngIf="entrySearchResults.titleMatches.length > 0" class="label">Feedreader entry title matches:</p>
            <p *ngFor="let searchResult of entrySearchResults.titleMatches;">
                <ad-breadcrumb [breadcrumb]="searchResult.breadcrumb"></ad-breadcrumb>
                <span [innerHTML]=searchResult.match></span>
            </p>
            <p *ngIf="entrySearchResults.contentMatches.length > 0" class="label">Feedreader entry matches:</p>
            <p *ngFor="let searchResult of entrySearchResults.contentMatches;">
                <ad-breadcrumb [breadcrumb]="searchResult.breadcrumb"></ad-breadcrumb>
                <span [innerHTML]=searchResult.match></span>
            </p>
        </div>
        `,
    styles: [`
        p.label, span.label {
            font-style: italic;
            font-weight: bold;
        }
    `],
    providers: []
})
export class SearchComponent {
    searchString: string;
    showResults: Boolean = false;
    pageSearchResults: SearchResults;
    entrySearchResults: SearchResults;

    constructor(
        private pageService: PageService,
        private feedreaderService: FeedreaderService
    ) {}

    search(): void {
        if (this.searchString.length > 2) {
            this.pageSearchResults = this.pageService.search(this.searchString);
            this.entrySearchResults = this.feedreaderService.search(this.searchString);
            this.showResults = true;
        }
        else
            this.showResults = false;
    }

    clear(): void {
        this.searchString = '';
        this.showResults = false;
    }
}
