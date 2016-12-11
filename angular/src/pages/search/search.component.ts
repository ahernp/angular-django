import {Component} from '@angular/core';

import {PageService} from "../page.service";

import {SearchResults} from "./search-results";

@Component({
    selector: 'ad-page-search',
    template: `
        <input [(ngModel)]="searchString" (ngModelChange)="searchPage()" placeholder="Search Pages" tabindex="1" style="position: absolute; top: 0; right: 0;">
        <div *ngIf="showResults" style="float:right; background-color: white; border: 1px solid #046; margin-top: 30px; padding-left: 5px; width: 100%; max-height: 90vh; overflow: scroll;">
            <p *ngIf="pageSearchResults.titleMatches.length == 0 && pageSearchResults.contentMatches.length == 0">No matches found</p>
            <p *ngIf="pageSearchResults.titleMatches.length > 0">
                Title matches:
                <span *ngFor="let searchResult of pageSearchResults.titleMatches;">
                    <ad-breadcrumb [breadcrumb]="searchResult.breadcrumb"></ad-breadcrumb>
                </span>
            </p>
            <p *ngIf="pageSearchResults.contentMatches.length > 0">Content matches:</p>
            <p *ngFor="let searchResult of pageSearchResults.contentMatches;">
                <ad-breadcrumb [breadcrumb]="searchResult.breadcrumb"></ad-breadcrumb>
                <span [innerHTML]=searchResult.match></span>
            </p>
        </div>
        `,
    providers: []
})
export class SearchComponent {
    searchString: string;
    showResults: Boolean = false;
    pageSearchResults: SearchResults;

    constructor(
        private pageService: PageService
    ) {}

    searchPage(): void {
        if (this.searchString.length > 2) {
            this.pageSearchResults = this.pageService.search(this.searchString);
            this.showResults = true;
        }
        else
            this.showResults = false;
    }
}
