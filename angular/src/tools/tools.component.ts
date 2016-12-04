import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootBreadcrumb, adminBreadcrumb} from "../app.settings";
import {toDateTimeString} from "../utilities";

const toolsTitle: string = 'Tools';

const cardgenBreadcrumb = <Breadcrumb> {title: 'Cardgen', url: 'cardgen'};
const coloursBreadcrumb = <Breadcrumb> {title: 'Colours', url: 'colours'};
const compareBreadcrumb = <Breadcrumb> {title: 'Compare', url: 'compare'};
const deduplicateBreadcrumb = <Breadcrumb> {title: 'Deduplicate', url: 'deduplicate'};
const matchBreadcrumb = <Breadcrumb> {title: 'Match', url: 'match'};

export const toolBreadcrumbs = [
    cardgenBreadcrumb,
    coloursBreadcrumb,
    compareBreadcrumb,
    deduplicateBreadcrumb,
    matchBreadcrumb
];

@Component({
    selector: 'ad-tools',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>Tools</h1>
            <p>
                <span *ngFor="let tool of toolBreadcrumbs">
                    <a routerLink="{{tool.url}}">{{tool.title}}</a>
                </span>
            </p>
            <router-outlet></router-outlet>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        `,
    providers: []
})
export class ToolsComponent implements OnInit {
    toolBreadcrumbs: Breadcrumb[] = toolBreadcrumbs;
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
            for (var i = 0; i < this.toolBreadcrumbs.length; i++) {
                if (this.toolBreadcrumbs[i].url == this.router.url) {
                    this.titleService.setTitle(this.toolBreadcrumbs[i].title);
                    this.populateHeader(this.toolBreadcrumbs[i].title);
                    break;
                }
            }
        }
    }

    populateHeader(title:string): void {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(<Breadcrumb>
            {
                title: title,
                url: this.router.url,
                updated: this.now,
                parentName: rootBreadcrumb.title,
            });
    }

    populateFooter(): void {
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [adminBreadcrumb],
        });
    }
}
