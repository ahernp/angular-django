import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootTitle, adminBreadcrumb} from "../app.settings";

const toolsTitle: string = 'Tools';
const toolsUrl: string = '/tools';
export const toolsBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: toolsTitle, url: toolsUrl, parentName: rootTitle};

const cardgenBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Cardgen', url: '/tools/cardgen', parentName: toolsTitle};
const coloursBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Colours', url: '/tools/colours', parentName: toolsTitle};
const compareBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Compare', url: '/tools/compare', parentName: toolsTitle};
const deduplicateBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Deduplicate', url: '/tools/deduplicate', parentName: toolsTitle};
const matchBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Match', url: '/tools/match', parentName: toolsTitle};

export const toolBreadcrumbs: Breadcrumb[] = [
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
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    toolBreadcrumbs: Breadcrumb[] = toolBreadcrumbs;
    toolSlug: string;

    constructor(
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService:Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle(toolsTitle);
        this.route.params.forEach((params: Params) => {
            this.toolSlug = params['slug'];
            this.populateHeaderAndTitle();
            this.populateFooter();
        });
    }

    populateFooter(): void {
        this.footer = <Footer>{breadcrumbs: [adminBreadcrumb]};
    }

    populateHeader(title:string): void {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(<Breadcrumb>
            {
                title: title,
                url: this.router.url,
                parentName: rootTitle,
            });
    }

    populateHeaderAndTitle(): void {
        if (this.toolSlug == undefined) {
            this.titleService.setTitle(toolsTitle);
            this.populateHeader(toolsTitle);
        }
        else {
            for (let i = 0; i < this.toolBreadcrumbs.length; i++) {
                if (this.toolBreadcrumbs[i].url == this.router.url) {
                    this.titleService.setTitle(this.toolBreadcrumbs[i].title);
                    this.populateHeader(this.toolBreadcrumbs[i].title);
                    break;
                }
            }
        }
    }
}
