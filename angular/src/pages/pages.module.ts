import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from "../core/core.module";

import {HomepageComponent} from "./homepage/homepage.component";
import {HomepageNavigationComponent} from "./homepage/homepage-navigation.component";

import {MarkdownComponent} from "./markdown/markdown.component";
import {MarkdownToHtmlPipe} from "./markdown/markdown.pipe";

import {PageComponent} from "./page.component";
import {PageSourceComponent} from "./page-source.component";
import {PageService} from "./page.service";

import {TableContentComponent} from "./tablecontent/tablecontent.component";

@NgModule({
    imports: [
        CoreModule,
        RouterModule,
    ],
    declarations: [
        HomepageComponent,
        HomepageNavigationComponent,
        MarkdownComponent,
        PageComponent,
        PageSourceComponent,
        MarkdownToHtmlPipe,
        TableContentComponent,
    ],
    providers: [
        PageService,
    ],
    exports: [
        MarkdownComponent,
        PageSourceComponent,
    ]
})
export class PagesModule {}
