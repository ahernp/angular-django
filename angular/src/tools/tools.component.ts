import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {MarkdownPageService} from '../markdown-pages/markdown-page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

import {rootTitle, toDateTimeString, rootBreadcrumb} from "../app.settings";
import {Footer} from "../footer/footer";

const toolsTitle: string = 'Tools';

const cardgenBreadcrumb = <Breadcrumb> {title: 'Cardgen', url: '/tools/cardgen'};
const compareBreadcrumb = <Breadcrumb> {title: 'Compare', url: '/tools/compare'};
const deduplicateBreadcrumb = <Breadcrumb> {title: 'Deduplicate', url: '/tools/deduplicate'};
const matchBreadcrumb = <Breadcrumb> {title: 'Match', url: '/tools/match'};

const tools = [cardgenBreadcrumb, compareBreadcrumb, deduplicateBreadcrumb, matchBreadcrumb];

@Component({
    selector: 'ad-tools',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>Tools</h1>
            <p>
                <span *ngFor="let tool of tools">
                    <a routerLink="{{tool.url}}">{{tool.title}}</a>
                </span>
                <span><a routerLink="/page/django-tools">Django Tools</a></span>
            </p>
            <ad-cardgen *ngIf="tool_slug == 'cardgen'"></ad-cardgen>
            <ad-compare *ngIf="tool_slug == 'compare'"></ad-compare>
            <ad-deduplicate *ngIf="tool_slug == 'deduplicate'"></ad-deduplicate>
            <ad-match *ngIf="tool_slug == 'match'"></ad-match>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        `,
    providers: []
})


export class ToolsComponent implements OnInit {
    tools: Breadcrumb[] = tools;
    now: string;
    tool_slug: string;
    breadcrumbs: Breadcrumb[];
    footer: Footer;

    constructor(
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(toolsTitle);
        this.route.params.forEach((params: Params) => {
            this.tool_slug = params['slug'];
            this.populateHeaderAndTitle();
            this.now = toDateTimeString(new Date());
            this.populateFooter();
        });
    }

    populateHeaderAndTitle(): void {
        if (this.tool_slug == undefined) {
            this.titleService.setTitle(toolsTitle);
            this.populateHeader(toolsTitle);
        }
        else {
            for (var i = 0; i < this.tools.length; i++) {
                if (this.tools[i].url == this.router.url) {
                    this.titleService.setTitle(this.tools[i].title);
                    this.populateHeader(this.tools[i].title);
                    break;
                }
            }
        }
    }

    populateHeader(title:string): void {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb({
            title: title,
            url: this.router.url,
            updated: this.now,
            parentName: rootBreadcrumb.title,
        });
    }

    populateFooter(): void {
        this.footer = new Footer({
            updated: this.now,
            adminUrl: `/admin/`,
        });
    }
}
