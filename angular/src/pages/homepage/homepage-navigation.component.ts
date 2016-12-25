import {Component} from '@angular/core';

import {Breadcrumb} from "../../core/breadcrumbs/breadcrumb";

import {blogRSSBreadcrumb} from "../../blog/blog.component";

const navigationPanel = [
    {
        parent: <Breadcrumb> {title: 'App', url: '/page/applications'},
        children: [
            <Breadcrumb> {title: 'Chrome', url: '/page/google-chrome'},
            <Breadcrumb> {title: 'Firefox', url: '/page/firefox'},
            <Breadcrumb> {title: 'Vim', url: '/page/vim-editor'},
        ]
    },
    {
        parent: <Breadcrumb> {title: 'Blog', url: '/blog'},
        children: [
            <Breadcrumb> {title: 'Archive', url: '/sitemap/blog'},
            blogRSSBreadcrumb,
        ]
    },
    {
        parent: <Breadcrumb> {title: 'Gallery', url: '/page/gallery'},
        children: [
            <Breadcrumb> {title: 'Cork', url: '/page/cork'},
            <Breadcrumb> {title: 'London', url: '/page/london'},
            <Breadcrumb> {title: 'Wallpaper', url: '/page/wallpaper'},
        ]
    },
     {
        parent: <Breadcrumb> {title: 'Library', url: '/page/library'},
        children: [
            <Breadcrumb> {title: 'Books', url: '/page/books'},
            <Breadcrumb> {title: 'CDs', url: '/page/cds'},
            <Breadcrumb> {title: 'DVDs', url: '/page/dvds'},
            <Breadcrumb> {title: 'Games', url: '/page/games'},
        ]
    },
    {
        parent: <Breadcrumb> {title: 'Misc'},
        children: [
            <Breadcrumb> {title: 'MSc', url: '/page/msc'},
            <Breadcrumb> {title: 'Twinings Tea', url: '/page/twinings-tea'},
        ]
    },
    {
        parent: <Breadcrumb> {title: 'Personal', url: '/page/personal'},
        children: [
            <Breadcrumb> {title: 'CV', url: '/page/cv'},
            <Breadcrumb> {title: 'Portfolio', url: '/page/portfolio'},
            <Breadcrumb> {title: 'Profile', url: '/page/profile'},
        ]
    },
    {
        parent: <Breadcrumb> {title: 'Ref', url: '/page/reference'},
        children: [
            <Breadcrumb> {title: 'Linux', url: '/page/linux'},
            <Breadcrumb> {title: 'MySQL', url: '/page/mysql'},
            <Breadcrumb> {title: 'Python', url: '/page/python'},
        ]
    },
   {
        parent: <Breadcrumb> {title: 'Rooska', url: '/page/rooska'},
        children: [
            <Breadcrumb> {title: 'Before', url: '/page/2008-before'},
            <Breadcrumb> {title: 'Maps', url: '/page/maps'},
            <Breadcrumb> {title: 'Planting', url: '/page/2010-planting'},
        ]
    },
   {
        parent: <Breadcrumb> {title: 'This Site'},
        children: [
            <Breadcrumb> {title: 'Dashboard', url: '/dashboard'},
            <Breadcrumb> {title: 'Site Map', url: '/sitemap'},
        ]
    },
   {
        parent: <Breadcrumb> {title: 'Tools', url: '/tools'},
        children: [
            <Breadcrumb> {title: 'Cardgen', url: '/tools/cardgen'},
            <Breadcrumb> {title: 'Deduplicate', url: '/tools/deduplicate'},
        ]
    },
   {
        parent: {},
        children: [
            <Breadcrumb> {title: 'Feedreader', url: '/feedreader'},
            <Breadcrumb> {title: 'Timers', url: '/timers'},
        ]
    },
];

@Component({
    selector: 'ad-homepage-navigation',
    template: `
        <h2>Internal</h2>
        <p *ngFor="let section of navigationPanel">
            <template [ngIf]="section.parent.title">
                <a *ngIf="section.parent.url" routerLink="{{section.parent.url}}">{{section.parent.title}}</a>
                <span *ngIf="!section.parent.url">{{section.parent.title}}</span>
            </template>
            <span *ngIf="section.children.length > 0">
                <template [ngIf]="section.parent.title">&rsaquo;</template>
                <span *ngFor="let breadcrumb of section.children">
                    <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
                </span>
            </span>
        </p>
    `,
    styles: [`
        p > span {
            padding-bottom: 5px;
        }
    `],
    providers: []
})
export class HomepageNavigationComponent {
    navigationPanel = navigationPanel;
}
