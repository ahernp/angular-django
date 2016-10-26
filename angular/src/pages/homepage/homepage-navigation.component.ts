import {Component} from '@angular/core';

import {Breadcrumb} from "../../core/breadcrumbs/breadcrumb";

import {blogFeedBreadcrumb} from "../../blog/blog.component";

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
            blogFeedBreadcrumb,
        ]
    },
    {
        parent: <Breadcrumb> {title: 'Gallery', url: '/page/gallery'},
        children: []
    },
     {
        parent: <Breadcrumb> {title: 'Library', url: '/page/library'},
        children: [
            <Breadcrumb> {title: 'Books', url: '/page/books'},
            <Breadcrumb> {title: 'CDs', url: '/page/cds'},
            <Breadcrumb> {title: 'DVDs', url: '/page/dvds'},
            <Breadcrumb> {title: 'Software', url: '/page/software'},
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
        parent: <Breadcrumb> {title: 'Personal'},
        children: [
            <Breadcrumb> {title: 'CV', url: '/page/cv'},
            <Breadcrumb> {title: 'Profile', url: '/page/profile'},
            <Breadcrumb> {title: 'Public Key', url: '/page/public-key'},
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
            <Breadcrumb> {title: 'Planting', url: '/page/planting'},
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
            <Breadcrumb> {title: 'Feedreader', url: '/tools/feedreader'},
        ]
    },
   {
        parent: <Breadcrumb> {title: 'Timers', url: '/timers'},
        children: []
    },
];

@Component({
    moduleId: module.id,
    selector: 'ad-homepage-navigation',
    template: `
        <h2>Internal</h2>
        <p *ngFor="let section of navigationPanel">
            <a *ngIf="section.parent.url" routerLink="{{section.parent.url}}">{{section.parent.title}}</a>
            <span *ngIf="!section.parent.url">{{section.parent.title}}</span>
            <span *ngIf="section.children.length > 0">
                &rsaquo;
                <span *ngFor="let breadcrumb of section.children">
                    <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
                </span>
            </span>
        </p>
    `,
    providers: []
})
export class HomepageNavigationComponent {
    navigationPanel = navigationPanel;
}
