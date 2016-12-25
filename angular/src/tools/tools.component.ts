import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootBreadcrumb, adminBreadcrumb} from "../app.settings";

const toolsTitle: string = 'Tools';

const cardgenBreadcrumb = <Breadcrumb> {title: 'Cardgen', url: '/tools/cardgen'};
const coloursBreadcrumb = <Breadcrumb> {title: 'Colours', url: '/tools/colours'};
const compareBreadcrumb = <Breadcrumb> {title: 'Compare', url: '/tools/compare'};
const deduplicateBreadcrumb = <Breadcrumb> {title: 'Deduplicate', url: '/tools/deduplicate'};
const matchBreadcrumb = <Breadcrumb> {title: 'Match', url: '/tools/match'};

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
                parentName: rootBreadcrumb.title,
            });
    }

    populateFooter(): void {
        this.footer = new Footer({
            breadcrumbs: [adminBreadcrumb],
        });
    }
}
